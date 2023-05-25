//민원을 관리할 수 있는 화면 입니다 stack
import {Text, View, ScrollView, StyleSheet, 
        TouchableOpacity, Button, Image, RefreshControl, } from 'react-native'
import React, {useContext, useState,useEffect} from 'react';
import { database } from '../../../firebase';
import { push, ref, child, onChildAdded, onChildChanged } from 'firebase/database';
import { Context } from '../../../Context';

    
    const reports = [];
    
    const repref = child(ref(database), 'reports');
    

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
                    <View style={styles.titleTop}>
                        <View>
                            <Text style={styles.titleText}>공유받은 신고</Text>
                        </View>
                    </View>

                    {reports.filter(rep => rep.shareList.includes(adminCode)).map((report, index) => (
                        <TouchableOpacity key={index} onPress={() => {props.navigation.navigate('Sharescreen', {report:report})}}>
                            <View style={styles.item}>
                            <View style={styles.photocontainer}>
                                <Image source={{ uri: JSON.parse(report.photo)[0],}} style={styles.photo} />
                            </View>
                            <View style={styles.textcontainer}>
                                <View style={styles.typedate}>
                                <Text style={styles.typetext}>{report.type} ({report.state})</Text>
                                </View>
                                <View style={styles.detail}>
                                <Text style={styles.detailtext}>{report.detail}</Text>
                                </View>
                            </View>
                            </View>
                        </TouchableOpacity>
                        ))}
                </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        backgroundColor:"white"
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
    },
    item: {
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
          width:"53%",
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