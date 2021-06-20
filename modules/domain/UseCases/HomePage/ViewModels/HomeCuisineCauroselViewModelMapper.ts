import {AbstractCusineCauroselViewModel} from "./CusineCauroselViewModel";
import {AbstractCuisine} from "../../../Entities/Cusine";

interface AbstractHomeCuisineCauroselViewModelMapper {
    mapAllAbstractCuisineToViewModel(entities: AbstractCuisine[]): AbstractCusineCauroselViewModel []
}


export {AbstractHomeCuisineCauroselViewModelMapper}
