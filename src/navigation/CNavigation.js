//스택 관리 나 네비게이션 총 관리
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNavigationContainerRef } from "@react-navigation/native";
//import { Animated, Platform, Dimension, StyleSheet, Text, View,TouchableOpacity, ScrollView, Button } from 'react-native';
import 'react-native-gesture-handler';
//import { StatusBar } from 'expo-status-bar';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

import {Managing} from "./screens/Managing";
import {Min1} from "./screens/Min1";
import {Mainscreen} from "./screens/Mainscreen";
import {Settings} from "./screens/Settings";
import {Complete} from "./screens/Complete";
import {Login} from "./screens/Login";
import Login2 from "./screens/Login2";
//import { Search } from "./screens/Search";
import { Home } from "./screens/Home";
import { Wanted } from "./screens/Wanted";
import { Shared } from "./screens/Shared";
import { Writenoti } from "../contents/Writenoti";
import { Comment } from "../contents/Comment";
import { Notiview } from "../contents/Notiview";
//import { uesRef } from 'react';
import { Wantedbut } from "../contents/Wantedbut";
import { Wantedview } from "../contents/Wantedview";
import { Daegong } from "../contents/Daegong";
import { More2 } from "../contents/More2";
import { More } from "../contents/More";

import Icon from 'react-native-vector-icons/MaterialIcons';//아이콘
import { Sharescreen } from "../contents/Sharescreen";
import { View, Text,TouchableOpacity } from "react-native";
import { darkCello, darkGreen, deco, shadowGreen } from "../../color";






const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const navigationRef = createNavigationContainerRef();
//const TTab = createMaterialTopTabNavigator();



//TopTabs
const TopTabs = () => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:shadowGreen}}>
      <View style={{flexDirection:"row", justifyContent:"space-between",paddingHorizontal:20,marginTop:10}}>
        <Text style={{fontSize:30, fontFamily:"armyBold", marginLeft:15,color:darkCello}}>ARA</Text>
        <View style={{flexDirection:"row"}}>
          {/* <TouchableOpacity style={{marginRight:10}}>
            <Icon name="notifications" size={30} color="#000000"/>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={()=> navigate('Home')}>
            <Icon name="edit" size={30} color="#000000"/>
        </TouchableOpacity>
        </View>
      </View>
      
      <Tab.Navigator //아놔 왜 안됨 ㅡㅡ
      initialRouteName="Mainscreen"
      tabBarOptions={{
        style: {
          borderTopwidth:2,
          borderTopColor: "#ccc",
          height: 50,
          backgroundColor:darkGreen
        },
        labelStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        activeTintColor: deco,
        inactiveTintColor: "white",
        labelPosition: "below-icon",
        showLabel: true,
        showIcon: true,
        indicatorStyle: {
          backgroundColor: deco,
        },

        tabStyle: {
          paddingHorizontal: 0, // 탭바들 사이의 간격을 10으로 설정
          // backgroundColor:darkGreen
        },
      }}
      >      
      
        <Tab.Screen name="Mainscreen"
          component={Mainscreen}
          options={{
            headerShown: false,
            tabBarLabel: "신고 접수",
            tabBarLabelStyle:{fontSize:22, fontFamily:"suiteL"}
          }}
        />
        <Tab.Screen name="Shared"
          component={Shared}
          options={{
            headerShown: false,
            tabBarLabel: "보관함",
            tabBarLabelStyle:{fontSize:22, fontFamily:"suiteL"}
          }}
        />
        <Tab.Screen name="Wanted"
          component={Wanted}
          options={{
            headerShown: false,
            tabBarLabel: "수배",
            tabBarLabelStyle:{fontSize:22, fontFamily:"suiteL"},       
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};




//stacks
export const CNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Login" 
        screenOptions={{ headerShown: false }}>
          
        <Stack.Screen name="Login" component={Login}  />
        <Stack.Screen name="Login2" component={Login2} options={{gestureEnabled: false}}/>

        <Stack.Screen name="TopTabs" component={TopTabs} options={{gestureEnabled: true}} />
      
        <Stack.Screen name="Min1" component={Min1} options={{ headerShown: false }}/>
        <Stack.Screen name="Managing" component={Managing} options={{ headerShown: true }} />
        <Stack.Screen name="Complete" component={Complete} options={{gestureEnabled: false}} />
        <Stack.Screen name="Writenoti" component={Writenoti} options={{gestureEnabled: true}} />
        <Stack.Screen name="Comment" component={Comment} options={{gestureEnabled: true}} />
        <Stack.Screen name="Notiview" component={Notiview} options={{gestureEnabled: true}} />
        <Stack.Screen name="Wantedbut" component={Wantedbut} options={{gestureEnabled: true}} />
        <Stack.Screen name="Wantedview" component={Wantedview} options={{gestureEnabled: true}} />
        <Stack.Screen name="Sharescreen" component={Sharescreen} options={{gestureEnabled: true}} />
        <Stack.Screen name="Daegong" component={Daegong} options={{gestureEnabled: true}} />
        <Stack.Screen name="More" component={More} options={{gestureEnabled: true, headerShown: true}} />
        <Stack.Screen name="More2" component={More2} options={{gestureEnabled: true, headerShown: true}} />
        <Stack.Screen name="Home" component={Home} options={{gestureEnabled: true, headerShown: true}} />
      
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
