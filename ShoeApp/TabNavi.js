import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './component/Home'
import Search from './component/Search'
import Cart from "./component/Cart";
import NoCart from "./component/NoCart";
import NoFavourite from "./component/NoFavourite";
import Favourite from "./component/Favourite";
const Tab = createBottomTabNavigator();
const TabNavi = ({ route }) => {
    const { isAuthenticated } = route.params || { isAuthenticated: false }
    return (
        <Tab.Navigator
            initialRouteName={"Trang Chủ"}
            screenOptions={{ headerShown: false }}
            tabBarOptions={{
                keyboardHidesTabBar: true,
                activeTintColor: 'Black',
                inactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 10, fontSize: 10 },
            }}
        >
            <Tab.Screen name={"Trang Chủ"} component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name='home' color={color} size={size} />
                }}
            >
            </Tab.Screen>

            <Tab.Screen name={"tìm kiếm"} component={Search}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />
                }}
            >

            </Tab.Screen>
            {isAuthenticated ?(
                <Tab.Screen 
                    name="yêu thích"
                    component={Favourite}
                    options={{
                        tabBarIcon: ({ color, size }) => <Ionicons name='heart' color={color} size={size} />
                    }}
                />
            ) :(
                <Tab.Screen
                name="yêu thích"
                component={NoFavourite}
                options={{
                    tabBarLabel:"Favourite",
                    tabBarIcon:({color,size}) =><Ionicons name="heart" color={color} size={size} />
                }}
                />
            )

            }

            {isAuthenticated ? (
                <Tab.Screen
                    name='giỏ hàng'
                    component={Cart}
                    options={{
                        tabBarIcon: ({ color, size }) => <Ionicons name="cart" color={color} size={size} />
                    }}

                >

                </Tab.Screen>
            ) : (
                <Tab.Screen
                    name='giỏ hàng'
                    component={NoCart}
                    options={{
                        tabBarLabel: 'Cart',
                        tabBarIcon: ({ color, size }) => <Ionicons name='cart' color={color} size={size} />

                    }}>

                </Tab.Screen>
            )}

        </Tab.Navigator>
    )
}
export default TabNavi;