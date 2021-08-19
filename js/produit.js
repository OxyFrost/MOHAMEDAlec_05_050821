//Appel de la fonction du nombre d'items dans le panier
showNbItems();

//récupération de la chaîne de requête dans l'url
const queryString_url_id = window.location.search;

//Récupération de l'id dans la chaine
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("_id");

//affichage du produit
fetch(`http://localhost:3000/api/furniture/${id}`)
    .then(data => data.json())
    .then(jsonArticle => {
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
                        <button id="add_panier" class="btn btn-primary btnShopping m-2 align-self-end">Acheter</button>
                    </form>
                </div>
            </div>`

        //Boucle pour les options du produits
        for (let varnish of produit.varnish) {
            document.querySelector("#option_produit").innerHTML += `<option value="${varnish}">${varnish}</option>`
        }

        //Id du Formulaire
        const idForm = document.querySelector("#option_produit");

        //Récupère le bouton d'achat et écoute
        const btn_addPanier = document.querySelector("#add_panier");

        btn_addPanier.addEventListener("click", (e) => {
            e.preventDefault()

            //Récupère la value selectionnée dans le formulaire
            const choixForm = idForm.value;
            console.log(choixForm);

            //Création d'un article pour le panier
            let article = {
                idProduit: produit._id,
                nomProduit: produit.name,
                varnish: choixForm,
                prix:produit.price,
                qte:1

            };

            // Récuperer les données dans le LocalStorage
            //JSON.parse permets de convertir les données du format JSON en objet Javascript
            let savedProduct = JSON.parse(localStorage.getItem("produit"));
            let productFound = false;

            //Cas si il y'a des produits existants
            if(savedProduct){
                for(i = 0; i < savedProduct.length; i++){
                    console.log(article.idProduit);
                    console.log(savedProduct[i].idProduit);
                    if(article.idProduit == savedProduct[i].idProduit){
                        savedProduct[i].qte += 1;
                        productFound = true;
                        break;
                    }
                }
                if(productFound == false) {
                    savedProduct.push(article);
                }
            }else{ // Panier Vide
                savedProduct = [];
                savedProduct.push(article);
            }

            localStorage.setItem("produit", JSON.stringify(savedProduct));
        })




    })