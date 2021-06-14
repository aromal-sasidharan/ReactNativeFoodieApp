import React, {Component} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {AbstractCuisine, AbstractCuisineDish, AbstractDish} from '../../domain/Entities/Cusine';
import CaurosellView from './views/CaurosellView';
import DishesListView from "./views/DishesListView"

type HomePageProps = {

}
type HomePageState = {
    cusines?: AbstractCuisine[]
    dishes?: AbstractDish[]
}

class HomePage extends Component<HomePageProps, HomePageState> {
    state: HomePageState = {
        cusines: undefined,
        dishes: undefined
    }
    async componentDidMount() {
        console.log("componentDidMount")
        try {
            let cusines: AbstractCuisine[] = await this.loadCusines()
            let dishes = await this.loadDishesFor("2")
            this.setState({
                cusines: cusines,
                dishes : dishes,
            })
        }
        catch (e) {
            console.log(e)
        }
        finally {

        }
    }
    loadDishesFor(cusineid:string): AbstractDish[] | undefined {
        const json = require("../../../assets/Dishes.json")
        const cusineDishes: Array<AbstractCuisineDish> = JSON.parse(JSON.stringify(json))
        const cusineDish = cusineDishes.filter(x => x.id === cusineid)
        return cusineDish[0].dishes
    }
    loadCusines(): AbstractCuisine[] {
        const json = require("../../../assets/Cuisine.json")
        const cusines: Array<AbstractCuisine> = JSON.parse(JSON.stringify(json))
        return cusines
    }
    render() {
        
        return (
 
        <SafeAreaView style={styles.container} >
            <CaurosellView
                style={{ flex: 1 }}
                cusines={[]}
                isLoaded={false}
            />
            <DishesListView
                dishes={this.state.dishes ?? []}
                style={{ flex: 2, backgroundColor: "darkorange" }}
            />
        </SafeAreaView>
        )


    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'red',
    },
});
export default HomePage

