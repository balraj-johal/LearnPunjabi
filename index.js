const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require("passport");
const bp = require('body-parser');
const cp = require('cookie-parser');
const cors = require('cors');
const csurf = require('csurf');

// import routes
const s3 = require("./server_routes/s3");
const users = require("./server_routes/users");
const lessons = require("./server_routes/lessons");

const app = express();

// connect to MongoDB database
const connectDB = async () => {
    console.log('Attempting to Connect to MongoDB...');
    try {
        await mongoose.connect(
            process.env.MONGODB,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
  
        console.log('MongoDB is Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
connectDB();

//    configure middleware


const corsOptions = {
    origin: function (origin, callback) {
        let allowedDomains = [
            "http://localhost:3000", 
            "http://localhost:3001/", 
            "https://learn-punjabi-alphabet.herokuapp.com"
        ];
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

app.use(bp.urlencoded()); // TODO: fix deprecated error here
app.use(cp(process.env.COOKIE_SECRET));
app.use(passport.initialize());

//TODO: fix csurf protection
// enable middleware to protect against CSRF attacks
// const csurfProtection = csurf({
//     cookie: true
// });
// // app.use(csurfProtection); 
// app.get('/csrf-token', (req, res) => {
//     // res.json({ csrfToken: req.csrfToken() });
//     res.json();
// });

// Passport config
require("./config/passport")(passport);

// declare routes
// app.use("/api/s3", s3);
app.use("/api/users", users);
app.use("/api/lessons", lessons);

const PORT = process.env.PORT || 3001;

// serve react app
app.use(express.static(path.resolve(__dirname, 'client', 'build')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// initialise server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))