import {AbstractHomeCuisineCauroselViewModelMapper} from "app/domain/UseCases/HomePage/ViewModels/HomeCuisineCauroselViewModelMapper";
import {
    AbstractCusineCauroselViewModel,
    HomeCuisineCauroselViewModel
} from "app/domain/UseCases/HomePage/ViewModels/CusineCauroselViewModel";
import {AbstractCuisine} from "app/domain/Entities/Cusine";


class CusineCauroselViewModelMapper implements AbstractHomeCuisineCauroselViewModelMapper {
    mapAllAbstractCuisineToViewModel(entities: AbstractCuisine[]): AbstractCusineCauroselViewModel[] {
        let models: (AbstractCusineCauroselViewModel | null)[] = entities.map(this.mapCuisineToViewModel())
        let models2 = models.reduce((previousValue, currentValue) => {
            if (currentValue)
                previousValue.push(currentValue)
            return previousValue
        }, new Array<AbstractCusineCauroselViewModel>())
        return models2
    }

    mapCuisineToViewModel(): ((value: AbstractCuisine)
        => (AbstractCusineCauroselViewModel | null)) {
        return (value) => {
            if (value.id) {
                let model = new HomeCuisineCauroselViewModel()
                model.entity = value
                model.name = value.name
                model.image = value.imageUrl
                return model
            }
            return null
        }
    }
}

export default CusineCauroselViewModelMapper