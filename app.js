const express = require("express");
const app = express();
const db = require("./src/db");
const router = require("./src/router");

app.use(express.json());

app.use(router);

db.then(x => {
    console.log("Conectado ao banco!");
    handleConnectServer();
}).catch(error => {
    console.log("Erro ao se conectar no banco")
})

function handleConnectServer() { 
    app.listen(3011, () => console.log(`Server at started in http://localhost:3011`))
}

