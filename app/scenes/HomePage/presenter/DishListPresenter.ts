import {BehaviorSubject, Observable, queueScheduler, Subject, Subscription} from "rxjs"

import {
    AbstractDishListInteractor,
    AbstractDishListPresenter,
    AbstractDishListPresenterOutput,
    AbstractDishListWorker
} from "app/domain/UseCases/HomePage/CusineListUseCase";

import {AbstractCuisine, AbstractDish} from "app/domain/Entities/Cusine";
import {map, subscribeOn, tap} from "rxjs/operators";


class DishListInteractor implements AbstractDishListInteractor {

    worker: AbstractDishListWorker
    dishesSubject: BehaviorSubject<AbstractDish[]> = new BehaviorSubject<AbstractDish[]>([])
    errorSubject: Subject<Error> = new Subject()
    disposable?: Subscription
    constructor(worker: AbstractDishListWorker) {
        this.worker = worker
    }

    loadDishesFor(cusine: AbstractCuisine): void {
        if (cusine.id === undefined) {
            this.dishesSubject.next([])
            return
        }
            this.disposable?.unsubscribe()
            this.disposable = this.worker.dishesForCusineId(cusine.id)
                .pipe(
                    map(value => value?.dishes ?? []),

                )
                .subscribe({
                    next: value => this.dishesSubject.next(value),
            
                })
    }

    onError(): Observable<Error> {
        return this.errorSubject.asObservable()
    }

    onLoadDishes(): Observable<AbstractDish[]> {
        return this.dishesSubject.asObservable()
    }
}


class DishListPresenter implements AbstractDishListPresenter {

    interactor?: AbstractDishListInteractor
    output?: AbstractDishListPresenterOutput
    subscription?: Subscription
    constructor(interactor: AbstractDishListInteractor) {
        this.interactor = interactor
        this.setupSubsriber()
    }

    setupSubsriber(): void {
        this.subscription = new Subscription()
        const sb1 = this.interactor?.onLoadDishes()
            .subscribe({
                next:value => {this.output?.onLoadDishes(value ?? [])}
                }
            )
        this.subscription?.add(
           sb1
        )
    }

    loadDishesFor(cusine: AbstractCuisine): void {
        this.interactor?.loadDishesFor(cusine)
    }
}

export {DishListPresenter, DishListInteractor}