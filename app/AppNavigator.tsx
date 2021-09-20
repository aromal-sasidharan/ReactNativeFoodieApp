import 'react-native-gesture-handler';
import React from 'react';
import {homeScene} from 'app/configurators/HomePageConfigurator';
import AppViews from 'app/configurators/AppViews';
import DishListPage from 'app/scenes/DishListPage/DishListPage';;

class AppNavigator {
    private static instance: AppNavigator
    public static shared(): AppNavigator {
        if (!this.instance) {
            this.instance = new AppNavigator()
        }
        return this.instance
    }

    rootScene() {
        return homeScene()
    }
}
   {/* <Stack.Screen name="Home">
                    {props => <HomeScreen {...props} extraData={someData} />}
                </Stack.Screen> */}
export default AppNavigator