import React, {Component, Context} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {AbstractCuisine, AbstractCuisineDish, AbstractDish} from '../../domain/Entities/Cusine';
import CaurosellView from './views/CaurosellView';
import DishesListView from "./views/DishesListView"
import {AbstractHomePagePresenter, AbstractHomePageView, HomePagePresenter} from "./presenter/HomePagePresenter";
import HomePageConfigurator from './HomePageConfigurator';

type HomePageProps = {
    presenter?:((view: AbstractHomePageView) => AbstractHomePagePresenter)
}
type HomePageState = {
    cusines?: AbstractCuisine[]
    dishes?: AbstractDish[]
}

class HomePage extends Component<HomePageProps, HomePageState> implements AbstractHomePageView{
    state: HomePageState = {
        cusines: undefined,
        dishes: undefined
    }
    presenter?: AbstractHomePagePresenter
    constructor(props: HomePageProps) {
        super(props)
        if (props.presenter)
        this.presenter = props.presenter(this) 
    }
    componentDidMount() {
        this.presenter?.loadAllCuisines()
    }

    render() {
        
        return (
 
        <SafeAreaView style={styles.container} >

            <CaurosellView
                style={{ flex: 1 }}
                cusines={this.state.cusines ?? []}
                isLoaded={false}
                onItemCliked={item=>{this.presenter?.loadCuisineSelected(item)}}
            />
            <DishesListView
                dishes={this.state.dishes ?? []}
                style={{ flex: 2, backgroundColor: "darkorange" }}
            />
        </SafeAreaView>
        )


    }

    onLoadDishes(dishes: AbstractDish[]): void {
        this.setState({
            dishes: dishes
        })
    }

    onLoadCusines(cusines: AbstractCuisine[]): void {
        this.setState({
            cusines: cusines
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'green',
    },
});
export default HomePage

