import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';





export default function Complete(props)
{
  return (
	<View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center' }}>
            <Button style={style.button} title="돌아가기"
            onPress={() => navigation.navigate("Mainscreen")}/> 
    </View>
  );
};