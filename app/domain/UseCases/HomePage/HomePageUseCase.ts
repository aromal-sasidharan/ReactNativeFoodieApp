import {
    AbstractCusinesPresenter,
    AbstractCusinesPresenterOutput,
    AbstractDishListPresenter,
    AbstractDishListPresenterOutput
} from "app/domain/UseCases/HomePage/CusineListUseCase";
import {AbstractDish} from "app/domain/Entities/Cusine";
import {AbstractCusineCauroselViewModel} from "app/domain/UseCases/HomePage/ViewModels/CusineCauroselViewModel";

interface AbstractHomePagePresenter extends AbstractDishListPresenterOutput, AbstractCusinesPresenterOutput {
    dishListPresenter?: AbstractDishListPresenter
    cusinePresenter?: AbstractCusinesPresenter
    loadAllCuisines(): void
    loadCuisineSelected(cuisine: AbstractCusineCauroselViewModel): void
    isLoading: boolean
    dishes: AbstractDish[]
    cusines: AbstractCusineCauroselViewModel[]
}


export  default AbstractHomePagePresenter