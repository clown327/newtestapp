import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { showAlert } from 'react-native-customisable-alert';
import { Context } from '../../../Context';
//import { Shared } from './Shared';
import logo from "../../../assets/logo.jpg"

// ["화성시","평택시","안산시","안양시"]
// 69 평택, 화성 68 사단, 67 안산, 군단 안양
const cities=["","안양시","화성시","안산시","화성시","평택시"]
export const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [context,setContext]=useContext(Context);
  const handleLogin = (username) => {
    // Handle login logic here
    const userNum=parseInt(username);
    if(userNum){
      if(userNum>5||userNum<0){
        showAlert({
          alertType: "custom",
          dismissable: true,
          customAlert: (
            <View style={styles.alertText}>
              <Text>잘못된 관리자 코드입니다!</Text>
            </View>
          ),
        });
        return false;
    } else{

      return true;
    }

    }
    return false;
  };

  const handlePress = () => {
    if(handleLogin(username)){
      setContext(cities[username]);
      Keyboard.dismiss(); // 키보드 내리기
      props.navigation.navigate("Login2");
    }
  }

  return ( 
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.inner}>
          <Image source = {logo} style={styles.image}/>
          <Text style={styles.title}>관리자 로그인</Text>
          <TextInput
            style={styles.input}
            placeholder="관리자 코드 번호 입력"
            value={username}
            onChangeText={setUsername}
            inputMode="numeric"
          />
          {/* <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          /> */}
          <TouchableOpacity style={styles.button} onPress={() => {
            if(handleLogin(username)){
              setContext(username);
              props.navigation.navigate("Login2");
            }
            }}>
            <Text style={styles.buttonText}>로그인</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginTop: 50,
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '80%',
    height: 48,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 18,
    textAlign:"center"
  },
  button: {
    backgroundColor: '#1E90FF',
    width: '80%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  alertText: {
    width: 250,
    height: 100,
    elevation: 2,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default Login;