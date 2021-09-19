import { action, makeObservable, observable } from "mobx";
import { AbstractCuisine, AbstractDish } from "app/domain/Entities/Cusine"
import { AbstractCusinesPresenter, AbstractDishListPresenter } from "app/domain/UseCases/HomePage/CusineListUseCase"
import  AbstractHomePagePresenter from "app/domain/UseCases/HomePage/HomePageUseCase"
import {
    AbstractCusineCauroselViewModel,
    HomeCuisineCauroselViewModel
} from "app/domain/UseCases/HomePage/ViewModels/CusineCauroselViewModel";


class HomePagePresenter implements  AbstractHomePagePresenter {
    dishListPresenter?: AbstractDishListPresenter
    cusinePresenter?: AbstractCusinesPresenter
    constructor(
                cusinePresenter: AbstractCusinesPresenter,
                disListPresenter: AbstractDishListPresenter,
                ) {
        this.dishListPresenter = disListPresenter
        this.cusinePresenter = cusinePresenter
        this.dishListPresenter.output = this
        this.cusinePresenter.output = this
        makeObservable(this)
    }
    @observable isLoading: boolean = false
    @observable dishes: AbstractDish[] = []
    @observable cusines: AbstractCusineCauroselViewModel[] = []

    loadAllCuisines() {
         this.cusinePresenter?.loadAllCusines()
    }

    @action loadCuisineSelected(cuisine: AbstractCusineCauroselViewModel) {
        this.dishes = []
        if (cuisine instanceof HomeCuisineCauroselViewModel && cuisine.entity) {
            this.isLoading = true
            this.dishListPresenter?.loadDishesFor(cuisine.entity)
        }
    }

    @action onLoadDishes(dishes: AbstractDish[]): void {
        this.dishes = dishes
        this.isLoading = false
    }
    @action onLoadCusines(cusines: AbstractCusineCauroselViewModel[]): void {
        this.cusines = cusines
        if (cusines[0])
            this.loadCuisineSelected(cusines[0])
    }
}

export {HomePagePresenter}