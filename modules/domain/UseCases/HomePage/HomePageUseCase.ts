import {
    AbstractCusinesPresenter,
    AbstractCusinesPresenterOutput,
    AbstractDishListPresenter,
    AbstractDishListPresenterOutput
} from "./CusineListUseCase";
import {AbstractDish} from "./../../Entities/Cusine";
import {AbstractCusineCauroselViewModel} from "./ViewModels/CusineCauroselViewModel";

interface AbstractHomePageView extends AbstractHomePagePresenterOutput {
    presenter?: AbstractHomePagePresenter  
}
interface AbstractHomePagePresenterOutput {
    showDishesLoding(flag:boolean): void
    onLoadDishes(dishes: AbstractDish[]): void
    onLoadCusines(cusines: AbstractCusineCauroselViewModel[]): void
}
interface AbstractHomePagePresenter extends AbstractDishListPresenterOutput, AbstractCusinesPresenterOutput {
    dishListPresenter?: AbstractDishListPresenter
    cusinePresenter?: AbstractCusinesPresenter
    output?:AbstractHomePageView
    loadAllCuisines(): void
    loadCuisineSelected(cuisine: AbstractCusineCauroselViewModel): void
}

export {AbstractHomePageView, AbstractHomePagePresenter, AbstractHomePagePresenterOutput}