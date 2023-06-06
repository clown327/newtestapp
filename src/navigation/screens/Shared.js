//민원을 관리할 수 있는 화면 입니다 stack
import {Text, View, ScrollView, StyleSheet, 
        TouchableOpacity, Image, RefreshControl, FlatList, } from 'react-native'
import React, {useContext, useEffect, useState} from 'react';
import { database } from '../../../firebase';
import { ref, child, onChildAdded } from 'firebase/database';
import { Context } from '../../../Context';
import { mainColor, conColor, darkCello, darkLoafer, deco, powderGreen, darkGreen, matrix } from '../../../color';
import roka from "../../../assets/rokalogo.png";
import { ItemContainer } from '../../../CustomButtons/ItemContainer';
import { LinearGradient } from 'expo-linear-gradient';
    
    let reports = [];
    
    const repref = child(ref(database), 'reports');

export const Shared = (props) => {
   const regions={
    "0":"수도",
    "1":"안양",
    "2":"화성",
    "3":"안산",
    "4":"화성",
    "5":"화성"
   }

    const [adminCode, setAdminCode]=useContext(Context);
    
    
    useEffect(()=>{
        const unsubscribe=onChildAdded(repref, (snapshot) => {
            reports.unshift(snapshot.val());
            onRefresh();
        });
        return(()=>{
            unsubscribe();
            reports=[]
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
    const [selectedCategory, setSelectedCategory] = useState(adminCode);
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
              selectedCategory == adminCode
                ? activeButtonStyle
                : inactiveButtonStyle
            }
            onPress={() => {
              setSelectedCategory(adminCode);
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "800", color: matrix}}>
              공유받음
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              selectedCategory == "처리완료"
                ? activeButtonStyle
                : inactiveButtonStyle
            }
            onPress={() => {
              setSelectedCategory("처리완료");
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "800", color: matrix }}>
              처리내역
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList 
        showsVerticalScrollIndicator={false}
        style={{
            width: "95%",
            padding:10,
            height: "100%",
            flex: 1,
            alignSelf:"center"
          }}
          numColumns={2}
          columnWrapperStyle={{justifyContent:"space-between",}}

        data={reports.filter(
            (rep) =>
              rep.shareList.includes(selectedCategory) ||
              ((rep.state === selectedCategory)&&rep.position.includes(regions[adminCode])) 
          )}
          renderItem={({item}) => (
            // <View key={index} style={{flexDirection:"row"}}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Min1", { report: item, isShared:item.shareList.includes(selectedCategory) });
              }}
              style={{marginVertical:5}}
            >
                <ItemContainer report={item}/>
              {/* <View style={styles.item}>
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
                      color: "white",
                      marginTop: 10,
                      fontSize: 15,
                      fontWeight: "800",
                    }}
                  >
                    {item.position}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      marginTop: 5,
                      fontSize: 15,
                      fontWeight: "800",
                    }}
                  >
                    {item.type}
                  </Text>
                </View>
              </View> */}
            </TouchableOpacity>
            // </View>
          )}
        />
        {/* <ScrollView
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            flex: 1,
          }}
          contentContainerStyle={{flexDirection:"row",flexWrap:"wrap"}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
            {reports
              .filter(
                (rep) =>
                  rep.shareList.includes(selectedCategory) ||
                  rep.state === selectedCategory
              )
              .map((report, index) => (
                // <View key={index} style={{flexDirection:"row"}}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("Min1", { report: report });
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
                          color: "white",
                          marginTop: 10,
                          fontSize: 15,
                          fontWeight: "800",
                        }}
                      >
                        {report.position}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          marginTop: 5,
                          fontSize: 15,
                          fontWeight: "800",
                        }}
                      >
                        {report.type}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                // </View>
              ))}

            <View></View>
          </View>
        </ScrollView> */}
      </View>
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