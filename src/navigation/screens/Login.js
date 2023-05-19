//로그인 하여 홈으로 들어가는 페이지 입니다.
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button1 from '../../../CustomButtons/Button1';
import { ScrollView } from 'react-native-gesture-handler';


export const Login = (props) => {
      return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.title}></View>
        <View style={styles.content}><Text>민원 사진이 들어갈 위치 입니다.</Text></View>
        <View style={styles.footer}>
          <Button1           
            buttonColor={'#023e71'}
            title={'로그인'}
            onPress={() => props.navigation.navigate("Login2") }/>
      </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    width:'100%',
    height:'9%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    width:'100%',
    height:'18%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  footer: {
    width:'100%',
    height:'10%',
    backgroundColor: '#ffffff',
  },
});