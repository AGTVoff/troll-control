const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

let clients = [];
let logs = [];

// Page principale
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Enregistrement d’un client
app.post("/register", (req, res) => {
    const clientName = req.body.clientName;
    if (!clientName) return res.status(400).json({ error: "Pas de nom" });

    const exists = clients.find(c => c === clientName);
    if (!exists) {
        clients.push(clientName);
        logs.push({ time: new Date().toISOString(), action: "register", clientName });
        console.log(`[REGISTER] Nouveau client ajouté : ${clientName}`);
    }
    res.json({ status: "success" });
});

// Liste des clients
app.get("/clients", (req, res) => {
    res.json(clients);
});

// Logs
app.get("/logs", (req, res) => {
    res.json(logs);
});

// Clear logs
app.post("/logs/clear", (req, res) => {
    logs = [];
    res.json({ status: "cleared" });
});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
