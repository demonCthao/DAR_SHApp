import React, { useState } from 'react';
import { View, TextInput, TouchableHighlight, StyleSheet, Text, Image } from 'react-native';
import firebase from '../config/FirebaseConfig';
import { getDatabase, set, ref, push, remove, onValue } from "firebase/database";
import { SignInMethod, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, getAuth } from 'firebase/auth';

function Register({ navigation }) {
    const [fullname, setfullname] = useState('');
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('');
    const [nhaplai, setnhaplai] = useState('')

    const [checkfullname, setcheckfullname] = useState(true);
    const [checkemail, setcheckemail] = useState(true)
    const [emailExists, setEmailExists] = useState(false);

    const [checkpass, setcheckpass] = useState(true)
    const [checknhaplai, setchecknhaplai] = useState(true);

    const [validateEmail, setvalidateEmail] = useState(true);
    const [ktnhaplai, setktnhaplai] = useState(true);

    const validate = () => {
        const reEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (pass.length == 0 || pass.length < 6 || pass != nhaplai || nhaplai.length == 0 || email.length == 0 || fullname.length == 0 || !reEmail.test(email)) {

            if (fullname.length == 0) {
                setcheckfullname(false)
            } else {
                setcheckfullname(true)
            }

            if (email.length == 0) {
                setcheckemail(false)
                setvalidateEmail(true)
            } else if (!reEmail.test(email)) {
                setvalidateEmail(false);
                setcheckemail(true)
            }
            else {
                setcheckemail(true)
                setvalidateEmail(true)
            }

            if (pass.length == 0) {
                setcheckpass(false)
            } else {
                setcheckpass(true)
            }

            if (nhaplai.length == 0) {
                setchecknhaplai(false)
                setktnhaplai(true)
            } else if (pass != nhaplai) {
                setchecknhaplai(true)
                setktnhaplai(false)
            }
            else {
                setchecknhaplai(true)
                setktnhaplai(true)
            }
            return false
        } else {
            setchecknhaplai(true)
            setcheckfullname(true)
            setcheckpass(true)
            setcheckemail(true)
            setvalidateEmail(true)
            setktnhaplai(true)
            return true
        }
    }

    const Save = () => {
        if (validate() == false) return;
        if (validate() == true) {
            const database = getDatabase(firebase)
            const auth = getAuth(firebase);

            fetchSignInMethodsForEmail(auth, email)
                .then((SignInMethod) => {
                    if (SignInMethod.length > 0) {
                        setEmailExists(true);
                    } else {
                        createUserWithEmailAndPassword(auth, email, pass)
                            .then((userCredential) => {
                                const userId = userCredential.user.uid;
                                console.log('Id của người dùng:', userId);

                                const registrationData = {
                                    fullname,
                                    email,
                                    pass,
                                };
                                set(ref(database, "registration/" + userId), registrationData)
                                    .then(() => {
                                        alert("đăng ký thành công");
                                        setTimeout(() => {
                                            navigation.navigate("Login");
                                        }, 0);
                                    })
                                    .catch((error) => {
                                        console.error("lỗi khi đăng ký:", error);
                                        alert("đăng ký thất bại");
                                    });
                            }).catch((error) => {
                                console.error('Đăng ký thất bại:', error);
                            });
                    }
                })
                .catch((error) => {
                    console.error('Lỗi khi kiểm tra email:', error);
                });
        }
    };
    return (
        <View style={styles.container}>

            <Image source={require('../image/logoapp.png')}
                style={{ margin: 16 }} />

            <Text style={styles.title}>
                Bắt đầu nào
            </Text>
            <Text style={styles.title2}> Tạo một tài khoản mới </Text>
            <TextInput placeholder='full name' style={styles.nhap} onChangeText={(txt) => setfullname(txt)} />
            <Text style={{ alignSelf: 'flex-start', marginLeft: 23, fontSize: 13, color: 'red' }}>{checkfullname ? '' : 'vui lòng nhập tên'}</Text>
            <TextInput placeholder='Your Email' style={styles.nhap} onChangeText={(txt) => setemail(txt)} />
            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginLeft: 23 }}>
                <Text style={{ fontSize: 13, color: 'red' }}>{checkemail ? '' : 'vui lòng nhập email'}</Text>
                <Text style={{ fontSize: 13, color: 'red' }}>{validateEmail ? '' : 'email sai định dạng'}</Text>
                <Text style={{ fontSize: 13, color: 'red' }}>{emailExists ? 'email đã tồn tại' : ''}</Text>
            </View>
            <TextInput secureTextEntry={true} placeholder='Password' style={styles.nhap} onChangeText={(txt) => setpass(txt)} />
            <Text style={{ alignSelf: 'flex-start', marginLeft: 23, fontSize: 13, color: 'red' }}>
                {checkpass ? '' : 'Vui lòng nhập Pass.'}
                {checkpass ?   '' : 'Mật khẩu phải từ 6 kí tự trở lên'}
            </Text>
            <TextInput secureTextEntry={true} placeholder='Password Again' style={styles.nhap} onChangeText={(txt) => setnhaplai(txt)} />
            <View style={{ alignSelf: 'flex-start', marginLeft: 23, flexDirection: 'row' }}>
                <Text style={{ fontSize: 13, color: 'red' }}>{checknhaplai ? '' : 'Vui lòng nhập lại Pass'}</Text>
                <Text style={{ fontSize: 13, color: 'red' }}>{ktnhaplai ? '' : 'Pass nhập lại không giống'}</Text>
            </View>
            <TouchableHighlight 
            activeOpacity={1}
            underlayColor="gray"
            style={styles.buton}
            onPress={Save}
            >
                <Text style={styles.textButon}  >
                    Đăng ký
                </Text>
            </TouchableHighlight>
            <View style={styles.singin}>
                <Text >Đã có tài khoản? </Text>
                <Text style={styles.inputSingin}
                    onPress={() => { navigation.navigate('Login') }}
                >Đăng nhập</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',

    },
    nhap: {
        borderRadius: 5,
        width: '90%',
        height: 48,
        margin: 10,
        borderWidth: 2,
        padding: 8,
        borderColor: '#EBF0FF'
    },
    buton: {
        justifyContent: 'center',
        alignSelf: "center",
        width: '90%',
        height: 52,
        borderRadius: 5,
        backgroundColor: "black",
        margin: 10,
    },
    textButon: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#223263',

    },
    title2: {
        marginBottom: 10,
        marginTop: 7,
        color: '#9098B1',
    },
    singin: {
        marginTop: 7,
        flexDirection: 'row',
    },
    inputSingin: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black'
    }
})
export default Register;