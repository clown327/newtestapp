import React from "react";
import {CNavigation} from "./src/navigation/CNavigation";
import { StatusBar } from "expo-status-bar"; 
import  {StyleSheet, Text, View,SafeAreaView} from 'react-native';


export default function App()
{
  return (
    <SafeAreaView style={{flex:1}}>
      
      <CNavigation/>
    </SafeAreaView>
  )
}

//const style = StyleSheet.create({});