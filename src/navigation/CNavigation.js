//스택 관리 나 네비게이션 총 관리
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNavigationContainerRef } from "@react-navigation/native";
import { StyleSheet, Text, View,TouchableOpacity, ScrollView, Button } from 'react-native';
//import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {Managing} from "./screens/Managing";
import {Min1} from "./screens/Min1";
import {Mainscreen} from "./screens/Mainscreen";
import {Settings} from "./screens/Settings";
import {Complete} from "./screens/Complete";
import {Login} from "./screens/Login";
import Login2 from "./screens/Login2";
import { Home } from "./screens/Home";
///import { Received } from "./screens/received";
//import { Processed } from "./screens/processed";


import Icon from 'react-native-vector-icons/MaterialIcons';
//아이콘

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const navigationRef = createNavigationContainerRef();
//const TTab = createMaterialTopTabNavigator();

//bottom tabs
const BottomTabs = () => {
  return (
<<<<<<< HEAD
=======
    //<NavigationContainer>
>>>>>>> 57cfa764bd114b255e753ab025595a09256f9d26
      <Tab.Navigator>
        <Tab.Screen name="Mainscreen"
          component={Mainscreen}
          options={{headerShown: false,
            title: "Dashboard",
            tabBarIcon: ({ color, size }) => (<Icon name="dashboard" color={color} size={size} />)
          }} />
        <Tab.Screen name="Settings"
          component={Settings}
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (<Icon name="settings" color={color} size={size} />)
          }} />
      </Tab.Navigator>
<<<<<<< HEAD
  );
};//김재진 상병님 최고

//상단 탭 기능
/*
function TopTabs () {
  return(
    <TTab.Navigator>
      <TTab.Screen name="Received" component={Received} options={{}} />
      <TTab.Screen name="Processed" component={Processed} options={{}} />
    </TTab.Navigator>
  );
};
*/
=======
    //</NavigationContainer>
  );
};
//김재진 상병님 렛츠고
//<NavigationContainer>은 파일에서 한번만 작성 되어야함
>>>>>>> 57cfa764bd114b255e753ab025595a09256f9d26



// 확장용<Tab.Screen name = "main" component={} options={{tabBarLabel:"홈"}}/>

//stacks
export const CNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Login" 
        screenOptions={{ headerShown: false }}>
          
        <Stack.Screen name="Login" component={Login} options={{gestureEnabled: false}} />
        <Stack.Screen name="Login2" component={Login2} options={{gestureEnabled: false}}/>
        
        <Stack.Screen name="BottomTabs" component={BottomTabs} options={{gestureEnabled: false}} />
        

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Min1" component={Min1} options={{ headerShown: true }}/>
        <Stack.Screen name="Managing" component={Managing} options={{ headerShown: true }} />
        <Stack.Screen name="Complete" component={Complete} options={{gestureEnabled: false}} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

/*
<Stack.Screen name="mainscreen" component={mainscreen} />
        <Stack.Screen name="settings" component={settings} />*/

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};
