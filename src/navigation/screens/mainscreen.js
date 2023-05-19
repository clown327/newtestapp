//민원들이 보이는 메인 화면 입니다. Tab

import React from "react";
import { StyleSheet, Text, View,TouchableOpacity, FlatList, Button } from 'react-native';
import CNavigation from "../CNavigation";
import { NavigationContainer } from "@react-navigation/native";


export default function Mainscreen(navigation) {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <FlatList style={styles.textContainer}>
                <TouchableOpacity style={styles.textContainer} onPress={() => props.navigation.navigate("min1")}>
                    <Text style={styles.textStyle}>
                        이곳은 텍스트를 테스트하는 텍스트 영역입니다.
                    </Text>
                </TouchableOpacity>
            </FlatList>
        </View>
    );
}


const styles = StyleSheet.create ({
    textContainer:{ 
        height: 100,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,

    },
  min1box: {
        height: 100,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
    },
    container:{
        flex: 1,
        backgroundColor: "#fff",
    },
}); 