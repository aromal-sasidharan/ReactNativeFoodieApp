import { AbstractCusinesPresenter, AbstractCusinesWorker, AbstractCusinesInteractor, AbstractDishListInteractor, AbstractDishListPresenter, AbstractDishListWorker } from "../domain/UseCases/HomePage/CusineListUseCase"
import CusinesWorker from "./../microservices/CusinesWorker"
import DishListWorker from "./../microservices/DishListWorker"
import { AbstractHomePageView, AbstractHomePagePresenter } from "./../domain/UseCases/HomePage/HomePageUseCase"
import {CusinePresenter, CusineInteractor} from "./../scenes/HomePage/presenter/CusinePresenter"
import { DishListInteractor, DishListPresenter } from "./../scenes/HomePage/presenter/DishListPresenter"
import {HomePagePresenter } from "./../scenes/HomePage/presenter/HomePagePresenter"

class HomePageConfigurator {
    private static shared:HomePageConfigurator
    public static instance(): HomePageConfigurator {
        if(!this.shared) {
            this.shared = new HomePageConfigurator()
        }
        return this.shared
    }

    constructor() {}

    configureCusinePresenter(): AbstractCusinesPresenter {
        const worker: AbstractCusinesWorker = new CusinesWorker()
        const interactor:AbstractCusinesInteractor = new CusineInteractor(worker)
        return new CusinePresenter(interactor)
    }
    configureDishPresenter(): AbstractDishListPresenter {
        const worker: AbstractDishListWorker = new DishListWorker()
        const interactor:AbstractDishListInteractor = new DishListInteractor(worker)
        return new DishListPresenter(interactor)
    }
    configureHomePagePresenter() : ((view: AbstractHomePageView) => AbstractHomePagePresenter ){
        return (view) => { 
        const dishListPresenter: AbstractDishListPresenter = this.configureDishPresenter()
        const cuisinePresenter: AbstractCusinesPresenter = this.configureCusinePresenter()
        return  new HomePagePresenter(
            cuisinePresenter,
            dishListPresenter,
            view)
        }
    }
}

export default HomePageConfigurator