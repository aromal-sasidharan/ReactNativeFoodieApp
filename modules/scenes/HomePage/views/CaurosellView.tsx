
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {AbstractCuisine} from "../../../domain/Entities/Cusine";

interface CaurosellViewProps {
    cusines: AbstractCuisine[]
    style: ViewStyle
    isLoaded: Boolean
}


function CaurosellView(props: CaurosellViewProps) {
    return <View style={[styles.container, props.style]}>
        {
            props.isLoaded ? (<Text>My name is {props.cusines[0].name}</Text>) : <Text>Loading... </Text>
        }
    </View>
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        color: "yellow",
        justifyContent: "center"
        
    },
});
export default CaurosellView