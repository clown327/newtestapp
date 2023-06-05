//민원을 관리할 수 있는 화면 입니다 stack
import {Text, View, ScrollView, StyleSheet, 
        TouchableOpacity, Image, RefreshControl, } from 'react-native'
import React, {useContext, useEffect, useState} from 'react';
import { database } from '../../../firebase';
import { ref, child, onChildAdded } from 'firebase/database';
import { Context } from '../../../Context';
import { mainColor, conColor } from '../../../color';
import roka from "../../../assets/rokalogo.png";

    
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
      }, 800);
    }, []);

    //let filteredData = data.filter(x => String(x.approval).includes(approvalVariable));
    //let reports.filter(rep=>String(rep.shareList).includes(adminCode)===adminCode);
    const [selectedCategory, setSelectedCategory] = useState("공유된 목록");
    //필터링을 두번 해줘야 됨 1.처리완료 된거 2.공유된 목록
    
    const activeButtonStyle = {
        width:"25%",
        height:37,
        color:mainColor,
        margin:8,
        alignItems: 'center',
        justifyContent: 'center',
        
    };
    
    const inactiveButtonStyle = {
        width: '25%',
        height: 37,
        margin:8,
        alignItems: 'center',
        justifyContent: 'center',
        opacity:0.3,
        };




    return(
        <ScrollView style={{width:"100%",height:"100%",backgroundColor:"white", flex:1}} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>

            <View>
                <View style={{flexDirection:"row", justifyContent:"center"  }}>
                     <TouchableOpacity style={selectedCategory == adminCode ? activeButtonStyle : inactiveButtonStyle}
                                        onPress={() => {setSelectedCategory(adminCode)}}>
                                            <Text style={{fontSize:15,fontWeight:"800",color:"black",}}>공유된 목록</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={selectedCategory == '처리완료'? activeButtonStyle: inactiveButtonStyle}
                                        onPress={() => {setSelectedCategory("처리완료")}}>
                                            <Text style={{fontSize:15,fontWeight:"800",color:"black"}}>처리된 내역</Text>
                        </TouchableOpacity>
                </View>

                {reports.filter(rep=>rep.shareList.includes(selectedCategory) ||  rep.state===selectedCategory).map((report, index) => (
                    <View key={index} style={{flexDirection:"row"}}>
                        <TouchableOpacity onPress={() => {props.navigation.navigate('Min1')}}>
                            <View style={styles.item}>
                                <View style={styles.photocon}>
                                <Image source={roka} style={{borderRadius:30, width:"100%",height:"100%"}} />
                                </View>
                                <View style={{alignItems:"center"}}>
                                <Text style={{color:"white", marginTop:10, fontSize:15, fontWeight:"800"}}>{report.position}</Text>
                                <Text style={{color:"white", marginTop:5, fontSize:15, fontWeight:"800"}}>{report.type}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {props.navigation.navigate('Min1')}}>
                            <View style={styles.item}>
                                <View style={styles.photocon}>
                                <Image source={roka} style={{borderRadius:30, width:"100%",height:"100%"}} />
                                </View>
                                <View style={{alignItems:"center"}}>
                                <Text style={{color:"white", marginTop:10, fontSize:15, fontWeight:"800"}}>{report.position}</Text>
                                <Text style={{color:"white", marginTop:5, fontSize:15, fontWeight:"800"}}>{report.type}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
                            
                <View>
                </View>

            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    item:{
        width:180,
        height:240,
        backgroundColor:mainColor,
        //justifyContent:"center",
        alignItems:"center",
        marginLeft:10,
        borderRadius:30,
        marginBottom:10,
    },
    photocon:{
        margin:5,
        marginTop:20,
        width:135,
        height:120,
        borderRadius:30,
        justifyContent:"center",

    },

   
});