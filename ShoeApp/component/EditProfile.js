import React, {  useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { getDatabase, ref, update, set } from 'firebase/database';
import firebase from '../config/FirebaseConfig';

const EditProfile = ({ route, navigation }) => {
    const { userData } = route.params;
    const [name, setName] = useState(userData.fullname);
    const [address, setAddress] = useState(userData.address);
    const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber)

    const validatePhoneNumber = (number) => {

        const pattern = /^\d{10}$/;// Số điện thoại gồm 10 chữ số
        return pattern.test(number);
    };

    const saveProfile = () => {
        if (!name) {
            Alert.alert('lỗi', 'vui lòng nhập tên');
            return;
        }
        if (!address) {
            Alert.alert('Lỗi', 'Vui lòng nhập địa chỉ');
            return;
        }

        if (!phoneNumber) {
            Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại');
            return;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            Alert.alert('Lỗi', 'Số điện thoại không hợp lệ');
            return;
        }

        const database = getDatabase(firebase);
        const userId = route.params.userId;

        const userRef = ref(database, `registration/${userId}`)
        set(userRef, {
            fullname: name,
            address: address,
            phoneNumber: phoneNumber,
        })
            .then(() => {
                console.log('Thông tin hồ sơ đã được cập nhật thành công');
                navigation.navigate('TabNavi', { isAuthenticated: true });
            })
            .catch((error) => {
                console.log('Lỗi khi cập nhật thông tin hồ sơ:', error);
            });
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Tên"
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <TextInput
                style={styles.input}
                placeholder='địa chỉ'
                value={address}
                onChangeText={(text) => setAddress(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={saveProfile}>
                <Text style={styles.buttonText}>Lưu</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    input: {
        marginBottom: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
export default EditProfile;