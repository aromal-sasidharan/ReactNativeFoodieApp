import React from 'react';
import {Text, View} from 'react-native';
import {Navigation} from "./../../Utils/NavigationUtils";

interface DishListPageProps {
    navigation: Navigation
}
interface DishListPageState {

}
class DishListPage extends React.Component<DishListPageProps,DishListPageState> {
    navigation: Navigation
    constructor(props: DishListPageProps) {
        super(props)
        this.navigation = props.navigation
    }
    render() {
        return (<View style={{backgroundColor: "red"}}>
            <Text>Hello World</Text>
            </View>)
    }

}

export default DishListPage