import {Text, View, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, Image, FlatList} from 'react-native'
import React, { useEffect, useContext } from 'react';
import { database } from '../../../firebase';
import { ref, child, onChildAdded} from 'firebase/database';
import { buttonGreen, conColor, darkCello, darkLoafer, mainColor, matrix } from '../../../color';
import { Context } from '../../../Context';
import roka from "../../../assets/rokalogo.png";
import { LinearGradient } from 'expo-linear-gradient';

//수배 위치
//수배 내용
//사진
    let bounties = []; //database 안에 있는 bounties라는 파일들 가져오기

    const bouref = child(ref(database), 'bounties');

export const Wanted = (props) => {

    const [adminCode, setAdminCode]=useContext(Context);


    useEffect(()=>{
        const unsubscribe=onChildAdded(bouref, (snapshot) => {
            bounties.unshift(snapshot.val());
            onRefresh();
        });
        return(()=>{
            unsubscribe();
            bounties=[]
        })
     },[])

    const [refreshing, setRefreshing] = React.useState(false); //리프레쉬 시켜주는거
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 700);
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: "white",alignItems:"center" }}>
              <LinearGradient
         colors={[darkLoafer, "rgba(255, 255, 255, 1)"]}
         start={{ x: 0.5, y: 1 }}
         end={{ x: 0.5, y: 0 }}
         locations={[0, 1]}
      style={{ position:"absolute",flex:1,width:"100%",height:"100%",opacity:0.95}}
    ></LinearGradient>
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      
      <TouchableOpacity
        style={
          {
            width:"25%",
            height:37,
            color:matrix,
            margin:8,
            alignItems: 'center',
            justifyContent: 'center',
            
        }
      
           
        }
        onPress={() => {
          props.navigation.navigate("Wantedbut")
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "800", color: matrix}}>
          수배 작성하기
        </Text>
      </TouchableOpacity>
</View>
        <FlatList 
         data={bounties}
         numColumns={2}
         style={{
            width: "95%",
            padding:10,
            height: "100%",
            flex: 1,
            alignSelf:"center"
          }}
         columnWrapperStyle={{justifyContent:"space-between"}}
         renderItem={({item,index}) => (
            <View style={{ margin: 10 }}>
              <TouchableOpacity
                key={index}
                onPress={() => {
                  props.navigation.navigate("Wantedview", { bountie: item });
                }}
              >
                <View style={styles.item}>
                  <View style={styles.photocon}>
                    <Image
                      source={roka}
                      style={{
                        borderRadius: 30,
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        color: buttonGreen,
                        marginTop: 10,
                        fontSize: 17,
                        fontFamily: "suiteB",
                      }}
                    >
                      {item.pos}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        marginTop: 5,
                        fontSize: 15,
                        fontFamily: "suiteL",
                        textAlign: "center",
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
        </View>
    //   <ScrollView
    //     style={{ backgroundColor: "white", width: "100%", height: "100%" }}
    //     refreshControl={
    //       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //     }
    //   >
    //     <View>
    //       {bounties.map()}
    //     </View>
    //   </ScrollView>
    );
}



const styles = StyleSheet.create({
    photocon1:{
        width:"95%",
        height:240,
        alignItems:"center",
        justifyContent:"center",
    },
    photo:{
        width:"100%",
        height:"100%",
        borderRadius:20,
    },
    Newmin1con:{
        width:"100%",
        height:310,
        margin:10,
    },
    Newmin1:{
        width:"100%",
        height:"100%",
        justifyContent:"center",
    },
    Remin1con:{
        width:"100%",
        height:310,
        margin:10,
    },
    Remin1:{
        width:"100%",
        height:"100%",
        justifyContent:"center",
    },
    item:{
        width:160,
        height:240,
        backgroundColor:darkCello,
        //justifyContent:"center",
        alignItems:"center",
        marginLeft:10,
        borderRadius:15,
        marginBottom:10,
        paddingHorizontal:10,
        // borderWidth:4,
        // borderColor:darkCello,
        elevation:2,
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