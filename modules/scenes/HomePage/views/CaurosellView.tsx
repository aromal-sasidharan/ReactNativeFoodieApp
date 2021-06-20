
import {
    ColorValue,
    Image,
    LayoutChangeEvent,
    StyleSheet,
    Text,
    View,
    ViewStyle
} from 'react-native';
import React, {Component} from 'react';
import {AbstractCuisine} from "../../../domain/Entities/Cusine";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { TouchableHighlight } from 'react-native';
import {AbstractCusineCauroselViewModel} from "../../../domain/UseCases/HomePage/ViewModels/CusineCauroselViewModel";

interface CaurosellViewProps {
    cusines: AbstractCusineCauroselViewModel[]
    style: ViewStyle
    isLoaded: Boolean
    onItemCliked: (cusine:AbstractCusineCauroselViewModel) => void
    onItemChanged: (cusine:AbstractCusineCauroselViewModel) => void
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
    private onItemClicked(cusine: AbstractCuisine) {
    
        this.props.onItemCliked(cusine)
    }
    private onItemChanged(cusine: AbstractCuisine) {
    
        this.props.onItemChanged(cusine)
    }
    render() {
        return <View style={[styles.container, this.props.style]}
                     onLayout={this.onPageLayout}
        >
            <SwiperFlatList
                // autoplay
                // autoplayDelay={2}
                // autoplayLoop
                // showPagination
                onChangeIndex={item => {
                    this.onItemChanged(this.props.cusines[item.index])
                }}
                data={this.props.cusines}
                renderItem={({ item }) => this.renderCaurosellCell(this.state.width, this.state.height, item)}
            />
        </View>
    }
    renderCaurosellCell(width:number, height:number, item: AbstractCusineCauroselViewModel) {

        return (
            <TouchableHighlight onPress={() => this.onItemClicked(item)} >
            <View style={[styles.child, {width:width, height:height }]}>
                { (item.image !== undefined ) && <Image source={{uri:item.image}} style={{width:width, height:height }}/>}
                <View style={[styles.bottom,{width:width}]}>
                    <Text style={styles.bottomChild}>{item.name}</Text>
                </View>
            </View>
            </TouchableHighlight>
        )
    }
}



const styles = StyleSheet.create({
    bottomChild: {
        color:"black",
        fontSize: 30,
        fontWeight: "bold",
        alignItems: "flex-start"
       
    },
    bottom: {
        bottom:0,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:0,
        paddingBottom:0,
        margin:0,
        position: 'absolute',
        backgroundColor:"rgba(255, 255, 255, 0.8)",
        marginBottom:40
    },
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
    },
    child: { justifyContent: 'center',  alignItems: 'center' },

});
export default CaurosellView