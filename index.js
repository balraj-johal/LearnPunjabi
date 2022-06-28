const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require("passport");
const bp = require('body-parser');
const cp = require('cookie-parser');
const cors = require('cors');
const csurf = require('csurf');
const rateLimit = require('express-rate-limit');

// import routes
const s3 = require("./server_routes/s3");
const users = require("./server_routes/users");
const progress = require("./server_routes/users/progress");
const groups = require("./server_routes/groups");
const lessons = require("./server_routes/lessons");
const courses = require("./server_routes/courses");

const app = express();

// connect to MongoDB database
const connectDB = async () => {
    console.log('Attempting to Connect to MongoDB...');
    mongoose.connect(
        process.env.MONGODB,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    console.log('MongoDB is Connected...');
};
connectDB();

// ---  configure middleware
// configure CORS
let allowedDomains;
if (process.env.NODE_ENV === "dev") {
    console.log("Whitelisting dev domains in CORS...");
    allowedDomains = [
        "http://localhost:3000", 
        "http://localhost:3001/", 
        "https://learn-punjabi-alphabet.herokuapp.com",
        "https://www.learnpunjabi.academy"
    ];
} else {
    allowedDomains = [
        "https://learn-punjabi-alphabet.herokuapp.com",
        "https://www.learnpunjabi.academy"
    ];
}
const corsOptions = {
    origin: function (origin, callback) {
        // bypass the requests with no origin (like curl requests, mobile apps, etc)
        if (!origin) return callback(null, true);    
        if (allowedDomains.indexOf(origin) === -1) {
          var msg = `This site ${origin} does not have access.`;
          return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}
app.use(cors(corsOptions));
// configure rate limiter
let rateLimiter = rateLimit({
    windowMs: 0.5 * 60 * 1000, // 30s
    max: 50,
	standardHeaders: true,
	legacyHeaders: false,
})
app.use(rateLimiter);

app.use(bp.urlencoded()); // TODO: fix deprecated error here
app.use(cp(process.env.COOKIE_SECRET));
app.use(passport.initialize());

//TODO: fix csurf protection
// enable middleware to protect against CSRF attacks
const csrfProtection = csurf({
    cookie: true
});
app.use(csrfProtection); 
app.get('/csrf-token', (req, res) => {
    res.json({ token: req.csrfToken() });
});

// declare routes
// app.use("/api/s3", s3);
app.use("/api/v1/users", users);
app.use("/api/v1/users/progress", progress);
app.use("/api/v1/groups", groups);
app.use("/api/v1/lessons", lessons);
app.use("/api/v1/courses", courses);
app.use("/api/v1/s3", s3.router);

const PORT = process.env.PORT || 3001;

// serve react app
app.use(express.static(path.resolve(__dirname, 'client', 'build')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// initialise server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));