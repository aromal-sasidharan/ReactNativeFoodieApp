import {StyleSheet, FlatList, View, Text, ViewStyle} from "react-native";
import React from "react";


interface PhoneNumberItem {
    item: string
}

const Item = ({item}: PhoneNumberItem) => (
    <View style={styles.item}>
        <Text style={styles.title}>Phone: {item}</Text>
    </View>
);

interface PhoneNumberListProp {
    style: ViewStyle
    numbers?: string[]
}

function PhoneNumbersListView(props: PhoneNumberListProp) {

    if (props.numbers === null || (props.numbers?.length ?? 0) === 0) {
        return (
                <View style={[props.style,{alignContent:"center", alignItems:"center", justifyContent:"center"}]}>
                    <Text>No Data Available</Text>
                </View>
        )
    }
    return <View style={props.style}>

        <FlatList
            data={props.numbers}
            renderItem={Item}
            keyExtractor={item => item}
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
export default PhoneNumbersListView