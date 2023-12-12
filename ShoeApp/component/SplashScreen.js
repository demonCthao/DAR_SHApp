import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'

const SplashScreen =(props)=>{
    setTimeout(()=>{
        props.navigation.navigate('SplashScreen2');
    },3000);
    return(
        <View style={styles.container} >
            <Text style={styles.text}>Chào mừng các bạn đến với shop</Text>
            <Text style={styles.text}>Chúng tôi rất vui vì bạn đã đến</Text>
        </View>
    )
}
export default SplashScreen;
const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'black',
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        color:'white',
        fontSize:22,
        padding:8
    }
})