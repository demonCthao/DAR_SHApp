import { StyleSheet, Text, View,Image,TouchableHighlight } from 'react-native'
import { useEffect, useRef } from 'react'
import Swiper from 'react-native-swiper';
const SplashScreen2 = ((props) => {
    const swiperRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (swiperRef.current && swiperRef.current.scrollBy) {
                swiperRef.current.scrollBy(1);
            }
        }, 2000);
        return () => { clearInterval(interval) };
    }, []);
    return (
        <View style={styles.container}>
            <View style={{ height: 300 }}>
                <Swiper
                    ref={swiperRef}
                    autoplay={false}
                    showsPagination={true}
                    dotStyle={styles.paginationDot}
                    activeDotStyle={styles.paginationActiveDot}
                >

                 <View style={styles.slide}>   
                    <Image source={require('../image/logo.png')} style={styles.imageBackground}>
                    </Image>
                  </View>

                <View style={styles.slide}>   
                <Image source={require('../image/logo1.png')} style={styles.imageBackground}>
                    </Image>
                </View>
                <View style={styles.slide}>   
                <Image source={require('../image/logo2.png')} style={styles.imageBackground}>
                    </Image>
                </View>


            </Swiper>
        </View>
            
            <Text style={{ color: '#038C7F', fontSize: 20, fontWeight: 'bold', marginTop: 26 }}>Vượt Mọi Thử Thách</Text>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Sneaker Của Bạn !</Text>
            <Text style={{ color: 'white', width: 300, textAlign: 'center', marginTop: 16 }}>Hãy mang những ước mơ của bạn lên đôi chân
                để dẫn lối giấc mơ đó thành hiện thực </Text>


            <TouchableHighlight activeOpacity={0.6} style={styles.buton} onPress={()=>  props.navigation.navigate('TabNavi')}>
                <Text style={styles.textButon}>
                    KHÁM PHÁ NGAY
                </Text>
            </TouchableHighlight>

        </View>
    )

});
export default SplashScreen2;
const styles = StyleSheet.create({
    slide: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageBackground: {
        width: 200,
        height: 200
    },
    paginationDot: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 3,
    },
    paginationActiveDot: {
        backgroundColor: '#038C7F',
        width: 16,
        height: 8,
        borderRadius: 4,
        margin: 3,
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buton: {
        marginTop: 22,
        justifyContent: 'center',
        alignSelf: "center",
        width: '60%',
        height: 52,
        borderRadius: 45,
        backgroundColor: "#038C7F",
        margin: 10,
    },
    textButon: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    text: {
        color: 'white',
        fontSize: 22,
        padding: 8
    }
});