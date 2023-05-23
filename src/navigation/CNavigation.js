//스택 관리 나 네비게이션 총 관리
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNavigationContainerRef } from "@react-navigation/native";
import { Animated, Platform, Dimension, StyleSheet, Text, View,TouchableOpacity, ScrollView, Button } from 'react-native';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import {Managing} from "./screens/Managing";
import {Min1} from "./screens/Min1";
import {Mainscreen} from "./screens/Mainscreen";
import {Settings} from "./screens/Settings";
import {Complete} from "./screens/Complete";
import {Login} from "./screens/Login";
import Login2 from "./screens/Login2";
import { Search } from "./screens/Search";
import { Home } from "./screens/Home";
import { Wanted } from "./screens/Wanted";
import { Shared } from "./screens/Shared";
import { Writenoti } from "../contents/Writenoti";

import { uesRef } from 'react';


import Icon from 'react-native-vector-icons/MaterialIcons';//아이콘



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const navigationRef = createNavigationContainerRef();
//const TTab = createMaterialTopTabNavigator();



//bottom tabs
const BottomTabs = () => {
  

  return (
    <Tab.Navigator tabBarOptions={{
      showLabel: false,
      // Floating Tab Bar...
      style: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 40,
        marginHorizontal: 20,
        // Max Height...
        height: 60,
        borderRadius: 10,
        // Shadow...
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: {
          width: 10,
          height: 10
        },
        paddingHorizontal: 20,
      }
    }}>
        <Tab.Screen name="Home"
          component={Home}
          options={{headerShown: false,
            title: "home",
            tabBarIcon: ({ color, size }) => (<Icon name="home" color={color} size={size} />)
          }} />
        <Tab.Screen name="Mainscreen"
          component={Mainscreen}
          options={{headerShown: false,
            title: "Dashboard",
            tabBarIcon: ({ color, size }) => (<Icon name="dashboard" color={color} size={size} />)
          }} />
          <Tab.Screen name="Shared"
            component={Shared}
            options={{headerShown:false,
              title: "Shared",
              tabBarIcon: ({ color, size }) => (<Icon name="ios-share" color={color} size={size} />)
          }} />        
                 
          <Tab.Screen name="Wanted"
            component={Wanted}
            options={{headerShown:false,
              title: "wanted",
              tabBarIcon: ({ color, size }) => (<Icon name="person-search" color={color} size={size} />)
          }} /> 

          

          {/*<Tab.Screen name="Search"
            component={Search}
            options={{headerShown:false,
              title: "Search",
              tabBarIcon: ({ color, size }) => (<Icon name="search" color={color} size={size} />)
          }} /> */}


        {/*<Tab.Screen name="Settings"
          component={Settings}
          options={{ 
            title: "Settings",
            tabBarIcon: ({ color, size }) => (<Icon name="settings" color={color} size={size} />)
          }} />*/}
      </Tab.Navigator>
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



// 확장용<Tab.Screen name = "main" component={} options={{tabBarLabel:"홈"}}/>

//stacks
export const CNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Login" 
        screenOptions={{ headerShown: false }}>
          
        <Stack.Screen name="Login" component={Login}  />
        <Stack.Screen name="Login2" component={Login2} options={{gestureEnabled: false}}/>

        <Stack.Screen name="BottomTabs" component={BottomTabs} options={{gestureEnabled: true}} />
        

        
        <Stack.Screen name="Min1" component={Min1} options={{ headerShown: false }}/>
        <Stack.Screen name="Managing" component={Managing} options={{ headerShown: true }} />
        <Stack.Screen name="Complete" component={Complete} options={{gestureEnabled: true}} />
        <Stack.Screen name="Writenoti" component={Writenoti} options={{gestureEnabled: true}} />
        
        
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
