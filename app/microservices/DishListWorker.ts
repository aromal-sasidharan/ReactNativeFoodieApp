import {AbstractDishListWorker} from "app/domain/UseCases/HomePage/CusineListUseCase";
import {AbstractCuisineDish} from "app/domain/Entities/Cusine";
import {Observable, Observer} from "rxjs";
import { delay } from "rxjs/operators";


class DishListWorker implements AbstractDishListWorker{
    dishesForCusineId(id: string): Observable<AbstractCuisineDish | undefined> {

        return new Observable((observer:Observer<AbstractCuisineDish | undefined>) => {

            const json = require("../../assets/Dishes.json")
            let cusineDishes: Array<AbstractCuisineDish> = JSON.parse(JSON.stringify(json))
            cusineDishes = cusineDishes.filter(x => x.id === id)
            if (cusineDishes.length === 0) {
                observer.error(Error("No Cushine Dish"))
            } else {
                observer.next(cusineDishes[0])
                observer.complete()
            }
        })
        .pipe(delay(4000))
    }
}

export default DishListWorker