//새로 만들어진 민원들을 보여주는 페이지 입니다.
import {SafeAreaView ,Text, View, ScrollView, StyleSheet, TouchableOpacity, Button} from 'react-native'
//import { database } from './firebase'; 
//import { ref, child, onChildAdded } from 'firebase/database';

import React, {useState} from 'react';

import Min1Button from "./Min1Button";


export const Mainscreen = (props) => {
    return(
        <SafeAreaView style={styles.container}>
            <View></View>
               <ScrollView> 


            <View>
                <Text style={styles.Text1}> New Min1</Text>
            </View> 
                    <View>
                        <TouchableOpacity onPress={() => props.navigation.navigte("Min1")}>
                        <Min1Button/>
                      </TouchableOpacity>
                   </View>
                   <View>
                        <TouchableOpacity onPress={() => props.navigation.navigte("Min1")}>
                        <Min1Button/>
                      </TouchableOpacity>
                   </View>
                   <View>
                        <TouchableOpacity onPress={() => props.navigation.navigte("Min1")}>
                        <Min1Button/>
                      </TouchableOpacity>
                   </View>
                   <View>
                        <TouchableOpacity onPress={() => props.navigation.navigte("Min1")}>
                        <Min1Button/>
                      </TouchableOpacity>
                   </View>

                   <View>
                        <TouchableOpacity onPress={() => props.navigation.navigte("Min1")}>
                        <Min1Button/>
                      </TouchableOpacity>
                   </View>



             </ScrollView>
        </SafeAreaView>
    );
};




const styles = StyleSheet.create({
    container: {
        flex:1,
        width:"100%",
        height:"100%",
        backgroundColor:"white",

    },
    min1container:{},

    Text1:{
        fontSize: 25,
        fontWeight:"bold",
        marginTop: 2,
        marginBottom:20,
    }


});
