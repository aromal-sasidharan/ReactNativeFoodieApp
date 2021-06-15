import {AbstractCusinesWorker} from "../domain/UseCases/CusineListUseCase";
import {AbstractCuisine, AbstractCuisineDish} from "../domain/Entities/Cusine";
import {Observable, Observer} from "rxjs";


class CusinesWorker implements AbstractCusinesWorker{
    allCusines(): Observable<AbstractCuisine[] | undefined> {

        return new Observable((observer:Observer<AbstractCuisineDish[] | undefined>) => {

            const json = require("../../assets/Cuisine.json")
            let cusines: Array<AbstractCuisine> = JSON.parse(JSON.stringify(json))
            if (cusines.length === 0) {
                observer.error(Error("No Cushine Dish"))
            } else {
                observer.next(cusines)
                observer.complete()
            }
        })
    }
}

export default CusinesWorker