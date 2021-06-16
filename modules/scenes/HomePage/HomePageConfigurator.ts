import { AbstractCusinesPresenter, AbstractCusinesWorker, AbstractCusinesInteractor, AbstractDishListInteractor, AbstractDishListPresenter, AbstractDishListWorker } from "../../domain/UseCases/CusineListUseCase"
import CusinesWorker from "../../microservices/CusinesWorker"
import DishListWorker from "../../microservices/DishListWorker"
import {CusinePresenter, CusineInteractor} from "./presenter/CusinePresenter"
import { DishListInteractor, DishListPresenter } from "./presenter/DishListPresenter"
import { AbstractHomePageView, AbstractHomePagePresenter, HomePagePresenter } from "./presenter/HomePagePresenter"



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