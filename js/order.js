/**
 * Page Confirmation de commande
 */

//Récupération des infos stockée et renvoyés par le serveur
let order = JSON.parse(localStorage.getItem("order"));
let prixTotal = JSON.parse(localStorage.getItem("prixTotal"));
prixTotal = convertPrice(prixTotal);

//Affichade des infos
document.querySelector("#OrderText").innerHTML += `Votre achat de ${prixTotal} a été effectué sous le numéro de commande : <b>${order['orderId']}</b>`
localStorage.clear();