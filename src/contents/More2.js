import {Text, View, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, Image, FlatList} from 'react-native'
import React, { useEffect, useContext } from 'react';
import { database } from '../../firebase';
import { ref, child, onChildAdded, onChildChanged} from 'firebase/database';
import { conColor, darkLoafer, mainColor } from '../../color';
import { Context } from '../../Context';
import roka from "../../assets/rokalogo.png";
import { ItemContainer } from '../../CustomButtons/ItemContainer';
import { LinearGradient } from 'expo-linear-gradient';

//수배 위치
//수배 내용
//사진
    let report = []; //database 안에 있는 report라는 파일들 가져오기
    const repref = child(ref(database), 'reports');


export const More2 = (props) => {

    const [adminCode, setAdminCode]=useContext(Context);


    useEffect(() => {
        const unsubscribe = onChildAdded(repref, (snapshot) => {
          if(["2","4","5"].includes(adminCode)){
            if(snapshot.val().position.includes("화성")){
              report.unshift(snapshot.val());
            }
          } else if(adminCode==="1"){
            if(snapshot.val().position.includes("안양")){
              report.unshift(snapshot.val());
            }
            
          } else if (adminCode==="3"){
            if(snapshot.val().position.includes("안산")){
              report.unshift(snapshot.val());
            }
          }
         
          onRefresh();
        });
    
        const unsubscribe2 = onChildChanged(repref, (snapshot) => {
          if(["2","4","5"].includes(adminCode)){
            if(snapshot.val().position.includes("화성")){
              report.splice(
                report.findIndex((element) => element.uid === snapshot.val().uid),
                1,
                snapshot.val()
              );
            }
          } else if(adminCode==="1"){
            if(snapshot.val().position.includes("안양")){
              report.splice(
                report.findIndex((element) => element.uid === snapshot.val().uid),
                1,
                snapshot.val()
              );
            }
            
          } else if (adminCode==="3"){
            if(snapshot.val().position.includes("안산")){
              report.splice(
                report.findIndex((element) => element.uid === snapshot.val().uid),
                1,
                snapshot.val()
              );
            }
          }
          
          onRefresh();
        });
    
        return () => {
          unsubscribe();
          unsubscribe2();
          report=[];
        };
      }, []);

    const [refreshing, setRefreshing] = React.useState(false); //리프레쉬 시켜주는거
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 800);
    }, []);
    


    return(
        <View style={{ flex: 1, backgroundColor: "white",alignItems:"center",paddingTop:30 }}>
        <LinearGradient
        colors={[darkLoafer, "rgba(255, 255, 255, 1)"]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        locations={[0, 1]}
     style={{ position:"absolute",flex:1,width:"100%",height:"120%",opacity:0.95}}
   ></LinearGradient>
         <FlatList
        style={{ width:"100%", height:"100%"}}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} 
        // style={{
        //     width: "100%",
        //     padding:10,
        //     height: "100%",
        //     backgroundColor: "white",
        //     flex: 1,
        //     alignSelf:"center"
        //   }}
        data={report.filter(rep=>rep.state==="처리중")}
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
        </View>
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