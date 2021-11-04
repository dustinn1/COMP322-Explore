import React from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, Image} from 'react-native';


const DEVICE_WIDTH = Dimensions.get("window").width;

export default class Carousel extends React.Component{
    scrollRef = React.createRef();
    constructor(props){
        super(props);
        this.state={
            selectedIndex:0
        };
        this.scrollref = React.createRef();
    }
    
    render(){
        const {images}=this.props;
        const{selectedIndex}=this.state;
        return(
            <View style={{height:'100%', width:'100%'}}>
            <ScrollView horizontal pagingEnabled>
                {images.map((item, index, id) =>(
                    <View>
                    <Text 
                        key={id} 
                        style={styles.backgroundTitle} 
                        onPress={()=>{
                            alert('You clicked me!'); 
                            console.log(item.id);
							alert('Test');
                            }}>{item.title}
                    </Text> 
                    <Image 
                        key={index} 
                        style={styles.backgroundImage} 
                        source={{uri:item.link}}/>
                    </View>
                ))}
            </ScrollView>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    backgroundImage:{
        height:"100%",
        width: Dimensions.get("window").width
    },
    backgroundTitle:{
        height:50,
        width:Dimensions.get("window").width,
        backgroundColor:"black",
        color:"white",
        textAlign:"center",
        fontSize:20,
        fontFamily:"sans-serif",
        paddingTop:10
    }
})