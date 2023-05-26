//새로 만들어진 민원들을 보여주는 페이지 입니다. 끝
import {SafeAreaView ,Text, View, ScrollView, StyleSheet, TouchableOpacity, Button, Image, RefreshControl} from 'react-native'
import React, { useContext, useEffect, useState} from 'react';
import { database } from '../../../firebase';
import { ref, child, onChildAdded, onChildChanged } from 'firebase/database';
import { Animated } from 'react-native'
import { conColor, mainColor } from '../../../color';
import logo from "../../../assets/logo.png";




//source = {{uri:JSON.parse(reports[1].photo)[0],}} style = {styles.square} 사진 넣는 법
const reports = []; //database 안에 있는 reports라는 파일들 가져오기

const repref = child(ref(database), 'reports');

export const Mainscreen = (props) => {
    
    useEffect(()=>{
        const unsubscribe=onChildAdded(repref, (snapshot) => {
            reports.unshift(snapshot.val());
            onRefresh();
        });

        const unsubscribe2=onChildChanged(repref, (snapshot) => {
            reports.splice(reports.findIndex((element) => element.uid === snapshot.val().uid),1,snapshot.val());
            onRefresh();
        });
        
        return(
            ()=>{unsubscribe();unsubscribe2();}
        )
    },[])
    



    const [refreshing, setRefreshing] = React.useState(false); //리프레쉬 시켜주는거

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 700);
    }, []);

    // const [cateState, setCateState] = useState(reports); // 초기값은 전체 데이터
    const [selectedCategory, setSelectedCategory] = useState("미접수"); // 선택된 카테고리 초기값은 "전체"


    // const category = (cate) => {
    // if (cate == '전체') {
    //     setCateState(reports);
    //     setSelectedCategory('전체');
    // } else {
    //     setCateState(
    //     reports.filter((d) => {
    //         return d.state == cate;
    //     })
    //     );
    //     setSelectedCategory(cate);
    // }
    // };
    const activeButtonStyle = {
        width:"20%",
        height:37,
        color:mainColor,
        margin: 3,
        marginLeft: 7,
        marginRight: 7,
        borderBottomWidth:2.5,
        borderBottomColor:mainColor,
        marginTop: 29.5,
        alignItems: 'center',
        justifyContent: 'center',
        
    };
    
    const inactiveButtonStyle = {
        width: '20%',
        height: 37,
        borderBottomWidth:2.5,
        borderBottomColor:conColor,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 29.5,
        alignItems: 'center',
        justifyContent: 'center',
        opacity:0.4,
        };
      //미접수/접수/처리중/처리완료 

    
    return(
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollView}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
         
        <View style={styles.container2}>

            <View style={styles.topcontainer}>
                <View style={styles.titlecontainer}>
                    <Text style={{fontSize:27,fontWeight:"900",color:mainColor,margin:10, marginLeft:15,}}>신고 목록</Text>
                    <Image source={logo} style={{width:60, height:55, marginLeft:150,}}/>
                </View>    
                 <View style={{}}>
                    <View style={styles.catbutton}>
                        <TouchableOpacity style={selectedCategory == '미접수'? activeButtonStyle : inactiveButtonStyle}
                                        onPress={() => {setSelectedCategory("미접수")}}>
                                            <Text style={{fontSize:17,fontWeight:"700",color:mainColor,}}>미접수</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={selectedCategory == '처리중'? activeButtonStyle: inactiveButtonStyle}
                                        onPress={() => {setSelectedCategory("처리중")}}>
                                            <Text style={{fontSize:17,fontWeight:"700",color:mainColor,}}>처리중</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={selectedCategory == '처리완료'? activeButtonStyle: inactiveButtonStyle}
                                        onPress={() => {setSelectedCategory("처리완료")}}>
                                            <Text style={{fontSize:17,fontWeight:"700",color:mainColor,}}>처리완료</Text>
                        </TouchableOpacity>
                    </View>    
                </View>


            </View>


            <View style={styles.botcontainer}>
                {reports.filter(rep=>rep.state===selectedCategory).map((report, index) => (
                    <TouchableOpacity key={index} onPress={() => {props.navigation.navigate('Min1', {report:report})}}>
                        <View style={styles.item}>
                        <View style={styles.photocontainer}>
                            <Image source={{ uri: JSON.parse(report.photo)[0],}} style={styles.photo} />
                        </View>
                        <View style={styles.textcontainer}>
                            <View style={styles.typedate}>
                            <Text style={styles.typetext}>{report.type}({report.state})</Text>
                            </View>
                            <View style={styles.detail}>
                            <Text style={styles.detailtext}>{report.detail}</Text>
                            </View>
                        </View>
                        </View>
                    </TouchableOpacity>
                    ))}



            </View>
        </View>
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
    titlecontainer:{
        flexDirection:"row",
    },
        topcontainer:{
        width:"100%",
        padding:10,
        height:150,
        justifyContent:"center",
        //backgroundColor:"powderblue",
        
        borderBottomWidth:2.5,
        borderBottomColor:conColor,
    },
    botcontainer:{
        width:"100%",
        height:"88%",
        padding:10,
        //backgroundColor:"powderblue",
        alignItems:"center",
        //justifyContent:"center",
    },
    container2:{
        marginTop:40,
      },
      container3:{
        justifyContent:"center",
        alignItems:"center",
      },
    catbutton: {
        width:"100%",
        height:"100%",
        height:40,
        flexDirection:"row",
        justifyContent:'center',
    },
    item: {
      width:360,
      height: 180,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin:20,
      borderWidth:2.5,
      borderColor:mainColor,
    },
    photocontainer: {
        width:"42%",
        height:"92.5%",
       // backgroundColor: "red",
        marginLeft:6,
        borderRadius:20,
    },
    photo: { //여기에 이미지가 들어감
      width: "100%",
      height: "100%",
      borderRadius: 20,
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
        fontWeight:"900",
        marginTop:10,
        marginBottom:20,
        color:mainColor
        //textAlign:"center"
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
  