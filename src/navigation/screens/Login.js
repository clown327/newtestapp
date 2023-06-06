import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { showAlert } from 'react-native-customisable-alert';
import { Context } from '../../../Context';
//import { Shared } from './Shared';
import logo from "../../../assets/logo.jpg"
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { database } from '../../../firebase';
import { push, ref, child, set, get} from 'firebase/database';
import { LinearGradient } from 'expo-linear-gradient';
import { darkCello, darkGreen, deco } from '../../../color';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const uploadToken = async (token) => {
  let initialTokens;
  const tokenRef = ref(database, "tokens");
  await get(tokenRef).then((snapshot)=>{
    if(snapshot.exists()){
      initialTokens=snapshot.val();
    } else{
      initialTokens="[]"
    }
  })
  // const newKey = push(tokenRef).key;
  const newTokens=JSON.parse(initialTokens);
  if(!newTokens.includes(token)){
    newTokens.push(token);
  }
  const uploading = await set(ref(database, "tokens/" ), JSON.stringify(newTokens)).catch(
    (error) => {
      console.log(error);
      if (error) {
        throw new Error(error);
      }
    }
  );
  console.log("uploaded token")
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
// ["화성시","평택시","안산시","안양시"]
// 69 평택, 화성 68 사단, 67 안산, 군단 안양
const cities=["","안양시","화성시","안산시","화성시","화성시"]
export const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [context,setContext]=useContext(Context);
  const [expoPushToken, setExpoPushToken] = useState('');
  
  const handleLogin = async (username) => {
    // Handle login logic here
    const userNum = parseInt(username);
    if (userNum > 5 || userNum < 0) {
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
    }

    registerForPushNotificationsAsync().then(token => uploadToken(token));
    return true;
  };

  const handlePress =() => {
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
          {/* <Image source = {logo} style={styles.image}/>
          <Text style={styles.title}>관리자 로그인</Text> */}
          <LinearGradient
            colors={["rgba(40, 93, 104,0.7)", darkCello]}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            locations={[0, 0.8]}
            style={{
              position: "absolute",
              flex: 1,
              width: "100%",
              height: "120%",
            }}
          ></LinearGradient>
          <Text
            style={{
              fontFamily: "suiteL",
              fontSize: 18,
              color: deco,
              marginBottom: 5,
              borderBottomWidth: 1,
              borderColor: deco,
            }}
          >
            모두의 육군 주민 신고 앱
          </Text>
          <Text style={{ color: deco, fontSize: 70, fontFamily: "armyBold" }}>
            {" "}
            A R A{" "}
          </Text>
          <Text style={{ fontFamily: "goL", fontSize: 25, color: "white" }}>
            Army Report App
          </Text>
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (handleLogin(username)) {
                setContext(username);
                props.navigation.navigate("Login2");
              }
            }}
          >
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
    textAlign:"center",
    backgroundColor:"white"
  },
  button: {
    backgroundColor: darkGreen,
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