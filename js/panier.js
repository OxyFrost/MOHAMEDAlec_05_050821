/**
 * Partie Panier du site
 */

// Récupération des produits dans le LocalStorage
let savedProduct = JSON.parse(localStorage.getItem("produit"));

const panier = document.querySelector("#list-panier");

if(savedProduct === null || savedProduct == 0){
    document.querySelector("#emptyPanier").innerHTML += `<div class="text-center">Le Panier est vide</div>`;
}else{
    let structureProduitPanier = [];
    let prixTotal = 0;
    console.log(savedProduct);
    for(i = 0; i < savedProduct.length; i++){

        panier.innerHTML +=
            `
            <tr>
                <th>${savedProduct[i].nomProduit}</th>
                <th>${savedProduct[i].varnish}</th>
                <th>${savedProduct[i].qte}</th>
                <th>${convertPrice(savedProduct[i].prix)}</th>
                <th>${convertPrice((savedProduct[i].prix*savedProduct[i].qte))}</th>
                <th><button class="btn delete"><i class="fas fa-times text-danger "></i></button></th>
           </tr>`
        prixTotal += (savedProduct[i].prix*savedProduct[i].qte);
    }
    prixTotal = convertPrice(prixTotal);
    panier.innerHTML += `<tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Prix total</th>
                            <th>${prixTotal}</th>
                       </tr>`

    let deleteBtn = document.querySelectorAll(".delete");

    for(let i = 0; i < deleteBtn.length; i++){
        deleteBtn[i].addEventListener("click", (e) =>{
            e.preventDefault();
            //alert pour confirmer la suppression
            let confirmAction = confirm("Voulez vous vraiment supprimer ce produit ?");

            if(confirmAction) {
                //Selection de l'id du produit selectionner
                let idButton = savedProduct[i].idProduit;

                //Utilisation de la méthode filter pour trouver l'élément correspondant
                savedProduct = savedProduct.filter(el => el.idProduit !== idButton);

                //Sauvegarde des nouveaux éléments
                localStorage.setItem("produit", JSON.stringify(savedProduct));

                alert("Le Produit a bien été supprimé");
                window.location.href= "././panier.html"
            }
        })


    }

}