import {SafeAreaView ,Text, View, ScrollView, StyleSheet, TouchableOpacity, Button, Image, RefreshControl} from 'react-native'
import React, {useState, useEffect} from 'react';
import { database } from '../../../firebase';
import { ref, child, onChildAdded } from 'firebase/database';


//수배 위치
//수배 내용
//사진
    const bounties = []; //database 안에 있는 bounties라는 파일들 가져오기

    const bouref = child(ref(database), 'bounties');

export const Wanted = (props) => {

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
        <ScrollView style={styles.container} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            <View style={styles.container2}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Wanted</Text>                
                    <TouchableOpacity style={styles.button} onPress={()=> props.navigation.navigate("Wantedbut")}>
                        <Text>수배하기</Text>
                    </TouchableOpacity>
                </View>

                {bounties.map((bountie, index) => (
                    <TouchableOpacity key={index} onPress={() => {props.navigation.navigate('Wantedview', {bountie:bountie})}}>
                        <View style={styles.item}>
                        <View style={styles.textcontainer}>
                            <View style={styles.typedate}>
                            <Text style={styles.typetext}>{bountie.title} ({bountie.pos})</Text>
                            </View>
                            <View style={styles.detail}>
                            <Text style={styles.datetext}>{bountie.date}</Text>
                            <Text style={styles.detailtext}>{bountie.content}</Text>
                            </View>
                        </View>
                        </View>
                    </TouchableOpacity>
                    ))}




            </View>
        </ScrollView>
    );
}
/*


    
*/
const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        backgroundColor:"white"
    },
    container2:{
        marginTop:50,
      },    
    button:{
          //backgroundColor:"black",
          width:80,
          height:37,
          marginLeft:115,
          borderRadius:13,
          alignItems:"center",
          justifyContent:"center",
          borderWidth:1,
          borderColor:"#AAAAAA",
          marginTop:15,
    },
    titleText:{
        fontSize:30,
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
    container: {
        flex:1, 
        padding:10,
        width:"100%",
        height:"100%",
        backgroundColor:"white",
    },
    catbutton: {
        width:"100%",
        height:40,
        backgroundColor:"transparent",
        marginBottom:17,
        flexDirection:"row",
        justifyContent:'center'

    },
    item: {
      backgroundColor: 'powderblue',
      width:"93.5%",
      height: 180,
      padding: 10,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      marginLeft:12,
      marginRight:17,
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
        height:"100%",
        //backgroundColor: "blue",
        marginLeft:5,
        marginRight:2,
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
        flexDirection:"row",
        fontSize:30,
        fontWeight:"bold",
        marginTop:10,
        marginBottom:30,
        textAlign:"center"
    },
    typetext:{
        fontSize:15,
        marginTop:2,
        fontWeight:"bold",
    },
    detailtext:{
        fontSize:15,
        marginTop:5,
    },
    datetext:{
        fontSize:12,
    }

});