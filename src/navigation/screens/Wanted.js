import {SafeAreaView ,Text, View, ScrollView, StyleSheet, TouchableOpacity, Button, Image, RefreshControl} from 'react-native'
import React, {useState, useEffect, useContext } from 'react';
import { database } from '../../../firebase';
import { ref, child, onChildAdded} from 'firebase/database';
import { conColor, mainColor } from '../../../color';
import { Context } from '../../../Context';


//수배 위치
//수배 내용
//사진
    const bounties = []; //database 안에 있는 bounties라는 파일들 가져오기

    const bouref = child(ref(database), 'bounties');
   
    const adminName={
        "0":"지상작전사령부",
        "1":"수도군단",
        "2":"51사단",
        "3":"167여단",
        "4":"168여단",
        "5":"169여단"
      }

export const Wanted = (props) => {

    const [adminCode, setAdminCode]=useContext(Context);


    useEffect(()=>{
        const unsubscribe=onChildAdded(bouref, (snapshot) => {
            bounties.unshift(snapshot.val());
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
      }, 700);
    }, []);
    


    return(
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollView} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>

            <View style={styles.container2}>
                <View style={styles.topcontainer}>
                                <View style={{width:"50%" , justifyContent:"center",marginTop:10,}}>
                                    <Text style={{fontSize:27,fontWeight:"900",color:mainColor,margin:10,}}>수배</Text>
                                    <Text style={{fontSize:17,fontWeight:"600",color:mainColor, margin:10,marginTop:17}}>{`부대명:${adminName[adminCode]}`}</Text>
                                </View>
                                <View style={{width:"50%"}}>
                                    <TouchableOpacity style={{
                                        width:80,
                                        height:37,
                                        marginLeft:90,
                                        marginTop:20,
                                        borderRadius:15,
                                        alignItems:"center",
                                        justifyContent:"center",
                                        borderWidth:1.5,
                                        backgroundColor:conColor,
                                        borderColor:mainColor,
                                    }} onPress={()=> props.navigation.navigate("Wantedbut")}>
                                        <Text style={{
                                                fontSize:17,
                                                fontWeight:"bold",
                                                color:mainColor
                                        }}>수배하기</Text>
                                    </TouchableOpacity>
                                </View>


                    </View>
                    <View style={styles.botcontainer}>
                        {bounties.map((bountie, index) => (
                                    <TouchableOpacity key={index} onPress={() => {props.navigation.navigate('Wantedview', {bountie:bountie})}}>
                                        <View style={styles.item}>
                                        <View style={styles.textcontainer}>
                                            <View style={styles.typedate}>
                                            <Text style={styles.typetext}> {bountie.title}({bountie.pos})</Text>
                                            </View>
                                            <View style={styles.detail}>
                                            <Text style={styles.datetext}> {bountie.date}</Text>
                                            <Text style={styles.detailtext}> {bountie.content}</Text>
                                            </View>
                                        </View>
                                        </View>
                                    </TouchableOpacity>
                                    ))}
                    </View>
            </View>
        </ScrollView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex:1, 
        width:"100%",
        height:"100%",
        backgroundColor:"white",
    },
        topcontainer:{
        width:"100%",
        padding:10,
        height:150,
        justifyContent:"center",
        //backgroundColor:"powderblue",
        borderBottomWidth:2.5,
        borderBottomColor:conColor,
        flexDirection:"row"
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
        width:350,
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
        width:"95%",
        height:"90%",
        marginLeft:8,
        borderRadius:15,
        backgroundColor: conColor,
        margin:5,
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
        color:mainColor,
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
    datetext:{
        fontSize:12,
    },
  });