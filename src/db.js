const mongoose = require('mongoose');


const db = mongoose.connect("mongodb+srv://waleskagata14:<password>@cluster0.yw89hbe.mongodb.net/", {
    auth: {
        username: "waleskagata14",
        password: "k2CObc7JGLdeJ8sz"
    }
});
/* 177.125.97.198 */
module.exports = db;

