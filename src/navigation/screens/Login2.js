import React from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import roka from "../../../assets/rokalogo.png"

export default function Login2(props) {
    console.disableYellowBox = true;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                국민 국방 안전 신고앱에 오신것을 환영 합니다.
            </Text>
            <View style={styles.introContainer}>
                <Image
                    source={ roka }
                    style={styles.image} />
                <Text style={styles.introTitleText}>
                    이곳은 관리자 페이지 입니다.
                </Text>
                <Text style={styles.introdescText}>
                    국민을 위해 힘쓰시는 당신이 영웅입니다.
                </Text>
                <TouchableOpacity style={styles.button} onPress = {() => props.navigation.navigate("Home")}>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginTop: 50,
  },
  introContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 500,
    marginTop: 40,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 30,
  },
  introTitleText: {
    width: 250,
    fontSize: 20,
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
  },
});