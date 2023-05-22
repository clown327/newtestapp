//접수된 민원을 보여주는 곳입니다.
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';

export const Min1 = (props) => {

    const report = props.route.params.report;
    const images = JSON.parse(report.photo).slice(0, 4).map((uri) => ({ uri }));

    const isCompleted = report.state === '처리완료';
    const isProcessing = report.state === '처리중';
    const isReceived = report.state === '미접수';
    const isDoing = report.state === '접수';

    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>
                <View>
                    <View style={styles.title}>
                        <Text style={styles.titletext}>유형 : {report.type} ({report.state})</Text>
                        <Text></Text>
                    </View>

                    <View style={styles.photocontainer}>
                        <SliderBox images={images} style={styles.photo} />
                    </View>

                    <View style={styles.detail}>
                        <Text>{report.position}</Text>
                        <Text>{report.pnumber}</Text>
                        <Text style={styles.detailtext}>{report.detail}</Text>
                    </View>

                    {isReceived && (
                            <TouchableOpacity style={styles.combutton} onPress={() => {props.navigation.navigate('Complete',{report:report})}}>
                                <Text style={styles.comtext}>접수하기!</Text>
                            </TouchableOpacity>
                            )}

                    {isProcessing && (
                            <TouchableOpacity style={styles.combutton} onPress={() => {props.navigation.navigate('Mainscreen')}}>
                            <Text style={styles.comtext}>처리중입니다!</Text>
                        </TouchableOpacity>
                    )}

                    {isCompleted && (
                            <TouchableOpacity style={styles.combutton} onPress={() => {props.navigation.navigate('Mainscreen')}}>
                            <Text style={styles.comtext}>처리완료되었습니다!</Text>
                        </TouchableOpacity>
                    )}
                    {isDoing && (
                            <TouchableOpacity style={styles.combutton} onPress={() => {props.navigation.navigate('Mainscreen')}}>
                            <Text style={styles.comtext}>접수된 상태입니다!</Text>
                        </TouchableOpacity>                        
                    )}
                </View>
            </SafeAreaView>
        </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex:2,
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



