import {AbstractCartStore} from "app/stores/CartStore";


interface AbstractCartInteractor {

}


class CartInteractor {
    cartStore: AbstractCartStore

    constructor(cartStore: AbstractCartStore) {
        this.cartStore = cartStore
    }

}