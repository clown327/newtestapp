
//이 페이지는 공지사항을 보여주는 페이지 입니다.


import {Text, View, ScrollView, StyleSheet, TouchableOpacity, RefreshControl,FlatList} from 'react-native'
import React, { useEffect, useState} from 'react';
import { database } from '../../../firebase';
import { ref, child, onChildAdded } from 'firebase/database';
import { cello, conColor, darkGreen, mainColor, matrix } from '../../../color';


let notices = [];

const notref = child(ref(database), 'notices');


export const Home = (props) => {


     useEffect(()=>{
        const unsubscribe=onChildAdded(notref, (snapshot) => {
            notices.unshift(snapshot.val());
           console.log("childeADD")
        //    console.log(notices)
        onRefresh()
        });
        return(()=>{
            unsubscribe();
            notices=[];
           
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
     const [refreshing, setRefreshing] = React.useState(false);
     const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 700);
      }, []);




    
    return (
      
       <View style={{flex:1,width:"100%",height:"100%"}}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                width: "25%",
                height: 37,
                color: matrix,
                margin: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                props.navigation.navigate("Writenoti");
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "800", color: matrix }}>
                공지 작성하기
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
        style={{width:"100%",alignSelf:"center"}}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{
          padding: 20,
          justifyContent: "flex-start",
          alignItems: "center",
          width: "85%",
          alignSelf:"center"
          // borderWidth:1
          // borderWidth:2,
          // borderColor:"blue"
        }}
        data={notices}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                // console.log("touch")
                props.navigation.navigate("Notiview", { notice: item });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 8,
                  justifyContent: "space-between",
                  // borderWidth: 1,
                  width: "95%",
                  borderBottomWidth: 3,
                  borderLeftWidth:2,
                  borderBottomColor: darkGreen,
                  // backgroundColor:"rgba(172,145,230,0.3)",
                  // opacity:0.5,
                  // elevation:1,
                  // borderWidth:1,
                  // borderColor:"black",
                  paddingHorizontal:8,
                  height: 40,
                  // borderTopLeftRadius:5,
                  borderTopLeftRadius: 15,
                  // elevation:1,
                  alignItems: "center",
                }}
              >
                <View style={{ minWidth:"50%",maxWidth:"50%"}}>
                  <Text
                    style={{ fontSize: 14, color:cello, fontFamily:"suiteM" }}
                    
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.title}
                  </Text>
                </View>
                  <Text style={{ fontSize: 12, alignSelf:"flex-end", fontFamily:"suiteL" }} >{item.date.slice(0,11)}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
        {/* <View>
          <View style={styles.noticon}>
            {notices.map((notice, index) => (
              <TouchableOpacity
                style={styles.notices}
                key={index}
                onPress={() => {
                  props.navigation.navigate("Notiview", { notice: notice });
                }}
              >
                <View style={styles.noticontent}>
                  <Text style={{ fontSize: 15, fontWeight: "700" }}>
                    {notice.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View> */}
        </View>
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