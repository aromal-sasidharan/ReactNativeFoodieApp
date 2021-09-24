import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppViews from "app/configurators/AppViews";
import DishListPage from "app/scenes/DishListPage/DishListPage";
import {HomePage} from "app/scenes/HomePage/HomePage";
import HomePageConfigurator from "app/configurators/HomePageConfigurator";


const Stack = createNativeStackNavigator();

class AppNavigator {
    private static instance: AppNavigator

    public static shared(): AppNavigator {
        if (!this.instance) {
            this.instance = new AppNavigator()
        }
        return this.instance
    }

    constructor() {
    }

    rootScene() {
        return (
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name={AppViews.home}>
                            {props =>
                                (

                                    <HomePage {...props}
                                              presenter={HomePageConfigurator.instance().presenter()}
                                    />

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