/**
 *  Représentation d'un format de l'article
 */

class Article{
    constructor(jsonArticle) {
        jsonArticle && Object.assign(this, jsonArticle);
    }

    // Conversion du Prix en format FR
    convertPrice(prix){
        prix = Intl.NumberFormat('fr-FR', {style: 'currency', currency:'EUR', minimumFractionDigits: 2}).format(prix /100);
        return prix;

    }

}