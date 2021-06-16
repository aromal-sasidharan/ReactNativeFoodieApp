import {
    AbstractCusinesPresenter,
    AbstractCusinesPresenterOutput,
    AbstractDishListPresenter,
    AbstractDishListPresenterOutput
} from "../../../domain/UseCases/CusineListUseCase";
import {AbstractCuisine, AbstractDish} from "../../../domain/Entities/Cusine";

interface AbstractHomePageView {
    onLoadDishes(dishes: AbstractDish[]): void
    onLoadCusines(cusines: AbstractCuisine[]): void
}

interface AbstractHomePagePresenter extends AbstractDishListPresenterOutput, AbstractCusinesPresenterOutput {
    dishListPresenter?: AbstractDishListPresenter
    cusinePresenter?: AbstractCusinesPresenter
    output?:AbstractHomePageView
    loadAllCuisines(): void
    loadCuisineSelected(cuisine: AbstractCuisine): void
}

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

export {
    HomePagePresenter,
    AbstractHomePageView,
    AbstractHomePagePresenter}