
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {AbstractUser} from "../../../domain/entity/User";

interface CaurosellViewProps {
    users: AbstractUser[]
    style: ViewStyle
    isLoaded: Boolean
}


function CaurosellView(props: CaurosellViewProps) {
    return <View style={[styles.container, props.style]}>
        {
            props.isLoaded ? (<Text>My name is {props.users[0].name}</Text>) : <Text>Loading... </Text>
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