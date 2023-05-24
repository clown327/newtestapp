import {SafeAreaView ,Text, View, ScrollView, StyleSheet, TouchableOpacity, Button, Image, RefreshControl} from 'react-native'
import React, { useState} from 'react';
import { database } from '../../../firebase';
import { ref, child, onChildAdded } from 'firebase/database';


//수배 위치
//수배 내용
//사진

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
                    <TouchableOpacity style={styles.button}>
                        <Text>수배하기</Text>
                    </TouchableOpacity>
                </View>


                <TouchableOpacity>
                    <View style={styles.wantedcontainer}>
                        <View style={styles.imagecontainer}>
                            <Image /*사진이 들어갈 곳입니다*/ />
                        </View>
                        <View style={styles.textcontainer}>
                            <View style={styles.titlecontainer}>
                                <Text style={styles.title}>제목이 들어갈 곳입니다.</Text>
                            </View>
                            <View style={styles.contentcontainer}>
                                <Text style={styles.content}>내용이 들어갈 곳입니다.</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

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
    button:{
          //backgroundColor:"black",
          width:80,
          height:37,
          marginLeft:140,
          marginTop:13,
          borderRadius:13,
          alignItems:"center",
          justifyContent:"center",
          borderWidth:1,
          borderColor:"#AAAAAA",
    },
    title:{
        width:"100%",
        height:60,
       // backgroundColor:"powderblue",
       flexDirection:'row',
       marginTop:10,
       marginBottom:10,
    },
    titleText:{
        fontSize:27,
        fontWeight:"bold",
        margin:10,
        marginLeft:20,
    },
    wantedcontainer:{
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
    imagecontainer:{
        width:"42%",
        height:"95%",
       backgroundColor: "white",
        marginLeft:4,
        borderRadius:20,
    },
    textcontainer:{
        width:"53%",
        height:"100%",
        backgroundColor: "blue",
        marginLeft:5,
        marginRight:2,

    },
    titlecontainer:{
        width:"100%",
        height: "20%",
        backgroundColor:"gray",

    },
    contentcontainer:{
        width:"100%",
        height:"80%",
        backgroundColor:"white",
    },
    content:{
        //margin:,
        fontSize:13,

    },

});