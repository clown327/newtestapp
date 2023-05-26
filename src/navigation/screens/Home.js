
//이 페이지는 공지사항을 보여주는 페이지 입니다.


import {TextInput, SafeAreaView ,Text, View, ScrollView, StyleSheet, TouchableOpacity, Button, Image, RefreshControl} from 'react-native'
import React, { useEffect, useState} from 'react';
import { database } from '../../../firebase';
import { ref, child, onChildAdded } from 'firebase/database';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { conColor, mainColor } from '../../../color';


const notices = [];

const notref = child(ref(database), 'notices');


export const Home = (props) => {


     useEffect(()=>{
        const unsubscribe=onChildAdded(notref, (snapshot) => {
            notices.unshift(snapshot.val());
            onRefresh();
        });
        return(()=>{
            unsubscribe();
        })
     },[])
    /*
     useEffect(()=>{
        const unsubscribe=onChildAdded(notref, (snapshot) => {
            notices.push(snapshot.val());
            onRefresh();
        });
        return(()=>{
            unsubscribe();
        })
     },[])
    */


    const [refreshing, setRefreshing] = useState(false); //리프레쉬 시켜주는거



    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 700);
    }, []);
    
    return(
        <ScrollView style={styles.container} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                
                <View style={styles.container}>
                    <View style={styles.container2}>

                   
                        <View style={styles.topcontainer}>
                            <View style={{width:"40%" , justifyContent:"center",}}>
                                 <Text style={{fontSize:27,fontWeight:"900",color:mainColor,margin:10,marginTop:15}}>공지사항</Text>
                                 <Text style={{fontSize:17,fontWeight:"600",color:mainColor, margin:10,marginTop:15,}}>26.8°C</Text>
                            </View>
                           <View style={{width:"60%"}}>
                                <TouchableOpacity style={{  width:80,
                                                            height:37,
                                                            marginLeft:127,
                                                            marginTop:20,
                                                            borderRadius:15,
                                                            alignItems:"center",
                                                            justifyContent:"center",
                                                            borderWidth:1.5,
                                                            backgroundColor:conColor,
                                                            borderColor:mainColor,}} onPress={() => props.navigation.navigate("Writenoti")}>
                                    <Text style={styles.buttontext}>글쓰기</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={styles.botcontainer}>
                                {notices.map((notice, index) => (
                                <TouchableOpacity style={styles.Noticontainer} key={index} onPress={()=>{props.navigation.navigate('Notiview', {notice:notice})}}>
                                <View style={styles.noticontent}>
                                    <Text style={styles.textcont}>{notice.title}</Text>
                                </View>
                                </TouchableOpacity>

                            ))}

                        </View>

                    </View>
                </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        //flex:1,
        backgroundColor:"white",
    },
        topcontainer:{
        width:"100%",
        padding:10,
        height:150,
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
    },
    container2:{
        marginTop:40,
      },
    title:{
        width:"100%",
        height:60,
        flexDirection:"row",        
    },
    buttontext:{
        fontSize:17,
        fontWeight:"bold",
        color:mainColor,

    },
    titleText:{
        fontSize:27,
        fontWeight:"bold",
        //margin:10,
        //marginLeft:20,
        color:mainColor,
    },
    Noticontainer:{
        width:"100%",
        height:80,
        //backgroundColor: "black",
        //borderRadius:10,
        padding:10,
        //marginLeft:16.8,
        //flexDirection:"row",
        borderBottomWidth:1.5,
        borderBottomColor:conColor,
        
        
    },
    photo:{
        width:"18%",
        height:60,
        //backgroundColor:"green",
    },
    noticontent:{
        width:"77%",
        height:"100%",
        //backgroundColor:"powderblue",
        marginLeft:3,
        justifyContent:"center",
        fontSize:27,

    },
    textcont:{
        fontSize:15,
        fontWeight:"bold",
    },
    


});