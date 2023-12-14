import {
    StyleSheet, Text, View, Image,
    ImageBackground, TextInput, Button,
    TouchableHighlight, TouchableOpacity, Linking, Alert
} from 'react-native'
import React, { useState } from 'react'
import firebase from '../config/FirebaseConfig'
import { getDatabase, set, ref, push, remove, onValue } from "firebase/database";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'


const Login = ({ navigation }) => {
    const [listUser, setlistuser] = useState([])

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const [checkemail, setcheckemail] = useState(true);
    const [validateEmail, setvalidatemail] = useState(true);
    const [checkuser, setcheckuser] = useState(true);

    const [checkpass, setcheckpass] = useState(true);
    const [ktpass, setktpass] = useState(true)

    const validate = () => {
        const reEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (email.length == 0 || !reEmail.test(email) || password.length == 0) {
            if (email.length == 0) {
                setcheckemail(false)
                setvalidatemail(true)
            } else if (!reEmail.test(email)) {
                setvalidatemail(false)
                setcheckemail(true)
            }
            else {
                setvalidatemail(true)
                setcheckemail(true)
            }

            if (password.length == 0) {
                setcheckpass(false)
                setktpass(true)
            } else {
                setcheckpass(true)
                setktpass(true)
            }
            return false
        } else {
            setcheckpass(true)
            setcheckemail(true)

            setvalidatemail(true)
            setktpass(true)
            return true
        }
    }

    const handleLogin = () => {
        if (validate() == false) return
        if (validate() == true) {
            const database = getDatabase(firebase);
            const auth = getAuth(firebase)
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const userId = userCredential.user.uid;
                    console.log('id người dùng đã đăng nhập:', userId);

                    const usersRef = ref(database, '/registrations/' + userId);

                    onValue(usersRef, (snapshot) => {
                        const usersData = snapshot.val();
                        setlistuser(usersData);
                        console.log('dữ liệu người dùng:', usersData);
                        navigation.navigate('TabNavi', { isAuthenticated: true })
                    });
                })
                .catch((error) => {
                    console.error('lỗi đăng nhập:', error);
                    Alert.alert('thông báo', 'sai email hoặc mật khẩu');
                });
            // const correctEmail = "admin@gmail.com";
            // const correctPassword = "admin";

            // if (email === listUser.email && password === listUser.pass) {
            //     navigation.navigate('Home');

            //     setcheckemail(true)
            //     setcheckpass(true)
            //     setvalidateEmail(true)
            //     setktpass(true)
            //     setcheckuser(true)
            // } else {
            //     if (email != listUser.email) {
            //         setcheckuser(false)
            //     } else if (email === listUser.email) {
            //         setcheckuser(true)
            //         setktpass(false)
            //     }

            // }
        }
    } //kết thúc hàm đăng nhập

    const handleForgotPassword = () => {
        const auth = getAuth(firebase);
        if (email != null) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("đã gửi email reset mật khẩu mới ,vui lòng check email")
                })
                .catch((error) => {
                    const errorcode = error.code;
                    const errorMessage = error.message;
                    alert("không tồn tại User");
                });
        } else {
            alert("bạn cần điềm email rồi ấn quên mật khẩu để lấy lại mật khẩu mới");
        }
    }; //kết thúc hàm quên mật khẩu

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.skipButton} onPress={() =>  navigation.navigate('TabNavi') }>
                <Text style={styles.skipButtonText}>bỏ qua</Text>
            </TouchableOpacity>
            <Image source={require('../image/logoapp.png')} />

            <Text style={styles.textWelcome}>
                chào mừng đến với Shops Sneakers
            </Text>

            <Text style={styles.textLogin}>
                Đăng nhập để tiếp tục
            </Text>
            <TextInput style={styles.input}
                placeholder='E-mail address'
                value={email}
                onChangeText={setEmail}
            />
            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginLeft: 23 }}>
                <Text style={{ fontSize: 13, color: 'red' }}>{checkemail ? '' : 'vui lòng nhập email '}</Text>
                <Text style={{ fontSize: 13, color: 'red' }}>{validateEmail ? '' : 'email sai định dạng '}</Text>
                <Text style={{ fontSize: 13, color: 'red' }}>{checkuser ? '' : 'email không đúng '}</Text>
            </View>

            <TextInput style={styles.input}
                placeholder='password'
                secureTextEntry={true}
                value={password}
                onChangeText={setpassword}>

            </TextInput>
            <View style={{ alignSelf: 'flex-start', marginLeft: 23, flexDirection: 'row' }}>
                <Text style={{ fontSize: 13, color: 'red' }}>{checkpass ? '' : 'Vui lòng nhập mật khẩu'}</Text>
                <Text style={{ fontSize: 13, color: 'red' }}>{ktpass ? '' : 'Sai mật khẩu'}</Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.6}
                onPress={handleLogin}>
                <Text style={styles.textButon}>Đăng nhập</Text>
            </TouchableOpacity>
            <View style={styles.or} >
                <View style={styles.line} />
                <Text>OR</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.inputLogin}>

                <Image source={require('../image/google.png')} />
                <Text style={styles.textGG}>Đăng nhập bằng Google</Text>
            </View>
            <View style={styles.inputLogin}>

                <Image source={require('../image/facebook.png')} />
                <Text style={styles.textFB}>Đăng nhập bằng Facebook</Text>
            </View>

            <Text style={styles.forget} onPress={handleForgotPassword}>quên mật khẩu</Text>

            <View style={styles.singin}>
                <Text>bạn là người mới ?</Text>
                <Text style={styles.inputSingin} onPress={()=>{navigation.navigate('Register')}}> đăng ký</Text>
            </View>
        </View>
    )
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    skipButtonText: {
        color: '#07090c',
        fontWeight: 'bold',
        fontSize: 16,
    },
    skipButton: {
        marginTop: 50,
        position: 'absolute',
        top: 10,
        right: 10
    },
    textWelcome: {
        fontSizeL: 18,
        textAlign: 'center',
        marginTop: 16,
        fontWeight: 'bold',
        width: 159,
        color: '#223263'
    },
    textLogin: {
        textAlign: 'center',
        marginTop: 8,
        color: '#223263',
        fontSize: 15,
    },
    input: {
        borderRadius: 5,
        width: '90%',
        height: 40,
        margin: 10,
        borderWidth: 2,
        padding: 8,
        borderColor: '#EBF0FF',
    },
    button: {
        justifyContent: 'center',
        alignSelf: "center",
        width: '90%',
        backgroundColor: "black",
        margin: 10,
        height: 52,
        borderRadius: 5,
    },
    textButon: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: "bold",
        textAlign: 'center'
    },
    or:{
        alignItems:'center',
        flexDirection:'row',
    },
    inputLogin:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        borderRadius:5,
        borderColor:'#EBF0FF',
        borderWidth:2,
        height:48,
        margin:8,
        width:'90%'
    },
    line:{
        width:'40%',
        height:0,
        borderBottomWidth:1,
        borderBottomColor:'#9098B1'
    },
    textGG: {

        marginLeft: 50,
        marginRight: 50,
        fontWeight: 'bold',
        fontSize: 15,
        color: '#9098B1'
    },
    textFB: {
        marginLeft: 45,
        marginRight: 40,
        fontWeight: 'bold',
        fontSize: 15,
        color: '#9098B1'
    },
    forget: {
        marginTop: 7,
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black'
    },
    singin:{
        marginTop:7,
        flexDirection:'row'
    },
    inputSingin:{
        fontWeight:'bold',
        fontSize:14,
        color:'black'
    }
})