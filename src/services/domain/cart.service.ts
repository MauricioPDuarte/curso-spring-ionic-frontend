import { StorageService } from './../storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from 'src/models/cart';
import { ProdutoDTO } from 'src/models/produto.dto';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor(
        public http: HttpClient,
        private storageSerive: StorageService
    ) {
    }

    createOrClearCart(): Cart {
        let cart: Cart = {items: []}
        this.storageSerive.setCart(cart);
        return cart;
    }

    getCart(): Cart {
        let cart: Cart = this.storageSerive.getCart();
        if(cart == null){
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position == -1) {
            cart.items.push({quantidade: 1, produto: produto});
        }
        this.storageSerive.setCart(cart);
        return cart;
    }

    removeProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1) {
            cart.items.splice(position, 1);
        }
        this.storageSerive.setCart(cart);
        return cart;
    }

    increaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1) {
            cart.items[position].quantidade++;
        }
        this.storageSerive.setCart(cart);
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1) {
            cart.items[position].quantidade--;
            if(cart.items[position].quantidade < 1){
                cart = this.removeProduto(produto);
            }
        }
        this.storageSerive.setCart(cart);
        return cart;
    }

    total(): number {
        let cart = this.storageSerive.getCart();
        let sum = 0;
        for(var i=0; i<cart.items.length; i++){
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        }
        return sum;
    }

}