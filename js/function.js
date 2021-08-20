/**
 * Fonction utilisées sur plusieurs pages du site.
 */


    // Conversion du Prix en format FR
    function convertPrice(prix){
        prix = Intl.NumberFormat('fr-FR', {style: 'currency', currency:'EUR', minimumFractionDigits: 2}).format(prix /100);
        return prix;

    }


    // Affichage du nombre de produits dans le Panier
    function showNbItems(){
        let savedProduct = JSON.parse(localStorage.getItem("produit"));
        const panier = document.querySelector("#badge");
        if(savedProduct){
            let nbItems = savedProduct.length;
            panier.innerHTML += `${nbItems}`;
        }else{
            panier.innerHTML += ``;
        }
    }

    function clearPanier(){

        let confirmActionPanier = confirm("Voulez vous vraiment supprimer le panier ?");
        if(confirmActionPanier) {
            alert("Le Panier à bien été vidé");
            localStorage.clear();
            window.location.reload();
        }

    }
