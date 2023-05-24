import React, { useContext } from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import roka from "../../../assets/rokalogo.png"
import back from "../../../assets/backbutton.png"
import { Directions } from "react-native-gesture-handler";
import { Context } from "../../../Context";

export default function Login2(props) {
    console.disableYellowBox = true;
    return (
        <View style={styles.container}>
          <View style={styles.titlecontainer}>
            <Text style={styles.title}>
                   국방 안전 
             </Text>
             <Text style={styles.title}>신고앱입니다.</Text>
          </View>
             <View style={styles.introContainer}>
                 <Image
                       source={ roka }
                     style={styles.image} />
                 <Text style={styles.introTitleText}>
                    국민을 위해 힘쓰는</Text>
                  <Text style={styles.introTitleText}>당신이 '영웅'입니다.</Text>
                   <TouchableOpacity style={styles.button} onPress = {() => props.navigation.reset({routes: [{name: 'BottomTabs'}]})}>
                  <Text style={styles.buttonText}>메인화면</Text>
             </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "powderblue",
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
  },
  titlecontainer:{
    marginTop:50,
    alignItems:"center",

  },  
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    //marginTop: 50,
  },
  introContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 500,
    marginTop: 30,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 30,
    flexDirection:"column",
  },
  introTitleText: {
    width: 250,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  introdescText: {
    width: 250,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "orange",
    borderRadius: 10,
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",

    marginTop: 20,
  },
  buttonText: {
    fontSize: 30,
    color: "white",
    fontWeight:"bold",
  },
  buttonimage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    
  },
  buttonplace: {
    alignItems: "flex-start",
    flexDirections: "row",
    //justifyContent: "center",
    position: 'absolute',
    right: 150,
  },
});