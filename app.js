/*
 * app.js
 * Serveur Express de base pour l'API REST
 */

// On importe le module 'express' installé via npm
const express = require('express');

// On crée une instance de l'application Express
const app = express();

// Port d'écoute du serveur
const port = 3003;

// Host / adresse locale du serveur
const host = 'localhost';

/*
 *------
 * GET
 *------
 * Route racine : sert juste à vérifier que le serveur répond bien
 */
app.get('/', (req, res) => {
    // On renvoie une simple chaîne de caractères en réponse
    res.send('Home Page');
});

/*
 *------
 * ADMIN DESKTOP
 *------
 * Démarrage du serveur : il se met à écouter les requêtes entrantes
 * sur le port défini plus haut
 */
app.listen(port, () => {
    console.log(`Node.js web server framework running at http://${host}:${port}`);
});