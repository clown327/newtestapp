import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { database } from './../../firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ref, push, set, getDatabase, child } from 'firebase/database';
import { darkGreen, lightGreen, shadowGreen,darkLoafer, buttonGreen, darkCello, cello } from '../../color';
import { LinearGradient } from 'expo-linear-gradient';
// import { ceil } from 'react-native-reanimated';
const dbRef = ref(database);
const noticesRef = child(dbRef, 'notices');

export const Writenoti = (props) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const Post = async () => {
    const newNoticeRef = push(noticesRef);

    const date1 = new Date(Date.now()); //시간이 들어가야하는 경우에는 이 3줄 넣어서 date 업로드 해주기 
    const date = date1.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' }) + ' ' + 
                  date1.toLocaleTimeString('en-GB', { timeZone: 'Asia/Seoul' }); 
    //const newkey = newNoticeRef.key;
    set(newNoticeRef, {
      content: content,
      date: date,
      title: title,
      uid: newNoticeRef.key
    });
    props.navigation.navigate('Home');
  };

  return (
    <View style={{flex:1,height:"100%",width:"100%"}}>
       <LinearGradient
         colors={[cello, "rgba(255, 255, 255, 1)"]}
         start={{ x: 0.5, y: 1 }}
         end={{ x: 0.5, y: 0 }}
         locations={[0, 0.9]}
      style={{ position:"absolute",flex:1,width:"100%",height:"100%",opacity:0.95}}
    ></LinearGradient>
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      
      <View style={styles.container2}>
        <View style={styles.title}>
          <Text style={styles.titletext}>공지사항 작성</Text>
          <TouchableOpacity style={styles.button} onPress={Post}>
            <View style={styles.send}>
              <Icon name="done" size={50} color={buttonGreen} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.title2}>
          <TextInput
            style={styles.content1}
            placeholder="제목을 입력 주세요"
            onChangeText={(text) => setTitle(text)}
            value={title}
            ref={(input) => (titleInput = input)}
            returnKeyType="done"
            multiline={true}
            numberOfLines={1}
          />
          <View style={styles.imagecontainer}></View>
        </View>
        <View style={styles.contentcontainer}>
          <TextInput
            style={styles.content2}
            placeholder="내용을 입력해 주세요"
            onChangeText={(text) => setContent(text)}
            value={content}
            ref={(input) => (contentInput = input)}
            returnKeyType="done"
            multiline={true}
            numberOfLines={4}
          />
        </View>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'white',
    flex:1,
  },
  container2:{
  },

  send: {
    // marginLeft: 110,
    
  },
  title: {
    width: '100%',
    height: 60,
    marginVertical: 13,
    flexDirection: 'row',
    justifyContent:"space-between",
    paddingHorizontal:20
  },
  titletext: {
    fontSize: 27,
    // fontWeight: 'bold',
    fontFamily:"suiteB",
    margin: 10,
    alignSelf:"center",
    color:darkCello
  },
  imagecontainer: {},

  inputContainer: {
    width: '90%',
    padding: 10,
    height: 60,
    backgroundColor: 'powderblue',
    borderRadius: 10,
    marginLeft: 16,
    marginTop: 20,
  },
  input: {
    fontSize: 27,
    fontWeight: 'bold',
  },
  title2: {
    width: '91%',
    padding: 10,
    height: "100%",
    flex:1,
    // backgroundColor: shadowGreen,
    borderRadius: 10,
    borderColor:darkGreen,
    borderWidth:2,
    marginLeft: 16,
    marginTop: 10,
    justifyContent:"center",
    // alignItems:"center"
  },
  titletext2: {
    fontSize: 24,
    fontWeight: 'bold',
    // textAlign:"center",
    width:"100%"
  },
  contentcontainer: {
    width: '91%',
    height: 300,
    flex: 1,
    backgroundColor: lightGreen,
    borderRadius: 10,
    // marginLeft: 17,
    alignSelf:"center",
    marginTop: 20,
    padding:10
  },
  content1: {
    fontSize: 18,
    // marginTop: 3,
    // marginLeft: 10,
    // marginRight: 5,
    // marginBottom: 5,
    fontFamily:"suiteB",
    width:"100%",
    textAlign:"center"
  },
  content2: {
    fontSize: 18,
    // marginTop: 3,
    // marginLeft: 10,
    // marginRight: 5,
    // marginBottom: 5,
    fontFamily:"suiteL",
    width:"100%",
  },
});
