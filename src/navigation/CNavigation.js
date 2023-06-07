// import { View } from "react-native";
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
import { Help } from "../contents/Help";

import Icon from 'react-native-vector-icons/MaterialIcons';//아이콘
import { Sharescreen } from "../contents/Sharescreen";
import { View, Text,TouchableOpacity } from "react-native";
import { buttonGreen, darkCello, darkGreen, deco, powderGreen, shadowGreen } from "../../color";
import { useContext } from "react";
import { Context } from "../../Context";






const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const navigationRef = createNavigationContainerRef();
//const TTab = createMaterialTopTabNavigator();


const adminName={
  "0":"지상작전사령부",
  "1":"수도군단",
  "2":"51사단",
  "3":"167여단",
  "4":"168여단",
  "5":"168여단 2대대" //169->68-2로 바뀜 
}
const regions={
  "0":"관할지역 없음",
  "1":"안양시",
  "2":"화성시",
  "3":"안산시",
  "4":"화성시",
  "5":"화성시"
 }
//TopTabs
const TopTabs = () => {
 const [adminCode,setAdminCode]=useContext(Context);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:"white"}}>
      <View style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center",paddingHorizontal:20,marginTop:10}}>
        
        <View style={{flexDirection:"row",alignItems:"center"}}>
          <Text style={{fontSize:30, fontFamily:"armyBold", marginLeft:15,color:darkCello}}>{`ARA`}</Text>
          <Text style={{fontSize:17,fontFamily:"suiteL",color:darkCello,marginLeft:5}}>{`${adminName[adminCode]} (${regions[adminCode]})`}</Text>
        </View>
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
            tabBarLabelStyle:{fontSize:22, fontFamily:"suiteB"}
          }}
        />
        <Tab.Screen name="Shared"
          component={Shared}
          options={{
            headerShown: false,
            tabBarLabel: "보관함",
            tabBarLabelStyle:{fontSize:22, fontFamily:"suiteB"}
          }}
        />
        <Tab.Screen name="Wanted"
          component={Wanted}
          options={{
            headerShown: false,
            tabBarLabel: "수배",
            tabBarLabelStyle:{fontSize:22, fontFamily:"suiteB"},       
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
        <Stack.Screen name="Notiview" component={Notiview}
        options={{gestureEnabled: true, headerShown: true,headerTitle:"",headerTitleStyle:{fontFamily:"suiteB", fontSize:22}, headerTintColor:"white",headerBackground:()=>(<View style={{flex:1,backgroundColor:darkGreen}}/>)}} />
        <Stack.Screen name="Wantedbut" component={Wantedbut} options={{gestureEnabled: true}} />
        <Stack.Screen name="Wantedview" component={Wantedview} options={{gestureEnabled: true}} />
        <Stack.Screen name="Sharescreen" component={Sharescreen} options={{gestureEnabled: true}} />
        <Stack.Screen name="Daegong" component={Daegong} options={{gestureEnabled: true}} />
        <Stack.Screen name="More" component={More} 
        options={{gestureEnabled: true, headerShown: true, headerTitle:"미접수 신고",headerTitleStyle:{fontFamily:"suiteB", fontSize:22}, headerTintColor:"white",headerBackground:()=>(<View style={{flex:1,backgroundColor:darkGreen}}/>)}} />
        <Stack.Screen name="More2" component={More2} 
        options={{gestureEnabled: true, headerShown: true, headerTitle:"처리 중인 신고",headerTitleStyle:{fontFamily:"suiteB", fontSize:22}, headerTintColor:"white",headerBackground:()=>(<View style={{flex:1,backgroundColor:darkGreen}}/>)}} />
        <Stack.Screen name="Home" component={Home} 
        options={{gestureEnabled: true, headerShown: true,headerTitle:"공지사항",headerTitleStyle:{fontFamily:"suiteB", fontSize:22}, headerTintColor:"white",headerBackground:()=>(<View style={{flex:1,backgroundColor:darkGreen}}/>)}} />
      
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
