import {AbstractCusineCauroselViewModel} from "app/domain/UseCases/HomePage/ViewModels/CusineCauroselViewModel";
import {AbstractCuisine} from "app/domain/Entities/Cusine";

interface AbstractHomeCuisineCauroselViewModelMapper {
    mapAllAbstractCuisineToViewModel(entities: AbstractCuisine[]): AbstractCusineCauroselViewModel []
}


export {AbstractHomeCuisineCauroselViewModelMapper}
