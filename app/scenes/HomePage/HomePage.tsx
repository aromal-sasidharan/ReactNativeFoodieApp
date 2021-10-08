import AppViews from 'app/configurators/AppViews';
import CaurosellView from "app/scenes/HomePage/views/CaurosellView";
import DishesListView from "app/scenes/HomePage/views/DishesListView";
import {NavigationProp} from "@react-navigation/native";
import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AbstractHomePagePresenter from "app/domain/UseCases/HomePage/HomePageUseCase";
import {HomePageContext, IHomePageContext} from "app/ContextTypes";
import {HomePagePresenterCompletion} from "app/configurators/HomePageConfigurator";


interface HomePageProps {
    navigation?: NavigationProp<any>
    presenter: HomePagePresenterCompletion
}

@observer
class HomePage extends Component<HomePageProps> {
    static contextType = HomePageContext
    navigation?: NavigationProp<any>
    presenter?: AbstractHomePagePresenter
    myContext?: IHomePageContext

    constructor(props: HomePageProps,
                context: IHomePageContext // Eureka i didn't find in documentation
    ) {
        super(props)
        this.navigation = props.navigation
        this.presenter = props.presenter(context)
        this.myContext = context
    }

    componentDidMount() {
        this.presenter?.loadAllCuisines()
    }

    navigateToDetailPage() {
        this.navigation?.navigate(AppViews.detail)
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <CaurosellView
                    style={{flex: 1}}
                    cusines={this.presenter?.store?.cusines ?? []}
                    isLoaded={false}
                    onItemCliked={item => {
                        this.navigateToDetailPage()
                    }}
                    onItemChanged={item => {
                        this.presenter?.loadCuisineSelected(item)
                    }}
                />
                <DishesListView
                    dishes={this.presenter?.store?.dishes ?? []}
                    isLoading={this.presenter?.store?.isCusinesLoading ?? false}
                    style={{flex: 2, backgroundColor: "darkorange"}}
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

export {HomePage, HomePageProps};

