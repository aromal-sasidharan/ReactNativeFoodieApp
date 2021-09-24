import {action, makeObservable, observable} from "mobx";
import {AbstractCusineCauroselViewModel} from "app/domain/UseCases/HomePage/ViewModels/CusineCauroselViewModel";
import {AbstractDish} from "app/domain/Entities/Cusine";


interface AbstractHomePageStore {
    isDishesLoading: boolean
    isCusinesLoading: boolean
    dishes: AbstractDish[]
    cusines: AbstractCusineCauroselViewModel[]
    setCusines(value: AbstractCusineCauroselViewModel[]): void;

    setDishes(value: AbstractDish[]): void;

    setIsDishesLoading(value: boolean): void;

    setIsCusinesLoading(value: boolean): void;
}


class HomePageStore implements AbstractHomePageStore {
    @observable dishes: AbstractDish[] = []
    @observable cusines: AbstractCusineCauroselViewModel[] = []
    @observable isDishesLoading: boolean = false
    @observable isCusinesLoading: boolean = false

    constructor() {
        makeObservable(this)
    }

    @action setCusines(value: AbstractCusineCauroselViewModel[]) {
        this.cusines = value;
    }

    @action setDishes(value: AbstractDish[]) {
        this.dishes = value;
    }

    @action setIsDishesLoading(value: boolean) {
        this.isDishesLoading = value;
    }

    @action setIsCusinesLoading(value: boolean) {
        this.isCusinesLoading = value;
    }

}



export {AbstractHomePageStore, HomePageStore}