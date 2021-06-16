import {AbstractDishListWorker} from "./../domain/UseCases/HomePage/CusineListUseCase";
import {AbstractCuisineDish} from "./../domain/Entities/Cusine";
import {Observable, Observer} from "rxjs";


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
    }
}

export default DishListWorker