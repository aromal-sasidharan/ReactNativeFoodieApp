import { AbstractCuisine, AbstractDish } from "../../../domain/Entities/Cusine"
import { AbstractCusinesPresenter, AbstractDishListPresenter } from "../../../domain/UseCases/HomePage/CusineListUseCase"
import { AbstractHomePagePresenter, AbstractHomePageView } from "../../../domain/UseCases/HomePage/HomePageUseCase"


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

    loadCuisineSelected(cuisine: AbstractCuisine) {
        this.dishListPresenter?.loadDishesFor(cuisine)
    }

    onLoadDishes(dishes: AbstractDish[]): void {
        this.output?.onLoadDishes(dishes)
    }
    onLoadCusines(cusines: AbstractCuisine[]): void {
        this.output?.onLoadCusines(cusines)
        cusines[0] !== undefined && this.dishListPresenter?.loadDishesFor(cusines[0])
    }
}

export {HomePagePresenter}