import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';



export const Complete= (props) => {

    const report = props.route.params.report; //reports의 파라미터값
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.comcontainer}>
          <Text style={styles.comtext}>
            접수되었습니다!
          </Text>
        </View>
        <View style={styles.photocontainer}>
            <Icon name="done" size={170} color="#222A5A" />
        </View>
        <View style={styles.buttoncontainer}>
          <TouchableOpacity style={styles.button} onPress = {() => props.navigation.navigate("Mainscreen")}>
            <Text style={styles.buttontext}>
              돌아가기!
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    width:"100%",
    height:"100%"
  },
  comcontainer: {
    width:"100%",
    height:"20%",
    //backgroundColor:"yellow",    
    alignItems:"center",
    justifyContent:"flex-end",
    //flexDirection:"column"

  },
  comtext:{
    fontSize:30,
    fontWeight:"bold",

  },
  photocontainer:{
    width:"100%",
    height:"60%",
    //backgroundColor:"red",
    alignItems:"center",
    justifyContent:"center",

  },
  photo:{

  },
  buttoncontainer:{
    width:"100%",
    height:"30%",
    //backgroundColor:"powderblue",

  },
  button:{
    width:"85%",
    height:70,
    //margin:30,
    marginLeft:30,
    marginRight:30,
    marginBottom:30,
    padding:10,
    borderRadius:10,
    backgroundColor:"#1E90FF",    
    alignItems:"center",
    justifyContent:"center",
  },
  buttontext: {
    color:"white",

    fontSize:30,
    fontWeight:"bold",


  },

 
  
});