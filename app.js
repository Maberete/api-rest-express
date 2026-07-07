/*
 * app.js
 * Serveur Express de base pour l'API REST
 */

// On importe le module 'express' installé via npm
const express = require('express');
// On importe notre fonction utilitaire success() depuis lib/helper.js
const { success } = require('./lib/helper.js');

// On crée une instance de l'application Express
const app = express();
app.use(express.json());

/*
 *------
 * DATA
 *------
 * Jeu de données de test : liste d'entités (produits) sur laquelle
 * on va tester chaque route de notre API (GET, POST, PUT, DELETE)
 */
let entities = [
    {"id":"1","name":"Google Pixel 6 Pro","data":{"color":"Cloudy White","capacity":"128 GB"}},
    {"id":"2","name":"Apple iPhone 12 Mini, 256GB, Blue","data":null},
    {"id":"3","name":"Apple iPhone 12 Pro Max","data":{"color":"Cloudy White","capacity GB":512}},
    {"id":"4","name":"Apple iPhone 11, 64GB","data":{"price":389.99,"color":"Purple"}},
    {"id":"5","name":"Samsung Galaxy Z Fold2","data":{"price":689.99,"color":"Brown"}},
    {"id":"6","name":"Apple AirPods","data":{"generation":"3rd","price":120}},
    {"id":"7","name":"Apple MacBook Pro 16","data":{"year":2019,"price":1849.99,"CPU model":"Intel Core i9","Hard disk size":"1 TB"}},
    {"id":"8","name":"Apple Watch Series 8","data":{"Strap Colour":"Elderberry","Case Size":"41mm"}},
    {"id":"9","name":"Beats Studio3 Wireless","data":{"Color":"Red","Description":"High-performance wireless noise cancelling headphones"}},
    {"id":"10","name":"Apple iPad Mini 5th Gen","data":{"Capacity":"64 GB","Screen size":7.9}},
    {"id":"11","name":"Apple iPad Mini 5th Gen","data":{"Capacity":"254 GB","Screen size":7.9}},
    {"id":"12","name":"Apple iPad Air","data":{"Generation":"4th","Price":"419.99","Capacity":"64 GB"}},
    {"id":"13","name":"Apple iPad Air","data":{"Generation":"4th","Price":"519.99","Capacity":"256 GB"}}
];

// Port d'écoute du serveur
const port = 3003;

// Host / adresse locale du serveur
const host = 'localhost';

/*
 *------
 * GET /
 *------
 * Route racine : sert juste à vérifier que le serveur répond bien
 */
app.get('/', (req, res) => {
    res.send('Home Page');
});

/*
 *------
 * GET /api/entities
 *------
 * Retourne la liste complète des entités disponibles
 */
app.get('/api/entities', (req, res) => {
    const message = `List of all entities : (${entities.length})`;
    res.json(success(message, entities));
});
/*
 *------
 * GET /api/entities/:id
 *------
 * Retourne UNE seule entité correspondant à l'id passé dans l'URL
 * Ex: /api/entities/3 -> renvoie l'entité dont id = "3"
 */

app.get('/api/entities/:id', (req, res) => {
    const entity = entities.find(entity => entity.id === req.params.id);
    const message = "We found one Entity !!!";
    res.json(success(message, entity));
});
// Génère un nouvel id unique = (le plus grand id existant) + 1
function nextID(list) {
    const maxId = list.reduce((max, item) => Math.max(max, parseInt(item.id)), 0);
    return (maxId + 1).toString();
}
/*
 *------
 * POST /api/entities
 *------
 * Crée une nouvelle entité à partir des données envoyées dans le body
 * et l'ajoute à la liste
 */
app.post('/api/entities', (req, res) => {
    const id = nextID(entities);
    const newEntity = { ...req.body, ...{ id: id, created: new Date() } };
    // persist
    entities.push(newEntity);
    // Confirm to the User for his action
    const message = `The Entity [${newEntity.name}] is succesfull added !!!`;
    // Return to the page
    res.json(success(message, newEntity));
});
/*
 *------
 * PUT /api/entities/:id
 *------
 * Modifie l'entité correspondant à l'id passé dans l'URL
 * avec les nouvelles données envoyées dans le body de la requête
 */
app.put('/api/entities/:id', (req, res) => {
    // On cherche la POSITION de l'entité dans le tableau (pas l'entité elle-même)
    const index = entities.findIndex(entity => entity.id === req.params.id);

    // Si l'id n'existe pas, findIndex renvoie -1 -> on renvoie une erreur 404
    if (index === -1) {
        return res.status(404).json(success("Entity not found !!!", null));
    }

    // On fusionne l'ancienne entité avec les nouvelles données du body,
    // tout en gardant le même id (on ne veut pas que le client puisse le changer)
    const updatedEntity = { ...entities[index], ...req.body, id: entities[index].id };

    // On remplace l'ancienne entité par la mise à jour, à la même position
    entities[index] = updatedEntity;

    const message = `The Entity [${updatedEntity.name}] is successfully updated !!!`;

    res.json(success(message, updatedEntity));
});
/*
 *------
 * ADMIN DESKTOP
 *------
 * Démarrage du serveur
 */
/*
 *------
 * DELETE /api/entities/:id
 *------
 * Supprime l'entité correspondant à l'id passé dans l'URL
 */
app.delete('/api/entities/:id', (req, res) => {
    // On vérifie d'abord que l'entité existe
    const entity = entities.find(entity => entity.id === req.params.id);

    if (!entity) {
        return res.status(404).json(success("Entity not found !!!", null));
    }

    // On garde tous les éléments SAUF celui dont l'id correspond
    entities = entities.filter(entity => entity.id !== req.params.id);

    const message = `The Entity [${entity.name}] is successfully deleted !!!`;

    res.json(success(message, entity));
});
app.listen(port, () => {
    console.log(`Node.js web server framework running at http://${host}:${port}`);
});