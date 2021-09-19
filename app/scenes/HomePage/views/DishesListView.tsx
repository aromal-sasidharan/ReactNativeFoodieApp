import {StyleSheet, FlatList, View, Text, ViewStyle, ActivityIndicator} from "react-native";
import React from "react";
import {AbstractDish} from "app/domain/Entities/Cusine";


interface DishListViewItem {
    item: AbstractDish
}

const Item = ({item}: DishListViewItem) => (
    <View style={styles.item}>
        <Text style={styles.title}>Dish: {item.name}</Text>
    </View>
);

interface DishListViewProp {
    style: ViewStyle
    dishes?: AbstractDish[]
    isLoading?: boolean
}

function DishesListView(props: DishListViewProp) {

    if (props.isLoading) {
        return  (<View style={[props.style,{justifyContent:"center"}]}>
            <ActivityIndicator size={"large"}/>
        </View>)
    }
    if (props.dishes === null || (props.dishes?.length ?? 0) === 0) {
        return (
                <View style={[props.style,{alignContent:"center", alignItems:"center", justifyContent:"center"}]}>
                    <Text>No Data Available</Text>
                </View>
        )
    }

    return <View style={props.style}>

        <FlatList
            data={props.dishes}
            renderItem={Item}
            keyExtractor={item => item.id ?? ""}
        />
    </View>
}


const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
export default DishesListView