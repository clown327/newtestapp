//공지사항을 띄워주는 페이지 입니다.
import {TextInput, SafeAreaView ,Text, View, ScrollView, StyleSheet, TouchableOpacity, Button, Image, RefreshControl} from 'react-native'
import React, { useEffect, useState} from 'react';
import { database } from '../../../firebase';
import { ref, child, onChildAdded } from 'firebase/database';
import Icon from 'react-native-vector-icons/MaterialIcons';



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
      }, 2000);
    }, []);
    
    return(
        <ScrollView style={styles.container} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            <SafeAreaView>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Home</Text>
                    <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("Writenoti")}>
                        <Text style={styles.buttontext}>글쓰기</Text>
                    </TouchableOpacity>
                </View>

                
                <View> 
                    {notices.map((notice, index) => (
                        <TouchableOpacity style={styles.Noticontainer} key={index} onPress={()=>{props.navigation.navigate('Notiview', {notice:notice})}}>
                        <View style={styles.noticontent}>
                            <Text style={styles.textcont}>{notice.title}</Text>
                        </View>
                        </TouchableOpacity>

                    ))}
                </View>

            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        //height:"100%",
        flex:1,
        backgroundColor:"white",
        paddingTop:40,
    },
    title:{
        width:"100%",
        height:60,
        //backgroundColor:"powderblue", 
        flexDirection:"row",
        marginBottom:20,
        
    },
    button: {
        //backgroundColor:"black",
        width:80,
        height:37,
        marginLeft:160,
        marginTop:13,
        borderRadius:13,
        alignItems:"center",
        justifyContent:"center",
        borderWidth:1,
        backgroundColor:"#FDFDFD",
        borderColor:"#DEDEDE",
    },
    buttontext:{
        fontSize:17,
        fontWeight:"bold",

    },
    titleText:{
        fontSize:27,
        fontWeight:"bold",
        margin:10,
        marginLeft:20,
    },
    Noticontainer:{
        width:"91%",
        height:80,
        //backgroundColor: "black",
        borderRadius:10,
        padding:10,
        marginLeft:16.8,
        flexDirection:"row",
        borderBottomWidth:1,
        borderBottomColor:"#D9D9D9",
        
        
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
        marginLeft:12,
        justifyContent:"center",
        fontSize:27,

    },
    textcont:{
        fontSize:15,
        fontWeight:"bold",
    },
    


});