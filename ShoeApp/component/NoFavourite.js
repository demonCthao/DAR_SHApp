import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

export default function NoFavourite({navigation}){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>DANH SÁCH YÊU THÍCH </Text>
            <View style={{ width: '100%', backgroundColor: 'black', height: 1 }} />

            <View style={{
                alignItems: 'center', justifyContent: 'center', height: '90%',
            }}>
                <Text style={styles.TitleConten}>Chưa có mặt hàng yêu thích
                </Text>
                <Text style={styles.Conten}>
                    Nhấp vào biểu tượng yêu thích để lưu mặt hàng
                </Text>



                <TouchableOpacity
                    activeOpacity={0.6}
                    style={{
                        flexDirection: 'row',
                        margin: 7,
                        backgroundColor: 'black',
                        padding: 9,
                        borderRadius: 15,
                        paddingLeft: 30,
                        paddingRight: 30,
                        alignItems: 'center'
                    }}
                    onPress={() => { navigation.navigate('AllShoes') }}
                >
                    <View>
                        <Text style={{
                            marginRight: 7,
                            color: 'white',
                            fontWeight: 'bold'
                        }} >Xem sản phẩm </Text>
                    </View>
                    <Image source={require('../image/arrow.png')} />
                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    TitleConten: {
        fontSize: 23,
        width: 300,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    Conten: {
        marginTop: 7,
        width: 330,
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 7
    },


    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 40,
        marginLeft: 15,
        marginBottom: 7,
    },
})