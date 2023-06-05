
//이 페이지는 공지사항을 보여주는 페이지 입니다.


import {Text, View, ScrollView, StyleSheet, TouchableOpacity, RefreshControl} from 'react-native'
import React, { useEffect, useState} from 'react';
import { database } from '../../../firebase';
import { ref, child, onChildAdded } from 'firebase/database';
import { conColor, mainColor } from '../../../color';


const notices = [];

const notref = child(ref(database), 'notices');


export const Home = (props) => {


     useEffect(()=>{
        const unsubscribe=onChildAdded(notref, (snapshot) => {
            notices.unshift(snapshot.val());
           
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






    
    return(
        <ScrollView style={{width:'100%', height:'100%', flex:1,backgroundColor:"white"}} >

                <View style={{flexDirection:"row", borderBottomWidth:2, borderBottomColor:'#ccc'}} >
                    <Text style={{fontSize:25,fontWeight:"800", margin:10}}>메뉴</Text>
                    <TouchableOpacity style={{borderRadius:10, borderWidth:1, alignItems:"center",justifyContent:"center",margin:10}} onPress={()=> {props.navigation.navigate('Writenoti')}}>
                        <Text style={{fontSize:20,fontWeight:"700"}}> 공지사항 작성 </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderRadius:10, borderWidth:1, alignItems:"center",justifyContent:"center", margin:10}} onPress={()=> {props.navigation.navigate('Wantedbut')}}>
                        <Text style={{fontSize:20,fontWeight:"700"}}> 수배하기 </Text>
                    </TouchableOpacity>
                </View>


                <View>
                <View style={styles.noticon}>
                                {notices.map((notice, index) => (
                                <TouchableOpacity style={styles.notices} key={index} onPress={()=>{props.navigation.navigate('Notiview', {notice:notice})}}>
                                <View style={styles.noticontent}>
                                    <Text style={{fontSize:15,fontWeight:"700"}}>{notice.title}</Text>
                                </View>
                                </TouchableOpacity>

                            ))}

                        </View>
                </View>
                
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    noticon:{
        flex:1,

    },
    notices:{
        margin:10

    },

});