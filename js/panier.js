/**
 * Partie Panier du site
 */
const api = apiURL();

// Récupération des produits dans le LocalStorage
let produits = JSON.parse(localStorage.getItem("produit"));

const panier = document.querySelector("#list-panier");

if (produits === null || produits == 0) {
    document.querySelector("#emptyPanier").innerHTML += `<div class="text-center">Le Panier est vide</div>`;
} else {

    //Enlève le fait que le formulaire soit invisible
    var element = document.getElementById("containerForm");
    element.classList.remove("hidden");

    let prixTotal = 0;
    products = [];
    for (i = 0; i < produits.length; i++) {

        panier.innerHTML +=
            `
            <tr>
                <th>${produits[i].name}</th>
                <th>${produits[i].varnish}</th>
                <th>${produits[i].qte}</th>
                <th>${convertPrice(produits[i].price)}</th>
                <th>${convertPrice((produits[i].price * produits[i].qte))}</th>
                <th><button class="btn delete"><i class="fas fa-times text-danger "></i></button></th>
           </tr>`

        prixTotal += (produits[i].price * produits[i].qte);
        //Récupération des id des produits pour l'envoie Commande
        products.push(produits[i]._id);
    }
    localStorage.setItem("prixTotal", JSON.stringify(prixTotal));
    prixTotal = convertPrice(prixTotal);
    panier.innerHTML += `<tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Prix total :</th>
                            <th>${prixTotal}</th>
                            <th><button class="btn btn-outline-danger" id="deleteAll" name="deleteAll">Vider</button></th>
                       </tr>`

    let deleteBtn = document.querySelectorAll(".delete");

    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", (e) => {
            e.preventDefault();
            //alert pour confirmer la suppression
            let confirmAction = confirm("Voulez vous vraiment supprimer ce produit ?");

            if (confirmAction) {
                //Selection de l'id du produit selectionner
                let idButton = produits[i]._id;

                //Utilisation de la méthode filter pour trouver l'élément correspondant
                produits = produits.filter(el => el._id !== idButton);

                //Sauvegarde des nouveaux éléments
                localStorage.setItem("produit", JSON.stringify(produits));

                alert("Le Produit a bien été supprimé");
                window.location.reload();
            }
        })

    }

    let deleteBtnAll = document.querySelectorAll("#deleteAll");
    console.log(deleteBtnAll);
    deleteBtnAll[0].addEventListener("click", (e) => {
        e.preventDefault();
        clearPanier();
    })

    //Partie Formulaire

    //Configuration du bouton Envoi Formulaire
    const btnEnvoyerForm = document.querySelector("#envoyerForm");

    btnEnvoyerForm.addEventListener("click", (e) => {

        const form = document.getElementById("formContact");
        if (form.checkValidity()) {
            //Création de l'objet Contact
            let contact = {
                firstName: document.querySelector("#prenom").value,
                lastName: document.querySelector("#nom").value,
                address: document.querySelector("#adress").value,
                city: document.querySelector("#codePostal").value + " " + document.querySelector("#ville").value,
                email: document.querySelector("#email").value,
            }


            const dataCommande = {
                contact,
                products

            }
            console.log(dataCommande);

            fetch(api + "furniture/order", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(dataCommande)
            })
                .then((response) => response.json())
                .then((data) => {
                    localStorage.setItem("order", JSON.stringify(data));
                    document.location.href = "order.html";
                });
        }
    })
}