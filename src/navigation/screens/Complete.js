import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button1 from '../../../CustomButtons/Button1';
import { ScrollView } from 'react-native-gesture-handler';


export const Complete= (props) => {
      return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.title}><Text>민원을 접수했습니다!</Text></View>
        <View style={styles.content}></View>
        <View style={styles.footer}>
          <Button1           
            buttonColor={'#9F8BEF'}
            title={'돌아가기!'}
            onPress={() => props.navigation.navigate("BottomTabs") }/>
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