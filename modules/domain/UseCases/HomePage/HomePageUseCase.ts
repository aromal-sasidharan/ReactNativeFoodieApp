
import {
    AbstractCusinesPresenter,
    AbstractCusinesPresenterOutput,
    AbstractDishListPresenter,
    AbstractDishListPresenterOutput
} from "./CusineListUseCase";
import {AbstractCuisine, AbstractDish} from "./../../Entities/Cusine";

interface AbstractHomePageView extends AbstractHomePagePresenterOutput {
    presenter?: AbstractHomePagePresenter  
}
interface AbstractHomePagePresenterOutput{
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

export {AbstractHomePageView, AbstractHomePagePresenter, AbstractHomePagePresenterOutput}