//Appel de la fonction du nombre d'items dans le panier
showNbItems();
const api = apiURL();

//récupération de la chaîne de requête dans l'url
const queryString_url_id = window.location.search;

//Récupération de l'id dans la chaine
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("_id");

//affichage du produit
fetch(api + `furniture/${id}`)
    .then(data => data.json())
    .then(produit => {
        let prix = convertPrice(produit.price);
        document.querySelector(".article-card").innerHTML +=
            `<div class="card flex-md-row mb-4 box-shadow h-md-250 m-4">
                <img class="card-img-left flex-auto d-none d-md-block productImg" src="${produit.imageUrl}" alt="Thumbnail [200x250]" data-holder-rendered="true">
                <div class="card-body d-flex flex-column align-items-start pb-0 p-2">
                    <h5 class="card-title">${produit.name}</h5>
                    <p class="card-text">${produit.description}</p>
                    <form>
                        <label for="option_produit">Vernissage : </label>
                        <select name="option_produit" id="option_produit">
                        </select>
                        <br/>
                        <label for="option_quantite">Qté : </label>
                        <select name="option_quantite" id="option_quantite">
                        </select>
                        <p class="card-price text-primary font-weight-bold align-self-end">${prix}</p>
                        <button id="add_panier" class="btn btn-primary btnShopping mt-2 align-self-end">Acheter</button>
                    </form>
                </div>
            </div>`

        //Boucle pour les options du produit
        for (let varnish of produit.varnish) {
            document.querySelector("#option_produit").innerHTML += `<option value="${varnish}">${varnish}</option>`
        }

        //Boucle pour la quantité du produit
        for (let i = 1; i < 100; i++) {
            document.querySelector("#option_quantite").innerHTML += `<option value="${i}">${i}</option>`
        }

        //Id du Formulaire
        const idForm = document.querySelector("#option_produit");
        const idQte = document.querySelector("#option_quantite");

        //Récupère le bouton d'achat et écoute
        const btn_addPanier = document.querySelector("#add_panier");

        btn_addPanier.addEventListener("click", (e) => {
            e.preventDefault()

            //Récupère la value selectionnée dans le formulaire
            const choixForm = idForm.value;
            produit.varnish = choixForm;
            produit.qte = idQte.value;

            // Récuperer les données dans le LocalStorage
            //JSON.parse permets de convertir les données du format JSON en objet Javascript
            let savedProduct = JSON.parse(localStorage.getItem("produit"));
            let productFound = false;

            //Cas si il y'a des produits existants
            if (savedProduct) {
                for (i = 0; i < savedProduct.length; i++) {
                    if (produit._id == savedProduct[i]._id) {
                        savedProduct[i].qte = parseInt(savedProduct[i].qte) + parseInt(idQte.value);
                        productFound = true;
                        break;
                    }
                }
                if (productFound == false) {
                    savedProduct.push(produit);
                }
            } else { // Panier Vide
                savedProduct = [];
                savedProduct.push(produit);
            }

            localStorage.setItem("produit", JSON.stringify(savedProduct));
            alert('Le Produit à bien été ajouté au panier');
            window.location.reload();
        })
    })
    .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });