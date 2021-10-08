import {
    AbstractCusinesInteractor,
    AbstractCusinesPresenter,
    AbstractCusinesWorker,
    AbstractDishListInteractor,
    AbstractDishListPresenter,
    AbstractDishListWorker
} from "app/domain/UseCases/HomePage/CusineListUseCase"
import CusinesWorker from "app/microservices/CusinesWorker"
import DishListWorker from "app/microservices/DishListWorker"
import AbstractHomePagePresenter from "app/domain/UseCases/HomePage/HomePageUseCase"
import {CusineInteractor, CusinePresenter} from "app/scenes/HomePage/presenter/CusinePresenter"
import {DishListInteractor, DishListPresenter} from "app/scenes/HomePage/presenter/DishListPresenter"
import HomePagePresenter from "app/scenes/HomePage/presenter/HomePagePresenter"
import React from "react";
import CusineCauroselViewModelMapper from "app/scenes/HomePage/mappers/CusineCauroselViewModelMapper";
import {IHomePageContext} from "app/ContextTypes";
import {AbstractHomePageStore} from "app/stores/HomePageStore";

type HomePagePresenterCompletion = (context?: IHomePageContext) => AbstractHomePagePresenter | undefined

class HomePageConfigurator {

    static presenter(): HomePagePresenterCompletion {
        return (context?: IHomePageContext) => {
            if (context && context.mainStore)
                return HomePageConfigurator.configureHomePresenter(context.mainStore)
            return undefined
        }
    }

    private static configureCusinePresenter(): AbstractCusinesPresenter {
        const worker: AbstractCusinesWorker = new CusinesWorker()
        const interactor: AbstractCusinesInteractor = new CusineInteractor(worker)
        return new CusinePresenter(interactor, new CusineCauroselViewModelMapper())
    }

    private static configureDishPresenter(): AbstractDishListPresenter {
        const worker: AbstractDishListWorker = new DishListWorker()
        const interactor: AbstractDishListInteractor = new DishListInteractor(worker)
        return new DishListPresenter(interactor)
    }

    private static configureHomePresenter(homePageStore: AbstractHomePageStore): AbstractHomePagePresenter {
        const dishListPresenter: AbstractDishListPresenter = this.configureDishPresenter()
        const cuisinePresenter: AbstractCusinesPresenter = this.configureCusinePresenter()
        return new HomePagePresenter(homePageStore,
            cuisinePresenter,
            dishListPresenter)
    }
}

export {HomePageConfigurator, HomePagePresenterCompletion}

