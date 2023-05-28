import React, {useContext,useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import {CNavigation} from "./src/navigation/CNavigation";
import {View, Text} from 'react-native';
import CustomisableAlert from "react-native-customisable-alert";
import { Context } from "./Context";
import 'expo-dev-client';

export default function App()
{
  const [cityContext,setCityContext]=useState("");
  
  return (
    <Context.Provider value={[cityContext, setCityContext]}>
      <View style={{ flex: 1 }}>
        <CNavigation />
        <CustomisableAlert />
      </View>
    </Context.Provider>
  );
}

//const style = StyleSheet.create({});