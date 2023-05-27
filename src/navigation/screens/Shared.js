//민원을 관리할 수 있는 화면 입니다 stack
import {Text, View, ScrollView, StyleSheet, 
        TouchableOpacity, Button, Image, RefreshControl, } from 'react-native'
import React, {useContext, useState,useEffect} from 'react';
import { database } from '../../../firebase';
import { push, ref, child, onChildAdded, onChildChanged } from 'firebase/database';
import { Context } from '../../../Context';
import { mainColor, conColor } from '../../../color';
import logo from "../../../assets/logo.jpg";

    
    const reports = [];
    
    const repref = child(ref(database), 'reports');
    
    const adminName={
        "0":"지상작전사령부",
        "1":"수도군단",
        "2":"51사단",
        "3":"167여단",
        "4":"168여단",
        "5":"169여단"
      }

export const Shared = (props) => {


    const [adminCode, setAdminCode]=useContext(Context);
    
    
    useEffect(()=>{
        const unsubscribe=onChildAdded(repref, (snapshot) => {
            reports.unshift(snapshot.val());
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

    //let filteredData = data.filter(x => String(x.approval).includes(approvalVariable));
    //let reports.filter(rep=>String(rep.shareList).includes(adminCode)===adminCode);

    return(
        <ScrollView style={styles.container} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>

                    <View style={styles.container2}>

                        <View style={styles.topcontainer}>
                            <View style={{flexDirection:"row",}}>
                                 <Text style={{fontSize:27,fontWeight:"900",color:mainColor,margin:10,}}>공유받은 신고</Text>
                                 <Image source={logo} style={{width:60,height:60, marginLeft:100}}/>
                            </View>
                           
                            <Text style={{fontSize:17,fontWeight:"600",color:mainColor, margin:10,}}>{`부대명:${adminName[adminCode]}`}</Text>

                        </View>

                        <View style={styles.botcontainer}>
                        {reports.filter(rep => rep.shareList.includes(adminCode)).map((report, index) => (
                        <TouchableOpacity key={index} onPress={() => {props.navigation.navigate('Sharescreen', {report:report})}}>
                            <View style={styles.item}>
                            <View style={styles.photocontainer}>
                                <Image source={{ uri: JSON.parse(report.photo)[0],}} style={styles.photo} />
                            </View>
                            <View style={styles.textcontainer}>
                                <View style={styles.typedate}>
                                <Text style={styles.typetext}>{report.type}({report.state})</Text>
                                </View>
                                <View style={styles.detail}>
                                <Text style={styles.detailtext}>{report.detail}</Text>
                                </View>
                            </View>
                            </View>
                        </TouchableOpacity>
                        ))}


                        </View>



                    </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        flex:1,
        backgroundColor:"white"
    },   
     container2:{
        marginTop:40,
      },
    topcontainer:{
        width:"100%",
        padding:10,
        height:140,
        //backgroundColor:"powderblue",
        borderBottomWidth:2.5,
        borderBottomColor:conColor,
        justifyContent:"center",
    },

    botcontainer:{
        width:"100%",
        height:"88%",
        padding:10,
        alignItems:"center",
        //backgroundColor:"powderblue",
    },
    catbutton: {
        width:"100%",
        height:40,
        borderBottomColor:"#C8D9F3",
        borderBottomWidth:1.5,
        marginBottom:35,
        flexDirection:"row",
        justifyContent:'center'
    },
    container2:{
        marginTop:50,
      },
    titleTop:{
        width:"100%",
        height:60,
       // backgroundColor:"powderblue",
    },
    titleText:{
        fontSize:27,
        fontWeight:"bold",
        margin:10,
        marginLeft:20,
        color:mainColor,
    },
    item: {
        width:360,
        height: 180,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin:20,
        borderWidth:2.5,
        borderColor:mainColor
      },
      photocontainer: {
          width:"42%",
          height:"92.5%",
         // backgroundColor: "red",
          marginLeft:6,
          borderRadius:20,
      },
      photo: { //여기에 이미지가 들어감
        width: "100%",
        height: "100%",
        borderRadius: 20,
      },
      textcontainer: {
          width:"53%",
          height:"100%",
          //backgroundColor: "blue",
          margin:10,
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
          fontWeight:"bold",
          marginTop:50,
          marginBottom:30,
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
});