import React, {Component} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {AbstractCuisine, AbstractDish} from '../../domain/Entities/Cusine';
import CaurosellView from './views/CaurosellView';
import DishesListView from "./views/DishesListView"
import {AbstractHomePagePresenter, AbstractHomePageView} from './../../domain/UseCases/HomePage/HomePageUseCase';
import AppViews from '../../configurators/AppViews';
import {Navigation} from "./../../Utils/NavigationUtils";


type HomePageProps = {
    navigation: Navigation
    presenter?:((view: AbstractHomePageView) => AbstractHomePagePresenter)
}
type HomePageState = {
    cusines?: AbstractCuisine[]
    dishes?: AbstractDish[]
    isDishesLoadIng?:boolean
}

class HomePage extends Component<HomePageProps, HomePageState> implements AbstractHomePageView{
    state: HomePageState = {
        cusines: undefined,
        dishes: undefined,
        isDishesLoadIng: undefined
    }
    navigation: Navigation
    presenter?: AbstractHomePagePresenter
    constructor(props: HomePageProps) {
        super(props)
        if (props.presenter)
        this.presenter = props.presenter(this)
        this.navigation = props.navigation 
    }
    componentDidMount() {
        this.presenter?.loadAllCuisines()
    }
    navigateToDetailPage() {
        this.navigation.navigate(AppViews.detail)
    }
    render() {
        
        return (
 
        <SafeAreaView style={styles.container} >

            <CaurosellView
                style={{ flex: 1 }}
                cusines={this.state.cusines ?? []}
                isLoaded={false}
                onItemCliked={item=>{this.navigateToDetailPage()}}
                onItemChanged={item=>{this.presenter?.loadCuisineSelected(item)}}
            />
            <DishesListView
                dishes={this.state.dishes ?? []}
                isLoading={this.state.isDishesLoadIng}
                style={{ flex: 2, backgroundColor: "darkorange" }}
            />
        </SafeAreaView>
        )


    }

    onLoadDishes(dishes: AbstractDish[]): void {
        this.setState({
            dishes: dishes,
        })
    }

    onLoadCusines(cusines: AbstractCuisine[]): void {
        this.setState({
            cusines: cusines
        })
    }
    showDishesLoding(flag: boolean) {
        this.setState({
            isDishesLoadIng: flag,
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
export {HomePage,HomePageProps, HomePageState}

