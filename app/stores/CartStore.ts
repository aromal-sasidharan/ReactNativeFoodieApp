import {computed, observable} from "mobx";
import {AbstractCartItem} from "app/domain/Entities/Cusine";

interface AbstractCartStore {
    cart: AbstractCartItem []
    viewModels: AbstractCartItem[]

    cartCount(): number
}


class CartStore implements AbstractCartStore {
    @observable cart: AbstractCartItem[] = []
    @observable viewModels: AbstractCartItem[] = []

    constructor() {
        this.cart = []
        this.viewModels = []
    }

    @computed cartCount(): number {
        return this.cart.length
    }
}

export {AbstractCartStore, CartStore}
