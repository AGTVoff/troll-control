const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Tableau des clients
let clients = [];

// DEBUG : log toutes les requêtes entrantes
app.use((req, res, next) => {
    console.log(`[DEBUG] ${req.method} ${req.url}`, req.body || "");
    next();
});

// Enregistrer un client
app.post("/register", (req, res) => {
    console.log("[REGISTER] Reçu body :", req.body);
    const name = req.body.clientName;
    if (name) {
        console.log("[REGISTER] Nom trouvé :", name);
        if (!clients.includes(name)) {
            clients.push(name);
            console.log("[SERVER] Nouveau client ajouté :", name);
        } else {
            console.log("[SERVER] Client déjà enregistré :", name);
        }
    } else {
        console.log("[REGISTER] Aucun nom trouvé !");
    }
    res.json({ status: "ok" });
});

// Renvoyer la liste des clients
app.get("/clients", (req, res) => {
    res.json(clients);
});

// Vider la liste des clients
app.get("/clear", (req, res) => {
    clients = [];
    console.log("[SERVER] Liste des clients effacée");
    res.json({ status: "cleared" });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
