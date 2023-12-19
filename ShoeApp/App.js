import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from './component/SplashScreen'
import SplashScreen2 from './component/SplashScreen2';
import Home from './component/Home'
import TabNavi from './TabNavi';
import ProductDetail from './component/ProductDetail';
import Login from './component/Login';
import AllShoes from './component/AllShoes';
import Register from "./component/Register";
import Cart from "./component/Cart";
import Oder from './component/Oder';
import ChatScreen from "./component/ChatScreen";
import ChangePassword from "./component/ChangePassword";
import EditProfile from "./component/EditProfile";
import User from "./component/User";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRoutName={'SplashScreen'}>
          <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown:false}} />
          <Stack.Screen name='SplashScreen2' component={SplashScreen2} options={{headerShown:false}} />
          <Stack.Screen name='TabNavi' component={TabNavi} options={{ headerShown: false, }} />
          <Stack.Screen name='Home' component={Home} options={{title:'trang chu'}}/>
          <Stack.Screen name='ProductDetail' component={ProductDetail} options={{ title: 'Chi Tiết Sản Phẩm' }} />
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false, }} />
          <Stack.Screen name='AllShoes' component={AllShoes} options={{ title: 'Sản phẩm' }} />
          <Stack.Screen name='Register' component={Register} options={{ title: 'Đăng Ký' }} />
          <Stack.Screen name='Cart' component={Cart} options={{ title: 'Giỏ hàng' }} />
          <Stack.Screen name='Oder' component={Oder} options={{ title: 'Đơn mua' }} />
          <Stack.Screen name='ChatScreen' component={ChatScreen} options={{ title: 'Nhóm chat cộng đồng' }} />
          <Stack.Screen name='ChangePassword' component={ChangePassword} options={{ title: 'Đổi Mật Khẩu' }} />
          <Stack.Screen name='EditProfile' component={EditProfile} options={{ title: 'Chỉnh sửa hồ sơ' }} />
          <Stack.Screen name='User' component={User} options={{ title: 'Thông tin người dùng' }} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
