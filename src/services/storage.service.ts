import { STORAGE_KEYS } from './../config/storage_keys.config';
import { LocalUser } from './../models/local_user';
import { Injectable } from '@angular/core';
import { Cart } from 'src/models/cart';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    getLocalUser(): LocalUser{
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if(usr == null){
           return null; 
        }else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj: LocalUser) {
        if(obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }else{
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    getCart(): Cart{
        let cart = localStorage.getItem(STORAGE_KEYS.cart);
        if(cart == null){
           return null; 
        }else {
            return JSON.parse(cart);
        }
    }

    setCart(obj: Cart) {
        if(obj == null) {
            localStorage.removeItem(STORAGE_KEYS.cart);
        }else{
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
        }
    }
}