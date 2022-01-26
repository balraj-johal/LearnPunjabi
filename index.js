const express = require('express');
const path = require('path');

const s3 = require("./server_routes/s3");

const app = express();

app.use("/api/s3", s3);

const PORT = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, 'client', 'build')));
    
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// app.get("/", (req, res) => res.send("Hello World!"))

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))