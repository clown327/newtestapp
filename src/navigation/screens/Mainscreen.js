//새로 만들어진 민원들을 보여주는 페이지 입니다. 끝
import {SafeAreaView ,Text, View, ScrollView, StyleSheet, TouchableOpacity, Button, Image, RefreshControl} from 'react-native'
import React, { useEffect, useState} from 'react';
import { database } from '../../../firebase';
import { ref, child, onChildAdded, onChildChanged } from 'firebase/database';



//source = {{uri:JSON.parse(reports[1].photo)[0],}} style = {styles.square} 사진 넣는 법
const reports = []; //database 안에 있는 reports라는 파일들 가져오기

const repref = child(ref(database), 'reports');

export const Mainscreen = (props) => {

    useEffect(()=>{
        const unsubscribe=onChildAdded(repref, (snapshot) => {
            reports.push(snapshot.val());
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
      }, 2000);
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
        backgroundColor: '#E4E6FD',
        margin: 3,
        marginLeft: 7,
        marginRight: 7,
        borderRadius: 30,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    };
    
    const inactiveButtonStyle = {
        width: '20%',
        height: 37,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        marginLeft: 7,
        marginRight: 7,
        borderRadius: 30,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        };
      //미접수/접수/처리중/처리완료 

    
    return(
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollView}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
         
        <SafeAreaView>
            <View>
                <Text style={styles.title}>신고 접수</Text>
            </View>
            <View style={styles.catbutton}>
            <TouchableOpacity style={selectedCategory == '미접수'? activeButtonStyle : inactiveButtonStyle}
                            onPress={() => {setSelectedCategory("미접수")}}>
                                <Text>미접수</Text>
            </TouchableOpacity>
            <TouchableOpacity style={selectedCategory == '처리중'? activeButtonStyle: inactiveButtonStyle}
                            onPress={() => {setSelectedCategory("처리중")}}>
                                <Text>처리중</Text>
            </TouchableOpacity>
            <TouchableOpacity style={selectedCategory == '처리완료'? activeButtonStyle: inactiveButtonStyle}
                            onPress={() => {setSelectedCategory("처리완료")}}>
                                <Text>처리완료</Text>
            </TouchableOpacity>
            </View>

            {reports.filter(rep=>rep.state===selectedCategory).map((report, index) => (
                <TouchableOpacity key={index} onPress={() => {props.navigation.navigate('Min1', {report:report})}}>
                    <View style={styles.item}>
                    <View style={styles.photocontainer}>
                        <Image source={{ uri: JSON.parse(report.photo)[0],}} style={styles.photo} />
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
        padding:10,
        width:"100%",
        height:"100%",
        backgroundColor:"white",
    },
    catbutton: {
        width:"100%",
        height:40,
        backgroundColor:"transparent",
        marginBottom:17,
        flexDirection:"row",
        justifyContent:'center'

    },
    button1:{
        width:"20%",
        height:37,
        //backgroundColor:"yellow",
        borderWidth:1,
        borderColor:"#D1D1D1",
        //margin:3,
        marginLeft:7,
        marginRight:7,
        borderRadius:30,
        marginTop:5,
        alignItems:"center",
        justifyContent:"center",
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
      width:"93.5%",
      height: 180,
      padding: 10,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
      marginLeft:12,
      marginRight:17,
    },
    photocontainer: {
        width:"42%",
        height:"95%",
       // backgroundColor: "red",
        marginLeft:4,
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
        fontWeight:"bold",
        marginTop:50,
        marginBottom:30,
        textAlign:"center"
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
  