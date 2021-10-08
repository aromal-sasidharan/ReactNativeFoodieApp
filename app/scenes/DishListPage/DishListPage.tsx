import React from 'react';
import {Text, View} from 'react-native';
import {Navigation} from "app/Utils/NavigationUtils";

interface DishListPageProps {
    navigation: Navigation
}

class DishListPage extends React.Component<DishListPageProps, {}> {
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