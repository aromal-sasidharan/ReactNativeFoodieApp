import {AbstractDish} from "app/domain/Entities/Cusine"
import {AbstractCusinesPresenter, AbstractDishListPresenter} from "app/domain/UseCases/HomePage/CusineListUseCase"
import AbstractHomePagePresenter from "app/domain/UseCases/HomePage/HomePageUseCase"
import {
    AbstractCusineCauroselViewModel,
    HomeCuisineCauroselViewModel
} from "app/domain/UseCases/HomePage/ViewModels/CusineCauroselViewModel";
import {AbstractHomePageStore} from "app/stores/HomePageStore";

class HomePagePresenter implements AbstractHomePagePresenter {
    dishListPresenter?: AbstractDishListPresenter
    cusinePresenter?: AbstractCusinesPresenter
    store?: AbstractHomePageStore

    constructor(
        store: AbstractHomePageStore,
        cusinePresenter: AbstractCusinesPresenter,
        disListPresenter: AbstractDishListPresenter,
    ) {
        this.store = store
        this.dishListPresenter = disListPresenter
        this.cusinePresenter = cusinePresenter
        this.dishListPresenter.output = this
        this.cusinePresenter.output = this
    }

    loadAllCuisines() {
        this.cusinePresenter?.loadAllCusines()
    }

    loadCuisineSelected(cuisine: AbstractCusineCauroselViewModel) {
        this.store?.setDishes([])
        if (cuisine instanceof HomeCuisineCauroselViewModel && cuisine.entity) {
            this.store?.setIsCusinesLoading(true)
            this.dishListPresenter?.loadDishesFor(cuisine.entity)
        }
    }

    onLoadDishes(dishes: AbstractDish[]): void {
        this.store?.setDishes(dishes)
        this.store?.setIsCusinesLoading(false)
    }

    onLoadCusines(cusines: AbstractCusineCauroselViewModel[]): void {
        this.store?.setCusines(cusines)
        if (cusines[0])
            this.loadCuisineSelected(cusines[0])
    }
}

export default HomePagePresenter