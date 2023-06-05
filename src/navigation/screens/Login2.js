import React, { useContext } from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Context } from "../../../Context";
import logo from "../../../assets/logo.jpg"
import { conColor, mainColor } from "../../../color";

const adminName={
  "0":"지상작전사령부",
  "1":"수도군단",
  "2":"51사단",
  "3":"167여단",
  "4":"168여단",
  "5":"168여단 2대대" //169->68-2로 바뀜 
}

export default function Login2(props) {
    console.disableYellowBox = true;
    const [adminCode,setAdminCode]=useContext(Context);
    return (
      <View style={styles.container}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>국방 안전</Text>
          <Text style={styles.title}>신고앱입니다.</Text>
        </View>
        <View style={styles.introContainer}>
          <Image source={logo} style={styles.image} />
          <Text style={styles.introTitleText}>국민을 위해 힘쓰는</Text>
          <Text style={styles.introTitleText}>당신이 '영웅'입니다.</Text>
          <Text style={{fontSize:15,marginTop:10}}>{`관리자 계정: ${adminName[adminCode]}`}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              props.navigation.reset({ routes: [{ name: "TopTabs" }] })
            }
          >
            <Text style={styles.buttonText}>시작하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: conColor,
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
    color: "black",
    //marginTop: 50,
  },
  introContainer: {
    backgroundColor: "white",
    borderRadius: 20,
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
    backgroundColor: "#071462",
    borderRadius: 20,
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