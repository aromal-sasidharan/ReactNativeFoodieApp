import {AbstractCuisine} from "app/domain/Entities/Cusine";


interface AbstractCusineCauroselViewModel {
    image?: string
    name?: string
}


class HomeCuisineCauroselViewModel implements AbstractCusineCauroselViewModel {
    image?: string
    name?: string
    entity?: AbstractCuisine
}

export {
    AbstractCusineCauroselViewModel,
    HomeCuisineCauroselViewModel
}
