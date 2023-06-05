//새로 만들어진 민원들을 보여주는 페이지 입니다. 끝
import {SafeAreaView ,Text, View, ScrollView, StyleSheet, 
        TouchableOpacity, Button, Image, RefreshControl, FlatList} from 'react-native'
import React, { useContext, useEffect, useState} from 'react';
import { database } from '../../../firebase';
import { ref, child, onChildAdded, onChildChanged } from 'firebase/database';
import { Animated } from 'react-native'
import { conColor, mainColor } from '../../../color';
import logo from "../../../assets/logo.jpg";
import roka from "../../../assets/rokalogo.png";
import { Context } from '../../../Context';
import { SliderBox } from "react-native-image-slider-box";
import image from '../../../assets/image.jpg';
import iwant from '../../../assets/iwant.jpg';
import weare from '../../../assets/weare.jpg';
import miy from '../../../assets/miy.jpg'




        /*
        삼항 연산자 ' (조건) ? (참일 경우) : (거짓일 경우) ' 로 부분 조건부 렌더링 구현

        51사단 168여단 68-2대대 이렇게만 화성으로 분류할 것.

        */

//source = {{uri:JSON.parse(reports[1].photo)[0],}} style = {styles.square} 사진 넣는 법
const reports = []; //database 안에 있는 reports라는 파일들 가져오기

const repref = child(ref(database), 'reports');
// const hwa = hwaCode("2", "4", "5");
// hwaCode = ("화성");


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
    
    const [adminCode, setAdminCode]=useContext(Context);



    const [refreshing, setRefreshing] = React.useState(false); //리프레쉬 시켜주는거

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 700);
    }, []);

    const [selectedCategory, setSelectedCategory] = useState("미접수"); // 선택된 카테고리 초기값은 "전체"
 

    
    return(
        <ScrollView style={{width:"100%",height:"100%", backgroundColor:"white"}} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                
                <View style={{alignItems:"center", marginTop:10,}}>
                    <View style={styles.photocon1}> 
                        <SliderBox images={[weare, iwant, miy]}  circleLoop style={styles.photo}
                        />
                    </View>
                </View>


                <View style={styles.Newmin1con}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{fontSize:17,fontWeight:"bold",}}>New 신고</Text>
                        
                        <View style={{marginLeft:200}}>
                            <TouchableOpacity onPress={()=> {props.navigation.navigate('More')}}>
                                <Text style={{fontSize:17,fontWeight:"bold", color:"#BE6DFE"}}>더보기..</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    
                    
                    <View style={styles.Newmin1}>
                        <ScrollView horizontal = {true} > 
                        {reports.filter(rep=>rep.state==="미접수").map((report, index) => (
                            <View>
                                <TouchableOpacity key={index} onPress={()=>{props.navigation.navigate('Min1', {report:report})}}>
                                    <View style={styles.item}>
                                        <View style={styles.photocon}>
                                        {JSON.parse(report.photo).length>0 ? (
                                        <Image source={{ uri: JSON.parse(report.photo)[0],}} style={{borderRadius:30, width:"100%",height:"100%"}} />
                                        ) : (
                                        <Image source={roka} style={{borderRadius:30, width:"100%",height:"100%"}} />
                                        )}
                                        </View>
                                        <View style={{alignItems:"center"}}>
                                            <Text style={{color:"white", marginTop:10, fontSize:15, fontWeight:"800"}}>{report.position}</Text>
                                            <Text style={{color:"white", marginTop:5, fontSize:15, fontWeight:"800"}}>{report.type}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                                ))}
                        </ScrollView>
                    </View>
                </View>

                <View style={styles.Remin1con}>
                <View style={{flexDirection:"row"}}>
                        <Text style={{fontSize:17,fontWeight:"bold",}}>접수했던 신고</Text>
                        
                        <View style={{marginLeft:170}}>
                            <TouchableOpacity onPress={()=> {props.navigation.navigate('More2')}}>
                                <Text style={{fontSize:17,fontWeight:"bold", color:"#BE6DFE"}}>더보기..</Text>
                            </TouchableOpacity>
                        </View>

                        </View>

                    <View style={styles.Remin1}>
                        <ScrollView horizontal = {true}>
                            <View>
                            {reports.filter(rep=>rep.state==="처리중").map((report, i)=>(
                                <TouchableOpacity key={i} onPress={()=>{props.navigation.navigate('Min1', {report:report})}}>
                                    <View style={styles.item}>
                                        <View style={styles.photocon}>
                                            <Image source={roka} style={{borderRadius:30, width:"100%",height:"100%"}} />
                                        </View>
                                        <View style={{alignItems:"center"}}>
                                            <Text style={{color:"white", marginTop:10, fontSize:15, fontWeight:"800"}}>{report.position}</Text>
                                            <Text style={{color:"white", marginTop:5, fontSize:15, fontWeight:"800"}}>{report.type}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                ))}
                            </View>
                                
                        </ScrollView>
                    </View>

                </View> 
        </ScrollView>
    );
};



const styles = StyleSheet.create({
    photocon1:{
        width:"95%",
        height:240,
        alignItems:"center",

    },
    photo:{
        width:"95%",
        height:"100%",
        borderRadius:20,
        marginLeft:10,

    },
    Newmin1con:{
        width:"100%",
        height:300,
        margin:5,
        marginTop:15,
    },
    Newmin1:{
        width:"100%",
        height:"85%",
        justifyContent:"center",

    },
    Remin1con:{
        width:"100%",
        height:300,
        margin:5,
    },
    Remin1:{
        width:"100%",
        height:"90%",
        justifyContent:"center",
    },
    item:{
        width:180,
        height:240,
        backgroundColor:mainColor,
        //justifyContent:"center",
        alignItems:"center",
        borderRadius:30,
        margin:5,
        marginTop:10,

    },
    photocon:{
        margin:5,
        marginTop:20,
        width:135,
        height:120,
        borderRadius:30,
        justifyContent:"center",

    },
  });
  