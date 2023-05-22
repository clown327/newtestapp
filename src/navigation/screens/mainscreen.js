//새로 만들어진 민원들을 보여주는 페이지 입니다. 끝
import {SafeAreaView ,Text, View, ScrollView, StyleSheet, TouchableOpacity, Button, Image, RefreshControl} from 'react-native'

import React, {useEffect, useState} from 'react';

import Min1Button from "./Min1Button";

import { database } from '../../../firebase';
import { ref, child, onChildAdded } from 'firebase/database';
import roka from "../../../assets/rokalogo.png";
import { height } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';


//source = {{uri:JSON.parse(reports[1].photo)[0],}} style = {styles.square} 사진 넣는 법

export const Mainscreen = (props) => {
    const reports = []; //database 안에 있는 reports라는 파일들 가져오기

    const repref = child(ref(database), 'reports');
    onChildAdded(repref, (snapshot) => {
        reports.push(snapshot.val());
    });



    const [refreshing, setRefreshing] = React.useState(false); //리프레쉬 시켜주는거

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);


    const category = (cate) => {			// category 함수를 실행할때 가져온 값을 cate로 사용하겠다!
        if (cate == "전체") {					
          setCateState(state);				// "전체"일 경우 state 그대로 사용하겠다!
        } else {
          setCateState(
            state.filter((d) => {			// "전체"가 아닐 경우 filter 함수를 사용하여 데이터를 걸러내겠다!
              return d.category == cate;	// d(state 데이터 content)의 카테고리와 cate가 일치하면 생존!
            })
          );
        }
      };
      //미접수/접수/처리중/처리완료 

    
    return(
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollView}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
         
        <SafeAreaView>
            <View>
                <Text style={styles.title}>New Min1</Text>
            </View>
            <View style={styles.catbutton}>
                <View style={styles.button1}>
                    <Button  title='미접수'  color={"black"}></Button>
                </View>
                <View style={styles.button2}>
                    <Button  title='접수' color={"black"}></Button>
                </View>
                <View style={styles.button3}>
                    <Button  title='처리중' color={"black"}></Button>
                </View>
                <View style={styles.button4}>
                    <Button  title='처리완료' color={"black"}></Button>
                </View>
            </View>

            {reports.map((report, index) => (
                <TouchableOpacity key={index} onPress={() => {props.navigation.navigate('Min1', {report:report})}}>
                    <View style={styles.item}>
                        <View style={styles.photocontainer}>
                            <Image source={{ uri: JSON.parse(report.photo)[index],}} style={styles.photo} />
                        </View>
                            <View style={styles.textcontainer}>
                                    <View style={styles.typedate}>
                                        <Text style={styles.typetext}>{report.type} ({report.state})</Text>
                                    </View>
                                    <View style={styles.detail}>
                                        <Text style={styles.detailtext}>{report.detail}</Text>
                                    </View>
                            </View>
                    </View>
                </TouchableOpacity>
                ))}
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
    catbutton: {
        width:"100%",
        height:60,
        backgroundColor:"white",
        marginBottom:10,
        flexDirection:"row",
        justifyContent:'center'

    },
    button1:{
        width:"23.8%",
        height:50,
        //backgroundColor:"yellow",
        borderWidth:1,
        borderColor:"gray",
        margin:2.5,
        borderRadius:10,
        marginTop:5,
    },
    button2:{
        width:"23.8%",
        height:50,
        //backgroundColor:"yellow",
        borderWidth:1,
        borderColor:"gray",
        margin:2,
        borderRadius:10,
        marginTop:5,
    },
    button3:{
        width:"23.8%",
        height:50,
        //backgroundColor:"yellow",
        borderWidth:1,
        borderColor:"gray",
        margin:2,
        borderRadius:10,
        marginTop:5,
    },
    button4:{
        width:"23.8%",
        height:50,
       //backgroundColor:"yellow",
        borderWidth:1,
        borderColor:"gray",
        margin:2,
        borderRadius:10,
        marginTop:5,
    },
    item: {
      backgroundColor: 'powderblue',
      width:"95.1%",
      height: 180,
      padding: 10,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
      marginLeft:10,
      marginRight:10,
    },
    photocontainer: {
        width:"42%",
        height:"95%",
       // backgroundColor: "red",
        marginLeft:5,
        borderRadius:10,
    },
    photo: { //여기에 이미지가 들어감
      width: "100%",
      height: "100%",
      borderRadius: 5,
    },
    textcontainer: {
        width:"53%",
        height:"100%",
        //backgroundColor: "blue",
        marginLeft:5,
        marginRight:2,
    },
    typedate:{  
        width:"100%",
        height: "20%",
        //backgroundColor:"yellow",
    },
    detail:{
        width:"100%",
        height:"80%",
        //backgroundColor:"red",
    },
    title:{
        fontSize:27,
        fontWeight:"bold",
        margin:10,
    },
    typetext:{
        fontSize:15,
        marginTop:2,
        fontWeight:"bold",
    },
    detailtext:{
        fontSize:13,
    },
  });
  