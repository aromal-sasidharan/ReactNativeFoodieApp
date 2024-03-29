import {AbstractCuisine, AbstractCuisineDish, AbstractDish} from "app/domain/Entities/Cusine";
import {Observable} from "rxjs";
import {AbstractCusineCauroselViewModel} from "app/domain/UseCases/HomePage/ViewModels/CusineCauroselViewModel";
import {AbstractHomeCuisineCauroselViewModelMapper} from "app/domain/UseCases/HomePage/ViewModels/HomeCuisineCauroselViewModelMapper";

interface AbstractCusinesWorker {
    allCusines(): Observable<AbstractCuisine[] | undefined>
}

interface AbstractCusinesInteractor {
    worker: AbstractCusinesWorker

    loadAllCusines(): void

    onLoadCusines(): Observable<AbstractCuisine[]>

    onError(): Observable<Error>

}

interface AbstractDishListWorker {
    dishesForCusineId(id: string): Observable<AbstractCuisineDish | undefined>
}

interface AbstractDishListInteractor {
    worker: AbstractDishListWorker

    loadDishesFor(cusine: AbstractCuisine): void

    onLoadDishes(): Observable<AbstractDish[]>

    onError(): Observable<Error>

}

interface AbstractDishListPresenterOutput {
    onLoadDishes(dishes: AbstractDish[]): void
}

interface AbstractDishListPresenter {
    interactor?: AbstractDishListInteractor
    output?: AbstractDishListPresenterOutput

    loadDishesFor(cusine: AbstractCuisine): void
}

interface AbstractCusinesPresenterOutput {
    onLoadCusines(cusines: AbstractCusineCauroselViewModel[]): void
}

interface AbstractCusinesPresenter {
    interactor?: AbstractCusinesInteractor
    output?: AbstractCusinesPresenterOutput
    mapper?: AbstractHomeCuisineCauroselViewModelMapper

    loadAllCusines(): void
}


export {
    AbstractDishListInteractor,
    AbstractDishListPresenter,
    AbstractDishListPresenterOutput,
    AbstractDishListWorker,
    AbstractCusinesWorker,
    AbstractCusinesInteractor,
    AbstractCusinesPresenter,
    AbstractCusinesPresenterOutput
}

