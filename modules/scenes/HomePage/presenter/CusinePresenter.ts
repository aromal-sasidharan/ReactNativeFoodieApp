import {
    AbstractCusinesInteractor,
    AbstractCusinesPresenter,
    AbstractCusinesPresenterOutput,
    AbstractCusinesWorker
} from "./../../../domain/UseCases/HomePage/CusineListUseCase";
import {AbstractCuisine} from "./../../../domain/Entities/Cusine";
import {BehaviorSubject, Observable, queueScheduler, Subject, Subscription} from "rxjs";
import {map, observeOn} from "rxjs/operators";
import {AbstractHomeCuisineCauroselViewModelMapper} from "../../../domain/UseCases/HomePage/ViewModels/HomeCuisineCauroselViewModelMapper";
import {AbstractCusineCauroselViewModel} from "../../../domain/UseCases/HomePage/ViewModels/CusineCauroselViewModel";



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
                next:value => {this.cusinesSubject.next(value ?? [])},
                error:err => this.errorSubject.next(err)
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
    mapper?:AbstractHomeCuisineCauroselViewModelMapper
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
export {CusinePresenter, CusineInteractor}