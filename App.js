import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {CNavigation} from "./src/navigation/CNavigation";
import {View, Text} from 'react-native';




export default function App()
{
  return (
    <View style={{flex:1}}>
      <CNavigation/>
    </View>
  );
}

//const style = StyleSheet.create({});