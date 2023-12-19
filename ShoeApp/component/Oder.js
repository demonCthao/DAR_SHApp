import React, { Children, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getDatabase, ref, onValue, off, remove, push, set, child, orderByKey } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import firebase from '../config/FirebaseConfig';

const Oder = ({ route }) => {
    const [oderProductsList, setOderProductsList] = useState([])
    const auth = getAuth(firebase);
    const database = getDatabase(firebase);
    const { userId } = route.params;

    useEffect(()=>{
        fetchDataList();
    },[])

    const countSelectedProducts = () => {
        return oderProductsList.length;
    };

    const fetchDataList = () => {
        const oderRef = ref(database, `Order/${userId}`);
        onValue(oderRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const dataArray = [];
                Object.keys(data).forEach((key) => {
                    const childData = data[key];
                    const variableArray = [];

                    Object.keys(childData).forEach((variableKey) => {
                        const variableValue = childData[variableKey];

                        variableArray.push({ key: variableKey, value: variableValue });
                    });
                     // Thêm dữ liệu vào mảng
                    dataArray.push({ key, variables: variableArray })
                });
                setOderProductsList(dataArray);
            } else {
                console.log('Không có dữ liệu');
            }
        });
        return () => {
            off(oderRef);
        };
    }
    const sumSelectedProductsPrice = (key) => {
        let sum = 0;

        oderProductsList.forEach((product) => {
            if (key === product.key) {
                product.variables.map((item) => {
                    sum += item.value.price * item.value.quantity;
                })
            }
        });
        return sum;
    };

    const handleRemoveProduct = (productId) => {
        const userId = auth.currentUser.uid;
        const cartRef = ref(database, `Order/${userId}/${productId}`);

        remove(cartRef)
            .then(() => {
                console.log('Đã xóa sản phẩm thành công');
                setOderProductsList((prevItems) => prevItems.filter((item) => item.key !== productId));
                alert('Đã xóa thành công đơn mua !');
            })
            .catch((error) => {
                console.error('Lỗi xóa sản phẩm:', error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title} >ĐƠN MUA</Text>
            <View style={{ width: '100%', backgroundColor: 'black', height: 1 }} />
            <View style={{ margin: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Số Hóa đơn: {countSelectedProducts()}</Text>
            </View>

            <ScrollView style={{ paddingHorizontal: 16 }}>
                {
                    oderProductsList.map((product,index)=>(
                        <View key={product.key} style={styles.productContainer}>
                            <View style={styles.productBox}>
                                <Text style={styles.productName}>Hóa đơn thứ: {index + 1}</Text>
                                {product.variables.map((variable) => (
                                    <View key={variable.key} style={styles.productItemContainer}>

                                        <View style={styles.productBox1}>

                                            <Image source={{ uri: variable.value.search_image }} style={styles.productImage} />
                                            <View style={styles.productInfo}>

                                                <Text style={styles.productName}>{variable.value.brands_filter_facet}</Text>
                                                <Text style={styles.productquantity}>Số lượng: {variable.value.quantity}</Text>
                                                <Text style={styles.productPrice}>{variable.value.price * variable.value.quantity} VNĐ</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                                <View style={{ marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15 }}>Tổng:</Text>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red', marginLeft: 15 }}>
                                        {sumSelectedProductsPrice(product.key)} VNĐ
                                    </Text>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.button1} onPress={() => handleBuyNow(product)}>
                                        <Ionicons name="cart-outline" size={24} color="#ff6" />
                                        <Text style={styles.buttonText1}>Đánh giá</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={() => handleRemoveProduct(product.key)}>
                                        <Ionicons name="trash-outline" size={24} color="#fff" />
                                        <Text style={styles.buttonText}>Xóa</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default Oder;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 40,
        marginLeft: 15,
        marginBottom: 7

    },

    productContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    productItemContainer: {
        flexDirection: 'row',
    },
    productBox: {
        backgroundColor: '#CCC',
        borderRadius: 20,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 8,
        width: '100%',
    },
    productBox1: {
        backgroundColor: 'white',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        margin: 8,
        width: '95%',
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    productInfo: {
        flex: 1,
        marginLeft: 16,
    },
    productName: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
        marginTop: 8,
    },
    productquantity: {
        fontSize: 15,
        marginBottom: 5,
        // color:'blue'
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    editText: {
        position: 'absolute',
        top: 0,
        right: 0,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#f00',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
    },
    button: {
        backgroundColor: '#e81d1d',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    button1: {
        backgroundColor: '#444444',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    buttonText1: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 4,
    },
})