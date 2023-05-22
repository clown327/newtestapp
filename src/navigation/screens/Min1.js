//접수된 민원을 보여주는 곳입니다.
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { database } from '../../../firebase';
import { ref, child, onChildAdded } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

export const Min1 = (props) => {

    const report = props.route.params.report;
    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>
                <View>
                    <View style={styles.title}>
                    <Text style={styles.titletext}>유형 : {report.type} ({report.state})</Text>
                    <Text></Text>
                    </View>

                    <View style={styles.photocontainer}>
                    <SliderBox images={JSON.parse(report.photo).slice(0, 4).map((uri) => ({ uri }))} style={styles.photo} />
                    </View>

                    <View style={styles.detail}>
                        <Text>{report.position}</Text>
                        <Text>{report.pnumber}</Text>
                        <Text style={styles.detailtext}>{report.detail}</Text>
                    </View>

                    <TouchableOpacity style={styles.combutton} onPress={() => {props.navigation.navigate('Complete',{report:report})}}>
                    <Text style={styles.comtext}>접수하기!</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: {
        flex:1,
        width:"100%",
        height:"100%",
        backgroundColor:"white",
    },
    title: {
        width:"100%",
        height:60,
        marginTop:5,
        //backgroundColor:"red",
    },
    titletext: {
        fontSize:25,
        fontWeight:"bold",
    },
    photocontainer: {
        width:370,
        height:370,
        marginTop:-10,
        margin: 10,
        borderRadius:10,
        backgroundColor:"white",
        flex:1,
    },
    photo: {
        width:370,
        height:370,
        borderRadius:10,

<<<<<<< HEAD:src/navigation/screens/min1.js
    },
    detail:{
        width:"95%",
        //backgroundColor:"yellow",
        margin:10,
    },
    detailtext: {
        fontSize:17,
        marginTop:4,
    },
    combutton:{
        width:"95.5%",
        height:65,
        backgroundColor:"#1E90FF",
        margin:10,
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",

    },
    comtext:{
        fontSize:25,
        fontWeight:"bold",
        color:"white",

    },
});
=======
});
>>>>>>> 9e511bc1421ac79e1bac6fc52d49317c379d2e2f:src/navigation/screens/Min1.js
