const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 3000;
const db = require("./src/db");
const router = require("./src/router");

app.use(express.json());

app.use(router);

handleConnectServer();

/* db.then(x => {
    console.log("Conectado ao banco!");
}).catch(error => {
    console.log("Erro ao se conectar no banco")
}) */

function handleConnectServer() { 
    app.listen(PORT, () => console.log(`Server at started in http://localhost:${PORT}`))
}

