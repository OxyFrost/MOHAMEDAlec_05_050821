//récupération de la chaîne de requête dans l'url
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

//Récupération de l'id dans la chaine
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("_id");
console.log(id);

//affichage du produit
fetch(`http://localhost:3000/api/furniture/${id}`)
    .then(data => data.json())
    .then(jsonArticle => {
            console.log(jsonArticle);
            let produit = new Article(jsonArticle);
            let prix = produit.convertPrice(produit.price);
            document.querySelector(".article-card").innerHTML +=
                `<div class="card flex-md-row mb-4 box-shadow h-md-250 m-4">
                        <img class="card-img-left flex-auto d-none d-md-block" src="${produit.imageUrl}" alt="Thumbnail [200x250]" style="width: 200px; height: 250px;" data-holder-rendered="true">
                        <div class="card-body d-flex flex-column align-items-start">
                            <h5 class="card-title">${produit.name}</h5>
                            <p class="card-text">${produit.description}</p>
                            <form>
                                <label for="option_produit">Vernissage : </label>
                                <select name="option_produit" id="option_produit">
                                </select>
                                 <p class="card-price text-primary font-weight-bold align-self-end">${prix}</p>
                                 <button class="btn btn-primary btnShopping m-2 align-self-end">Acheter</button>
                            </form>
                         </div>
                     </div>`

            //Boucle pour les options du produits
            for(let varnish of produit.varnish){
                document.querySelector("#option_produit").innerHTML +=`<option value="${varnish}">${varnish}</option>`
            }

    })