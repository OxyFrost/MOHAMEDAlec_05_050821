/**
 * Gère l'affichage de la page index
 */

//Appel de la fonction du nombre d'items dans le panier
showNbItems();
const api = apiURL();

fetch(api + "furniture")
    .then(data => data.json())
    .then(jsonListArticle => {
        for(let produit of jsonListArticle){
            let prix = convertPrice(produit.price);
            document.querySelector(".container-card").innerHTML +=
                `<div class="card cardContainer col-sm-11 col-lg-3 rounded p-1 m-0">
                    <a class="link-style" href="./produit.html?_id=${produit._id}">
                        <img class="card-img-top card-img" src="${produit.imageUrl}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${produit.name}</h5>
                            <p class="card-price text-primary font-weight-bold">${prix}</p>
                            <p class="card-text">${produit.description}</p>
                            <button class="btn btn-primary btnShopping m-1">Acheter</button>
                        </div>
                    </a>
                </div>
            `
        }
    })
    .catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });