import { compare } from '../orderById';
import products from './products.json'
var list =  products;
localStorage.setItem('listProduct', JSON.stringify(list))

export function listProducts() {
    let arrProduct = JSON.parse(localStorage.getItem('listProduct'));
    localStorage.setItem('viewProducts', JSON.stringify(arrProduct))

    var listProducts = localStorage.getItem('viewProducts');
    var arrProducts;
    if (listProducts === null){
        arrProducts = ""
    } else {
        arrProducts = JSON.parse(listProducts);
    }
    arrProducts.sort(compare);
    return arrProducts;
}