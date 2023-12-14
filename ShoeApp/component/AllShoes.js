import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity, Image } from 'react-native';

export default function AllShoes({ navigation }) {
    const [products, setProducts] = useState([]);
    const handleProductPress = (product) => {
        navigation.navigate('ProductDetail', { product });

    };
    useEffect(() => {
        fetch('https://hungnttg.github.io/shopgiay.json')
            .then((response) => response.json())
            .then((data) => setProducts(data.products))
            .catch((error) => {
                console.error(error);
            })
    }, []);
    return (
        <View >
            <ScrollView contentContainerStyle={styles.contentContainer} showsHorizontalScrollIndicator={false}>
                {
                    products.map((product) => (
                        <TouchableOpacity key={product.styleid} style={styles.productItem} onPress={() => handleProductPress(product)} >
                            <View style={styles.productFrame}>
                                <Image source={{ uri: product.search_image }} style={styles.productImage} />
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.productName}>Hãng: </Text>

                                        <Text style={styles.productName}>{product.brands_filter_facet}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.productPrice}>Giá: </Text>

                                        <Text style={styles.productPrice}>{product.price}</Text>
                                    </View>
                                    <Text numberOfLines={1} style={styles.productAdditionalInfo}>{product.product_additional_info} </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))

                }
            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
    productFrame: {
        margin: 10,
        borderRadius: 16,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row'
    },
    productImage: {
        width: 123,
        height: 123,
        borderRadius: 16, 
        margin: '5%'
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
     
        
    },
    productPrice: {
        fontSize: 18,
        color: '#888',
        marginTop: 10,
        
    },
    productAdditionalInfo: {
        fontSize: 14,
        color: '#888',
        marginTop: 10,
        width:190
        
    },
})