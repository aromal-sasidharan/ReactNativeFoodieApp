import AppViews from 'app/configurators/AppViews';
import CaurosellView from "app/scenes/HomePage/views/CaurosellView";
import DishesListView from "app/scenes/HomePage/views/DishesListView";
import {NavigationProp} from "@react-navigation/native";
import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {HomePagePresenterContext} from 'app/configurators/Presenters';

type HomePageProps = {
    navigation?: NavigationProp<any>;
}

@observer
class HomePage extends Component<HomePageProps, {}> {
    static contextType =  HomePagePresenterContext
    navigation?: NavigationProp<any>
    constructor(props: HomePageProps) {
        super(props)
        this.navigation = props.navigation
    }
    componentDidMount() {
        this.context?.loadAllCuisines()
    }
    navigateToDetailPage() {
        this.navigation?.navigate(AppViews.detail)
    }
    render() {
        return (

        <SafeAreaView style={styles.container} >
            <CaurosellView
                style={{ flex: 1 }}
                cusines={this.context?.cusines ?? []}
                isLoaded={false}
                onItemCliked={item=>{this.navigateToDetailPage()}}
                onItemChanged={item=>{this.context?.loadCuisineSelected(item)}}
            />
            <DishesListView
                dishes={this.context?.dishes ?? []}
                isLoading={this.context?.isLoading ?? false}
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

