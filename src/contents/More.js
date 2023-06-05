import {Text, View, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, Image, FlatList} from 'react-native'
import React, { useEffect, useContext } from 'react';
import { database } from '../../firebase';
import { ref, child, onChildAdded} from 'firebase/database';
import { conColor, mainColor } from '../../color';
import { Context } from '../../Context';
import roka from "../../assets/rokalogo.png";
import { ItemContainer } from '../../CustomButtons/ItemContainer';


//수배 위치
//수배 내용
//사진
let report = []; //database 안에 있는 report라는 파일들 가져오기
const repref = child(ref(database), 'reports');


export const More = (props) => {

    const [adminCode, setAdminCode]=useContext(Context);


    useEffect(()=>{
        console.log("subscribed!")
        console.log(report);
        const unsubscribe=onChildAdded(repref, (snapshot) => {
            console.log("childadded")
            report.unshift(snapshot.val());
            onRefresh();
        });
        return(()=>{
            unsubscribe();
            console.log("unsubscribed!")
            report=[];
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
        
                
                <FlatList
                style={{backgroundColor:"white", width:"100%", height:"100%"}}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} 
                // style={{
                //     width: "100%",
                //     padding:10,
                //     height: "100%",
                //     backgroundColor: "white",
                //     flex: 1,
                //     alignSelf:"center"
                //   }}
                data={report.filter(rep=>rep.state==="미접수")}
                numColumns={2}
                columnWrapperStyle={{justifyContent:"space-between", paddingHorizontal:20}}
                renderItem={({item})=>{
                    return(
                            // <View key={index} style={{flexDirection:"row"}}>
                            <TouchableOpacity
                              onPress={() => {
                                props.navigation.navigate("Min1", { report: item });
                              }}
                            >
                                <ItemContainer report={item}/>
                            </TouchableOpacity>
                    )
                }}
                />
                
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