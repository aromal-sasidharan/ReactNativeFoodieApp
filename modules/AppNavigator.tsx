import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {homeScene} from './configurators/HomePageConfigurator';
import AppViews from './configurators/AppViews';
import DishListPage from './scenes/DishListPage/DishListPage';


const Stack = createStackNavigator()
class AppNavigator {
    private static instance: AppNavigator
    public static shared(): AppNavigator {
        if (!this.instance) {
            this.instance = new AppNavigator()
        }
        return this.instance
    }

    rootScene() {
        return <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={AppViews.home}>
                    {props => homeScene(props)}
                </Stack.Screen>
                <Stack.Screen name={AppViews.detail}>
                    {props => <DishListPage {...props}/> }
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    }
}
   {/* <Stack.Screen name="Home">
                    {props => <HomeScreen {...props} extraData={someData} />}
                </Stack.Screen> */}

export default AppNavigator