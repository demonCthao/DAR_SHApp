import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';

import Swiper from 'react-native-swiper';

function Home({ navigation }) {
    const [products, setProducts] = useState([]);
    const swiperRef = useRef(null);

    useEffect(() => {
        fetch('https://hungnttg.github.io/shopgiay.json')
            .then((response) => response.json())
            .then((data) => setProducts(data.products))
            .catch((error) => {
                console.log(error);
            });
        const interval = setInterval(() => {
            if (swiperRef.current && swiperRef.current.scrollBy) {
                swiperRef.current.scrollBy(1);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);
    const handleProductPress = (product) => {
        navigation.navigate('ProductDetail', { product });
    };


    return (
        <View style={styles.container} >
            <Text style={styles.title}>danh mục sản phẩm</Text>
            <View style={{ width: '100%', backgroundColor: 'black', height: 1 }}></View>
            <View style={styles.slide}>
                <Swiper
                    ref={swiperRef}
                    autoplay={false}
                    showsPagination={true}
                >
                    <View style={styles.slide_img}>
                        <Image source={require('../image/logo.png')} style={styles.imageBackground}></Image>
                        <View style={styles.button_slide}>
                            <Text style={styles.text_slide}>buy now</Text>
                        </View>
                    </View>
                    <View style={styles.slide_img}>
                        <Image source={require('../image/logo1.png')} style={styles.imageBackground}></Image>
                        <View style={styles.button_slide}>
                            <Text style={styles.text_slide}>buy now</Text>
                        </View>
                    </View>
                    <View style={styles.slide_img}>
                        <Image source={require('../image/logo2.png')} style={styles.imageBackground}></Image>
                        <View style={styles.button_slide}>
                            <Text style={styles.text_slide}>buy now</Text>
                        </View>
                    </View>
                </Swiper>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.title1}>sản phẩm thịnh hành</Text>
                <TouchableOpacity onPress={() => { navigation.navigate('AllShoes'); }}
                >
                    <Text style={{ marginRight: 18 }}>xem tất cả</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer} horizontal={true} showsHorizontalScrollIndicator={false} >
                {
                    products.map((product) => (
                        <TouchableOpacity key={product.styleid} style={styles.productItem} onPress={() => handleProductPress(product)}>
                            <View style={styles.productFrame}>
                                <Image source={{ uri: product.search_image }} style={styles.productImage} />
                                <Text style={styles.productName}>{product.brands_filter_facet}</Text>
                                <Text style={styles.productPrice}>{product.price}</Text>
                                <Text style={styles.productAdditionalInfo}>{product.product_additional_info}</Text>
                            </View>

                        </TouchableOpacity>
                    ))
                }
            </ScrollView>

        </View>
    )
}
export default Home;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DDD',
    },
    cartIconContainer: {
        marginBottom: 10,
        position: 'relative'
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        marginTop: 30,
        marginLeft: 15,
        marginBottom: 10
    },
    slide_img: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    imageBackground: {
        height: 150,
        width: '60%',
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 30
    },
    slide: {
        height: 200,
        width: '90%',
        marginHorizontal: '5%',
        backgroundColor: 'white',
        borderRadius: 30,
        marginVertical: 20
    },
    button_slide: {
        height: 50,
        width: 120,
        backgroundColor: 'black',
        borderRadius: 15,
        marginHorizontal: 10,
        marginTop: 50,
    },
    text_slide: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold',
    },
    title1: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20
    },
    contentContainer: {
        height: 400,
        marginTop: 15,
    },
    productFrame: {
        width: 250,
        height: 400,
        marginHorizontal: 10,
        borderRadius: 16,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    productImage: {
        width: '90%',
        height: 200,
        borderRadius: 16,
        marginHorizontal: '5%',
        marginTop: '5%'
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 18,

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

    },


})