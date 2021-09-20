import 'react-native-gesture-handler';
import React from 'react';
import {homeScene} from 'app/configurators/HomePageConfigurator';



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