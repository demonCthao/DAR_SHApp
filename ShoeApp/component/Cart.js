import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Animated, ScrollView } from 'react-native';
import firebase from '../config/FirebaseConfig';
import { getAuth } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
// import CheckBox from 'react-native-check-box';
import { CheckBox } from 'react-native-elements';
import { getDatabase, ref, onValue, off, remove, push } from 'firebase/database';


function Cart({route,navigation}){
    const [userData, setUserData] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [shippingAddress, setShippingAddress] = useState('');
    const auth = getAuth(firebase);
    const database = getDatabase(firebase);

    useEffect(()=>{
        fetchShippingAddress();
        fetchdata();
    },[]);

    const fetchdata =() =>{
        const userId = auth.currentUser.uid;
        const cartRef = ref(database,`Cart/${userId}`);
        onValue(cartRef,(snapshot)=>{
            const cartData = snapshot.val();
            if(cartData){
                const products = Object.keys(cartData).map((key)=>({
                    id:key,
                    ...cartData[key],
                    selected:false,
                }));
                setCartProducts(products);
            }else{
                setCartProducts([]);
            }
        });

        const userRef = ref(database,`registrations/${userId}`);
        onValue(userRef,(snapshot)=>{
            const userData = snapshot.val();
            if(userData){
                setUserData(userData);
            }else{
                setUserData(null);
            }
        });

        return()=>{
            off(cartRef);
        };

    };
    const fetchShippingAddress = ()=>{
        const userId = auth.currentUser.uid;
        const userRef = ref(database,`registrations/${userId}`);
         //theo dõi sự thay đổi trong dữ liệu 
        onValue(userRef,(snapshot)=>{
        // Lấy giá trị của dữ liệu từ snapshot = method val
            const userData = snapshot.val()
 
            if(userData){
                const address = userData.address;
                setShippingAddress(address)
            }else{
                setShippingAddress('');
            }
        });
    };

    const handleToggleSwitch =(productId)=>{
        setCartProducts((prevCartProducts)=>{
            const updatedProducts = prevCartProducts.map((product)=>{
                if(product.id === productId){
                    return{...product,selected: !product.selected};
                }
                return product;
            });
            return updatedProducts;
        });
    };

    const handleBuyNowAll =()=>{
        const userId = auth.currentUser.uid;
        const orderRef = ref(database,`Order/${userId}`);
        const selectedProductIds = selectedProducts.map((product)=>product.id);

        selectedProductIds.forEach((productId)=>{
            // Xóa sản phẩm đã chọn thanh toán
            handleRemoveProduct(productId);
        });

        push(orderRef,selectedProducts)
        .then((newRef)=>{
            const orderItemId = newRef.key;
            console.log('Người dùng với id:', userId);
            console.log('Đã thêm sản phẩm vào giỏ hàng:', selectedProducts);
            console.log('ID của sản phẩm trong giỏ hàng:', orderItemId);
            navigation.navigate('Oder', { userId: userId });
        })
        .catch((error)=>{
            console.error('lỗi thêm sản phẩm vào đơn hàng:',error);
        });
    };

    const handleRemoveProduct = (productId)=>{
        const userId = auth.currentUser.uid;
        const cartRef = ref(database,`Cart/${userId}/${productId}`);

        remove(cartRef)
        .then(()=>{
            console.log('Đã xóa sản phẩm thành công');
            fetchdata();
        })
        .catch((error)=>{
            console.error('lỗi xóa sản phẩm',error);
        });

    };

    const startAnimation =()=>{
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim,{
                    toValue:1,
                    duration:500,
                    useNativeDriver:true,
                }),
                Animated.timing(fadeAnim,{
                    toValue:0,
                    duration:500,
                    useNativeDriver:true,
                }),
            ]),
        ).start();
    };

    const sumSelectedProductsPrice =()=>{
        let sum = 0;
        selectedProducts.forEach((product)=>{
            sum += product.price * product.quantity;
        });
        return sum;
    }

    const sumProductsPrice =(product)=>{
        return product.price * product.quantity;
    }

    const countSelectedProducts = () =>{
        return cartProducts.length;
    }

    useEffect(()=>{
          // update sphẩm
        const updatedSelectedProducts = cartProducts.filter((product)=>product.selected);
        setSelectedProducts(updatedSelectedProducts);
    },[cartProducts]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>GIỎ HÀNG</Text>
            <View style={{ width: '100%', backgroundColor: 'black', height: 1 }} />
            <View style={{ margin: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Sản Phẩm Trong Giỏ Hàng: {countSelectedProducts()}</Text>
            </View>
            <ScrollView style={{ padding: 16 }}>
                {cartProducts.map((product) => (
                    <View key={product.id} style={styles.productContainer}>
                        <View style={styles.productBox}>
                            <Image source={{ uri: product.search_image }} style={styles.productImage} />
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>{product.brands_filter_facet}</Text>
                                <Text style={styles.productquantity}>Số lượng: {product.quantity}</Text>
                                <Text style={styles.productPrice}>Giá: {sumProductsPrice(product)} VNĐ</Text>
                                <Animated.Text
                                    style={[styles.editText, { opacity: fadeAnim }]}
                                    onLayout={startAnimation}
                                >
                                    Nhấn vào để chỉnh sửa
                                </Animated.Text>
                                <View style={styles.buttonContainer}>
                                    {/*<TouchableOpacity style={styles.button1} onPress={() => handleBuyNow(product)}>*/}
                                    {/*    <Ionicons name="cart-outline" size={24} color="#ff6" />*/}
                                    {/*    <Text style={styles.buttonText1}>Mua</Text>*/}
                                    {/*</TouchableOpacity>*/}
                                    <TouchableOpacity style={styles.button} onPress={() => handleRemoveProduct(product.id)}>
                                        <Ionicons name="trash-outline" size={20} color="#fff" />
                                        <Text style={styles.buttonText}>Xóa</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        <CheckBox 
                        checked={product.selected}
                        checkedColor='green'
                        style={styles.button1}
                        onPress={()=>handleToggleSwitch(product.id)}
                        />
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={{ width: '100%', backgroundColor: 'black', height: 1 }} />
            <View style={{ margin: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15 }}>Tổng:</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red', marginRight: 15 }}>
                    {sumSelectedProductsPrice()} VNĐ
                </Text>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('EditProfile',{userId: auth.currentUser.uid ,userData})}>
            <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={styles.addressText}>{shippingAddress}</Text>
            </View>
        </TouchableOpacity>

            <TouchableOpacity style={{ backgroundColor: '#666666', margin: 7, padding: 15, borderRadius: 20 }} onPress={handleBuyNowAll}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                        THANH TOÁN
                    </Text>
                    <Image source={require('../image/next.png')} />
                </View>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addressText: {
        marginRight:15,
        fontSize: 14,
        fontWeight: 'normal',
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
    productBox: {
        backgroundColor: 'white',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    productImage: {
        width: 100,
        height: 140,
        borderRadius: 20,
        marginVertical: '2%',
        marginLeft: '2%',
    },
    productInfo: {
        flex: 1,
        marginLeft: 16,
    },
    productName: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
        marginTop: 30,
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
        padding: 8,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',

    },
    button1: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 13,
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
export default Cart;