/*
 * lib/helper.js
 * Fonctions utilitaires réutilisables pour formater les réponses de l'API
 */

/**
 * Formate une réponse "succès" de l'API
 * @param {string} message - message explicatif de l'action réalisée
 * @param {*} data - les données à renvoyer (tableau, objet, etc.)
 * @returns {object} objet standardisé { message, data }
 */
function success(message, data) {
    return {
        message: message,
        data: data
    };
}

// On exporte la fonction pour pouvoir l'utiliser dans app.js
module.exports = { success };