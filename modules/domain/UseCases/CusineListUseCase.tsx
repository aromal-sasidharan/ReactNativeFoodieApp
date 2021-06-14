import {AbstractDish, AbstractCuisine, AbstractCuisineDish} from "../Entities/Cusine";

interface AbstractCusineListWorker {
    output?: AbstractCusineListWorkeOuput
    getDishesForCusineId(id: string): void
}
interface AbstractCusineListWorkeOuput {
    onDishesFetched(cusine: AbstractCuisineDish): void
}

interface AbstractDishListInteractorOutput {
    onLoadDishesNumber(dishes: AbstractDish[]): void
}

interface AbstractDishListInteractor extends AbstractCusineListWorkeOuput{
    output?: AbstractDishListInteractorOutput
    loadDishesFor(cusine: AbstractCuisine): void
}

interface AbstractDishListPresenterOutput {
    onLoadPhoneNumbers(dishes: AbstractDish[]): void
}
interface  AbstractDishListPresenter extends  AbstractDishListInteractorOutput {
    interactor?: AbstractDishListInteractor
    output?: AbstractDishListPresenterOutput
    loadDishesFor(cusine: AbstractCuisine): void
}


export {AbstractDishListInteractor,
    AbstractDishListInteractorOutput,
    AbstractDishListPresenter,
    AbstractDishListPresenterOutput
}

