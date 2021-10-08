import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppViews from "app/configurators/AppViews";
import DishListPage from "app/scenes/DishListPage/DishListPage";
import {HomePage} from "app/scenes/HomePage/HomePage";
import {HomePageConfigurator} from "app/configurators/HomePageConfigurator";
import {HomePageContext} from 'app/ContextTypes';
import {HomePageStore} from "app/stores/HomePageStore";


const Stack = createNativeStackNavigator();

class AppNavigator {
    private static instance: AppNavigator

    constructor() {

    }

    public static shared(): AppNavigator {
        if (!this.instance) {
            this.instance = new AppNavigator()
        }
        return this.instance
    }

    rootScene() {
        return (
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name={AppViews.home}>
                            {props =>
                                (
                                    <HomePageContext.Provider value={{mainStore: new HomePageStore()}}>
                                        <HomePage {...props}
                                                  presenter={HomePageConfigurator.presenter()}
                                        />
                                    </HomePageContext.Provider>
                                )
                            }
                        </Stack.Screen>
                        <Stack.Screen name={AppViews.detail}>
                            {props => <DishListPage {...props}/>}
                        </Stack.Screen>
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>

        )

    }
}

{/* <Stack.Screen name="Home">
                    {props => <HomeScreen {...props} extraData={someData} />}
                </Stack.Screen> */
}
export default AppNavigator