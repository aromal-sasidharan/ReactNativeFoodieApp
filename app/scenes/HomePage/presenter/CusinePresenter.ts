import {AbstractCuisine} from "app/domain/Entities/Cusine";
import {
    AbstractCusinesInteractor,
    AbstractCusinesPresenter,
    AbstractCusinesPresenterOutput,
    AbstractCusinesWorker
} from "app/domain/UseCases/HomePage/CusineListUseCase";
import {AbstractHomeCuisineCauroselViewModelMapper} from "app/domain/UseCases/HomePage/ViewModels/HomeCuisineCauroselViewModelMapper";
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";
import {map} from "rxjs/operators";


class CusineInteractor implements AbstractCusinesInteractor {
    worker: AbstractCusinesWorker
    disposable?: Subscription
    cusinesSubject: BehaviorSubject<AbstractCuisine[]> = new BehaviorSubject<AbstractCuisine[]>([])
    errorSubject: Subject<Error> = new Subject()

    constructor(worker: AbstractCusinesWorker) {
        this.worker = worker
    }

    loadAllCusines(): void {
        this.disposable?.unsubscribe()
        this.disposable =
            this.worker.allCusines()
                .subscribe({
                    next: value => {
                        this.cusinesSubject.next(value ?? [])
                    },
                    error: err => this.errorSubject.next(err)
                })
    }

    onError(): Observable<Error> {
        return this.errorSubject
    }

    onLoadCusines(): Observable<AbstractCuisine[]> {
        return this.cusinesSubject.asObservable()
    }
}

class CusinePresenter implements AbstractCusinesPresenter {
    interactor: AbstractCusinesInteractor
    output?: AbstractCusinesPresenterOutput
    subscription?: Subscription
    mapper?: AbstractHomeCuisineCauroselViewModelMapper

    constructor(interactor: AbstractCusinesInteractor, mapper: AbstractHomeCuisineCauroselViewModelMapper) {
        this.interactor = interactor
        this.mapper = mapper
        this.setupSubsriber()
    }

    setupSubsriber(): void {
        this.subscription = new Subscription()
        const sb1 = this.interactor?.onLoadCusines()
            .pipe(
                map(value => this.mapper?.mapAllAbstractCuisineToViewModel(value) ?? [])
            )
            .subscribe(value => {
                this.output?.onLoadCusines(value)
            })

        this.subscription?.add(
            sb1
        )
    }

    loadAllCusines(): void {
        this.interactor.loadAllCusines()
    }

}

export {CusinePresenter, CusineInteractor};
