//설정 관련한 화면 입니다. tab
import React from "react";
import { StyleSheet, Text, View,TouchableOpacity, ScrollView, Button } from 'react-native';
//import { StyleSheet, Text, View } from 'react-native';
import { mainscreen } from "./Mainscreen";


export const Settings = (props) =>{
  return (
    <View style={{
       flex: 1, 
       justifyContent: 'center',
       alignItems: 'center' }}>
      <Text>설정 화면 입니다.</Text>
      <Button 
      title="새 민원 확인" 
      onPress={() => navigation.navigate("mainscreen")} />
    </View>
  );
}
