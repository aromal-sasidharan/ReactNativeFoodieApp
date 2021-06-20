import { AbstractCuisine, AbstractDish } from "../../../domain/Entities/Cusine"
import { AbstractCusinesPresenter, AbstractDishListPresenter } from "../../../domain/UseCases/HomePage/CusineListUseCase"
import { AbstractHomePagePresenter, AbstractHomePageView } from "../../../domain/UseCases/HomePage/HomePageUseCase"
import {
    AbstractCusineCauroselViewModel,
    HomeCuisineCauroselViewModel
} from "../../../domain/UseCases/HomePage/ViewModels/CusineCauroselViewModel";


class HomePagePresenter implements  AbstractHomePagePresenter {
    dishListPresenter?: AbstractDishListPresenter
    cusinePresenter?: AbstractCusinesPresenter
    output?: AbstractHomePageView
    constructor(
                cusinePresenter: AbstractCusinesPresenter,
                disListPresenter: AbstractDishListPresenter,
                output: AbstractHomePageView
                ) {
        this.dishListPresenter = disListPresenter
        this.cusinePresenter = cusinePresenter
        this.output = output
        this.dishListPresenter.output = this
        this.cusinePresenter.output = this
    }

    loadAllCuisines() {
         this.cusinePresenter?.loadAllCusines()
    }

    loadCuisineSelected(cuisine: AbstractCusineCauroselViewModel) {
        this.output?.onLoadDishes([])
        if (cuisine instanceof HomeCuisineCauroselViewModel && cuisine.entity) {
            this.output?.showDishesLoding(true)
            this.dishListPresenter?.loadDishesFor(cuisine.entity)
        }
    }

    onLoadDishes(dishes: AbstractDish[]): void {
        this.output?.onLoadDishes(dishes)
        this.output?.showDishesLoding(false)
    }
    onLoadCusines(cusines: AbstractCusineCauroselViewModel[]): void {
        this.output?.onLoadCusines(cusines)
        if (cusines[0])
            this.loadCuisineSelected(cusines[0])
    }
}

export {HomePagePresenter}