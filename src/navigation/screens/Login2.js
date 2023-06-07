import React, { useContext } from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Context } from "../../../Context";
import logo from "../../../assets/logo.jpg"
import { conColor, mainColor } from "../../../color";
import {army} from '../../../assets/army.png';
import Icon from 'react-native-vector-icons/MaterialIcons';//아이콘
import { SafeAreaView } from "react-native-safe-area-context";

const adminName={
  "0":"지상작전사령부",
  "1":"수도군단",
  "2":"51사단",
  "3":"167여단",
  "4":"168여단",
  "5":"168여단 2대대" //169->68-2로 바뀜 
}
//<Text style={{fontSize:15,marginTop:10}}>{`관리자 계정: ${adminName[adminCode]}`}</Text>
export default function Login2(props) {
    console.disableYellowBox = true;
    const [adminCode,setAdminCode]=useContext(Context);
    return (
      <SafeAreaView style={{width:"100%",height:"100%", backgroundColor:"#fff"}}>
        <View style={{width:"100%",height:"100%", backgroundColor:"#fff"}}>

        <View style={{width:'100%',height:50, alignItems:'flex-end',justifyContent:'center'}}>
          <TouchableOpacity onPress={()=> {props.navigation.navigate("Help")}} style={{width:40, height:40, borderRadius:50, borderWidth:2,alignItems:'center',justifyContent:'center', marginRight:10}}>
            <Icon name="hlep" size={30} color="#000000"/>
          </TouchableOpacity>
        </View>
        <View style={{width:'100%'}}>
          <View style={{alignItems:'center',justifyContent:'center',}}>
            <Text style={{fontSize:30,fontWeight:"bold", margin:30, marginTop:80}}>모두의 육국 민 신고 앱</Text>
            
          </View>
          <View style={{width:'100%',alignItems:'center' }}>
            <Text style={{fontSize:50, fontWeight:"bold", marginTop:30}}>ARA</Text>
            <Text style={{fontSize:30, fontWeight:"bold", marginTop:50}}>Army Report App</Text>
          </View>
              
        </View>
            <View style={{width:'100%',alignItems:'center', marginTop:80 }}>
              <TouchableOpacity onPress={()=>props.navigation.reset({ routes: [{ name: "TopTabs" }] })} style={{width:'90%', height:70, justifyContent:'center',borderWidth:1, borderRadius:25, alignItems:'center'}}>
                <Text style={{fontSize:40, fontWeight:"bold"}}>시작하기</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Image source={army} style={{width:'100%',alignItems:'center',}}/>
            </View>
      </View>
      </SafeAreaView>
      
    );
}

const styles = StyleSheet.create({
 
});