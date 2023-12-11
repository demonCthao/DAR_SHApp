import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"

const Tab = createBottomTabNavigator();
const TabNavi = ({route})=>{
    const {isAuthenticated} = route.params || {isAuthenticated:false}
    return(
        <Tab.Navigator 
        initialRouteName={"Trang Chủ"}
        screenOptions={{headerShown:false}}
        tabBar={{
            keyboardHidesTabBar:true,
            activeTintColor:'Black',
            inactiveTintColor: 'grey',
            labelStyle: { paddingBottom: 10, fontSize: 10 },
        }}
        >
            <Tab.Screen name={"Trang Chủ"} component={Home}>

            </Tab.Screen>
            
        </Tab.Navigator>
    )
}
export default TabNavi;