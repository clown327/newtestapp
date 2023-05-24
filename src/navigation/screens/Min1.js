//접수된 민원을 보여주는 곳입니다.
//민원의 상태 변경이 안됨;;
import React from 'react';
import { ScrollView, Text, View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { database } from '../../../firebase';
import {ref, update,child} from "firebase/database";


export const Min1 = (props) => {

    const report = props.route.params.report;
    // console.log(report) //mainscreen에서 주는 reports의 배열 값
    const images = JSON.parse(report.photo).slice(0, 4).map((uri) => ({ uri }));

    const isCompleted = report.state === '처리완료';
    const isProcessing = report.state === '처리중';
    const isReceived = report.state === '미접수';
    // const isDoing = report.state === '접수';

    const updateReportState = async (report, newState) => {
        const dbRef = ref(database);
        const reportsRef = child(dbRef, `reports/${report.uid}`);
        await update(reportsRef, { state: newState });
        //지금 가지고 있는 오브젝트도 locally update; 위험한 practice이지만 일단 그냥 해버리기

        // report.state=newState;
        // 필요가 없구만
      };

    const handleReceive1 = async (report,nextState) => {
    await updateReportState(report, nextState);
    // console.log("okay");
    // props.navigation.navigate()
    props.navigation.navigate('Complete');
    };
    

    const handleReceive2 = async (report,nextState) => {
        await updateReportState(report, nextState);
        props.navigation.navigate('Comment',{report:report});
        };

        const handleReceive3 = async (report,nextState) => {
            await updateReportState(report, nextState);
            // console.log("okay");
            // props.navigation.navigate()
            props.navigation.navigate('Mainscreen');
            };

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
                            <TouchableOpacity style={styles.combutton}  onPress={()=>{handleReceive1(report,"처리중")}}>
                                <Text style={styles.comtext}>접수하기!</Text>
                            </TouchableOpacity>
                            )}

                    {isProcessing && (
                            <TouchableOpacity style={styles.combutton} onPress={() => props.navigation.navigate("Comment",{report:report})}>
                            <Text style={styles.comtext}>처리하기!</Text>
                        </TouchableOpacity>
                    )}

                    {isCompleted && (
                            <TouchableOpacity style={styles.combutton} onPress={() => {handleReceive3(report,"미접수")}}>
                            <Text style={styles.comtext}>처리완료!</Text>
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
        marginLeft:10,
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
        width:"93%",
        //backgroundColor:"yellow",
        marginLeft:14,
        marginBottom:14,

    },
    detailtext: {
        fontSize:17,
        marginTop:4,
    },
    combutton:{
        width:"88%",
        height:65,
        backgroundColor:"#1E90FF",
        marginTop:10,
        
        marginLeft:25,
        marginRight:25,
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



