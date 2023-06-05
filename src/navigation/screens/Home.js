
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
        <ScrollView style={{width:"100%",height:"100%",backgroundColor:"white" }}>
            <View>
                
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

});