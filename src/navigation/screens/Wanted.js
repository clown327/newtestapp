import {SafeAreaView ,Text, View, ScrollView, StyleSheet, TouchableOpacity, Button, Image, RefreshControl} from 'react-native'
import React, { useState} from 'react';
import { database } from '../../../firebase';
import { ref, child, onChildAdded } from 'firebase/database';


export const Wanted = (props) => {
    const reports = []; //database 안에 있는 reports라는 파일들 가져오기

    const repref = child(ref(database), 'reports');
    onChildAdded(repref, (snapshot) => {
        reports.push(snapshot.val());
    });

    const [refreshing, setRefreshing] = React.useState(false); //리프레쉬 시켜주는거

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
    
    return(
        <ScrollView style={styles.container} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            <SafeAreaView>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Wanted</Text>
                </View>
                <View style={styles.Noticontainer}>


                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        backgroundColor:"white"
    },
    title:{
        width:"100%",
        height:60,
       // backgroundColor:"powderblue",
    },
    titleText:{
        fontSize:27,
        fontWeight:"bold",
        margin:10,
        marginLeft:20,
    },
    Noticontainer:{
        width:"100%",
        

    },
    
    


});