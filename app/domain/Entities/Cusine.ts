interface AbstractCuisine {
    id?: string
    name?: string
    imageUrl?: string
}

interface AbstractDish {
    id?: string
    name?: string
    image?: string
    rating?: number
    price?: number
}

interface AbstractCartItem {
    id: string
    quantiy: number
    dish: AbstractDish
}

interface AbstractCuisineDish {
    id?: string
    dishes?: AbstractDish[]
}

export {AbstractCuisine, AbstractDish, AbstractCartItem, AbstractCuisineDish}