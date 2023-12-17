import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './component/Home'
import Search from './component/Search'

const Tab = createBottomTabNavigator();
const TabNavi = ({route})=>{
    const {isAuthenticated} = route.params || {isAuthenticated:false}
    return(
        <Tab.Navigator 
        initialRouteName={"Trang Chủ"}
        screenOptions={{headerShown:false}}
        tabBarOptions={{
            keyboardHidesTabBar:true,
            activeTintColor:'Black',
            inactiveTintColor: 'grey',
            labelStyle: { paddingBottom: 10, fontSize: 10 },
        }}
        >
            <Tab.Screen name={"Trang Chủ"} component={Home}
            options={{
                tabBarIcon:({color,size})=> <Ionicons name='home' color={color} size={size}/>
            }}
            >
            </Tab.Screen>
         
            <Tab.Screen name={"tìm kiếm"} component={Search}
            options={{
                tabBarIcon:({color ,size}) => <Ionicons name="search" color={color} size={size} />
            }}
            >

            </Tab.Screen>
            
        </Tab.Navigator>
    )
}
export default TabNavi;