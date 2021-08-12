/**
 * Gère l'affichage de la page index
 */

fetch("http://localhost:3000/api/furniture")
    .then(data => data.json())
    .then(jsonListArticle => {
        for(let jsonArticle of jsonListArticle){
            let produit = new Article(jsonArticle);
            let prix = produit.convertPrice(produit.price);
            document.querySelector(".container-card").innerHTML +=
                `<div class="card cardContainer col-sm-11 col-lg-3 rounded m-2 p-0">
                    <a class="link-style" href="./produit.html?_id=${produit._id}">
                        <img class="card-img-top card-img" src="${produit.imageUrl}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${produit.name}</h5>
                            <p class="card-price text-primary font-weight-bold">${prix}</p>
                            <p class="card-text">${produit.description}</p>
                            <button class="btn btn-primary btnShopping m-2">Acheter</button>
                        </div>
                    </a>
                </div>`

        }
    })