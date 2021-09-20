import AppViews from 'app/configurators/AppViews';
import AbstractHomePagePresenter from 'app/domain/UseCases/HomePage/HomePageUseCase';
import CaurosellView from "app/scenes/HomePage/views/CaurosellView";
import DishesListView from "app/scenes/HomePage/views/DishesListView";
import { Navigation } from "app/Utils/NavigationUtils";
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import {StyleSheet} from "react-native";


type HomePageProps = {
    navigation?: Navigation
    presenter?: AbstractHomePagePresenter
}

@observer
class HomePage extends Component<HomePageProps, {}> {
    navigation?: Navigation
    presenter?: AbstractHomePagePresenter
    constructor(props: HomePageProps) {
        super(props)
        this.presenter = props.presenter
        this.navigation = props.navigation 
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
                cusines={this.presenter?.cusines ?? []}
                isLoaded={false}
                onItemCliked={item=>{this.navigateToDetailPage()}}
                onItemChanged={item=>{this.presenter?.loadCuisineSelected(item)}}
            />
            <DishesListView
                dishes={this.presenter?.dishes ?? []}
                isLoading={this.presenter?.isLoading ?? false}
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

