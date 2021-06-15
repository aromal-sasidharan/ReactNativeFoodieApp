
import {
    ColorValue,
    Dimensions,
    Image,
    LayoutChangeEvent,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    ViewStyle
} from 'react-native';
import React, {Component} from 'react';
import {AbstractCuisine} from "../../../domain/Entities/Cusine";
import { SwiperFlatList } from 'react-native-swiper-flatlist';

interface CaurosellViewProps {
    cusines: AbstractCuisine[]
    style: ViewStyle
    isLoaded: Boolean
    onItemCliked: (cusine:AbstractCuisine) => void
}
interface CaurosellViewState {
   width: number
    height: number
}
const colors: ColorValue[] = ['tomato', 'thistle', 'skyblue', 'teal'];



class CaurosellView extends Component<CaurosellViewProps, CaurosellViewState> {
    state: CaurosellViewState = {
      width: 0.0,
      height: 0.0
    }
    onPageLayout = (event:LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        this.setState({width, height})
    }
    _onItemClicked(cusine: AbstractCuisine) {
    
        this.props.onItemCliked(cusine)
    }
    render() {
        console.log("CaurosellView rendering")
        return <View style={[styles.container, this.props.style]}
                     onLayout={this.onPageLayout}
        >
            <SwiperFlatList
                // autoplay
                // autoplayDelay={2}
                // autoplayLoop
                onChangeIndex={item => {this._onItemClicked(this.props.cusines[item.index])}}
                showPagination
                data={this.props.cusines}
                renderItem={({ item }) => this.renderCaurosellCell(this.state.width, this.state.height, item)}
            />
        </View>
    }
    renderCaurosellCell(width:number, height:number, item: AbstractCuisine) {

        return (
            <View style={[styles.child, {width:width, height:height }]}>
                { (item.imageUrl !== undefined ) && <Image source={{uri:item.imageUrl}} style={{width:width, height:height }}/>}
                <View style={styles.bottom}>
                    <Text style={styles.bottomChild}>{item.name}</Text>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    bottomChild: {
        bottom:0,
        position: 'absolute',
        color:"white",
        fontSize: 20,
        fontWeight: "bold"
    },
    bottom: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
    },
    child: { justifyContent: 'center',  alignItems: 'center' },

});
export default CaurosellView