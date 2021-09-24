import {
    AbstractCusinesPresenter,
    AbstractCusinesPresenterOutput,
    AbstractDishListPresenter,
    AbstractDishListPresenterOutput
} from "app/domain/UseCases/HomePage/CusineListUseCase";
import {AbstractCusineCauroselViewModel} from "app/domain/UseCases/HomePage/ViewModels/CusineCauroselViewModel";
import {AbstractHomePageStore} from "app/stores/HomePageStore";


interface AbstractHomePagePresenter extends AbstractDishListPresenterOutput, AbstractCusinesPresenterOutput {
    dishListPresenter?: AbstractDishListPresenter
    cusinePresenter?: AbstractCusinesPresenter
    store?: AbstractHomePageStore
    loadAllCuisines(): void
    loadCuisineSelected(cuisine: AbstractCusineCauroselViewModel): void
}


export default AbstractHomePagePresenter
