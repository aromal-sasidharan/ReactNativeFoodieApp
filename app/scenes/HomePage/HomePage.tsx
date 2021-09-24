import AppViews from 'app/configurators/AppViews';
import CaurosellView from "app/scenes/HomePage/views/CaurosellView";
import DishesListView from "app/scenes/HomePage/views/DishesListView";
import {NavigationProp} from "@react-navigation/native";
import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AbstractHomePagePresenter from "app/domain/UseCases/HomePage/HomePageUseCase";
import {AbstractHomePageStore} from "app/stores/HomePageStore";

type HomePageProps = {
    navigation?: NavigationProp<any>;
    presenter?: AbstractHomePagePresenter
    store?: AbstractHomePageStore
}

@observer
class HomePage extends Component<HomePageProps, {}> {
    // static contextType =  HomePagePresenterContext
    navigation?: NavigationProp<any>
    presenter?: AbstractHomePagePresenter
    constructor(props: HomePageProps) {
        super(props)
        this.navigation = props.navigation
        this.presenter = props.presenter
    }
    componentDidMount() {
        this.presenter?.loadAllCuisines()
    }
    navigateToDetailPage() {
        this.navigation?.navigate(AppViews.detail)
    }
    render() {
        return (

        <SafeAreaView style={styles.container} >
            <CaurosellView
                style={{ flex: 1 }}
                cusines={this.presenter?.store?.cusines ?? []}
                isLoaded={false}
                onItemCliked={item=>{this.navigateToDetailPage()}}
                onItemChanged={item=>{this.presenter?.loadCuisineSelected(item)}}
            />
            <DishesListView
                dishes={this.presenter?.store?.dishes ?? []}
                isLoading={this.presenter?.store?.isCusinesLoading ?? false}
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
        // backgroundColor: 'green',
    },
});

export { HomePage, HomePageProps };

