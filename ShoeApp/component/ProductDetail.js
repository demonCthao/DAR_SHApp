import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { getAuth } from "firebase/auth";
import firebase from '../config/FirebaseConfig';

function ProductDetail({ route, navigation }) {
    const { product } = route.params;
    const [quantity, setQuantity] = useState(1);

    const addToCart = () => {
        const auth = getAuth(firebase)
    }
    const increaseQuantity =()=>{
        setQuantity(quantity +1);
        
    }
    const decreaseQuantity =()=>{
        if(quantity >1){
            setQuantity(quantity-1);
        }
    }
    const addtoFavo = () => {

    }
    const buyNow = ()=>{
        alert('chức năng đang phát triển')
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.search_image }} style={styles.productImage} />
            <TouchableOpacity style={{ position: 'absolute', marginTop: 16, marginLeft: 330 }} onPress={addtoFavo}>
                <Image source={require('../image/fa.png')} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.productName}>{product.brands_filter_facet}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
            </View>
            <Text style={styles.productAdditionalInfo}>{product.product_additional_info}</Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
                    <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
                <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.addToCartButton} onPress={buyNow}>
                <Text style={styles.addToCartButtonText}>Mua ngay</Text>
            </TouchableOpacity>
        </View>
    )
}
export default ProductDetail;
const styles = StyleSheet.create({
    productImage: {
        width: 420,
        height: 300
    },
    productName:{
        fontSize:24,
        fontWeight:'bold',
        marginTop:16,
        marginLeft:16,
    },
    productPrice:{
        fontSize:18,
        color:'#990000',
        marginTop:20,
        marginLeft:40,
    },
    productAdditionalInfo:{
        fontSize:19,
        marginTop:8,
        marginLeft:16,
    },
    quantityContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginTop: 16,
        marginLeft: 10
    },
    quantityButton:{
        backgroundColor: '#666',
        paddingHorizontal:16,
        paddingVertical:8,
        borderRadius:8,
        marginHorizontal:8,
    },
    quantityButtonText:{
        color:'white',
        fontSize:16,
        fontWeight:'bold'
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    addToCartButton: {
        backgroundColor: '#666',
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderRadius: 20,
        marginTop: 26,
        marginHorizontal: 16,
    },
    addToCartButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})