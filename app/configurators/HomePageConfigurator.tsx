import { AbstractCusinesPresenter, AbstractCusinesWorker, AbstractCusinesInteractor, AbstractDishListInteractor, AbstractDishListPresenter, AbstractDishListWorker } from "app/domain/UseCases/HomePage/CusineListUseCase"
import CusinesWorker from "app/microservices/CusinesWorker"
import DishListWorker from "app/microservices/DishListWorker"
import AbstractHomePagePresenter from "app/domain/UseCases/HomePage/HomePageUseCase"
import { CusinePresenter, CusineInteractor } from "app/scenes/HomePage/presenter/CusinePresenter"
import { DishListInteractor, DishListPresenter } from "app/scenes/HomePage/presenter/DishListPresenter"
import { HomePagePresenter } from "app/scenes/HomePage/presenter/HomePagePresenter"
import React from "react";
import CusineCauroselViewModelMapper from "app/scenes/HomePage/mappers/CusineCauroselViewModelMapper";
import {AbstractHomePageStore} from "app/stores/HomePageStore";
class HomePageConfigurator {
    private static shared: HomePageConfigurator
    public static instance(): HomePageConfigurator {
        if (!this.shared) {
            this.shared = new HomePageConfigurator()
        }
        return this.shared
    }

    constructor() { }

    configureCusinePresenter(): AbstractCusinesPresenter {
        const worker: AbstractCusinesWorker = new CusinesWorker()
        const interactor: AbstractCusinesInteractor = new CusineInteractor(worker)
        return new CusinePresenter(interactor, new CusineCauroselViewModelMapper())
    }
    configureDishPresenter(): AbstractDishListPresenter {
        const worker: AbstractDishListWorker = new DishListWorker()
        const interactor: AbstractDishListInteractor = new DishListInteractor(worker)
        return new DishListPresenter(interactor)
    }
    presenterWith(store: AbstractHomePageStore | undefined): AbstractHomePagePresenter {
            const dishListPresenter: AbstractDishListPresenter = this.configureDishPresenter()
            const cuisinePresenter: AbstractCusinesPresenter = this.configureCusinePresenter()
            return new HomePagePresenter(store,
                cuisinePresenter,
                dishListPresenter)
    }
}

export default HomePageConfigurator