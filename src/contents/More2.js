import {Text, View, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, Image} from 'react-native'
import React, { useEffect, useContext } from 'react';
import { database } from '../../firebase';
import { ref, child, onChildAdded} from 'firebase/database';
import { conColor, mainColor } from '../../color';
import { Context } from '../../Context';
import roka from "../../assets/rokalogo.png";


//수배 위치
//수배 내용
//사진
    const report = []; //database 안에 있는 report라는 파일들 가져오기
    const repref = child(ref(database), 'reports');


export const More2 = (props) => {

    const [adminCode, setAdminCode]=useContext(Context);


    useEffect(()=>{
        const unsubscribe=onChildAdded(repref, (snapshot) => {
            report.unshift(snapshot.val());
            onRefresh();
        });
        return(()=>{
            unsubscribe();
        })
     },[])

    const [refreshing, setRefreshing] = React.useState(false); //리프레쉬 시켜주는거
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 800);
    }, []);
    


    return(
        <ScrollView style={{backgroundColor:"white", width:"100%", height:"100%"}}refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                
                {report.filter(rep=>rep.state==="처리중").map((report, index) => (
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
    );
}



const styles = StyleSheet.create({
    photocon1:{
        width:"95%",
        height:240,
        alignItems:"center",
        justifyContent:"center",
    },
    photo:{
        width:"100%",
        height:"100%",
        borderRadius:20,
    },
    Newmin1con:{
        width:"100%",
        height:310,
        margin:10,
    },
    Newmin1:{
        width:"100%",
        height:"100%",
        justifyContent:"center",
    },
    Remin1con:{
        width:"100%",
        height:310,
        margin:10,
    },
    Remin1:{
        width:"100%",
        height:"100%",
        justifyContent:"center",
    },
    item:{
        width:180,
        height:240,
        backgroundColor:mainColor,
        //justifyContent:"center",
        alignItems:"center",
        marginLeft:10,
        borderRadius:30,
        marginBottom:10,
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