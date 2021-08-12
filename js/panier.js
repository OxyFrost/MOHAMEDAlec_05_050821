/**
 * Gestion du panier
 */

function addProduit(articleId){
    let listPanier = getPanier();
    listPanier.push(articleId);
}

function getPanier(){
    let listPanier = localStorage.getItem("listPanier");
    if(listPanier == null){
        return[]
    }else{
        return JSON.parse(listPanier);
    }
}

function savePanier(listPanier){
    localStorage.setItem("listPanier",JSON.stringify(listPanier));
}