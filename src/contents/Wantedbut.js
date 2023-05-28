import React, { useState } from 'react';
import { SafeAreaView ,Text, View, ScrollView, StyleSheet, TouchableOpacity, 
        KeyboardAvoidingView, Platform, Button, Image, RefreshControl, TextInput } from 'react-native';
import { database, storage } from "../../firebase";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ref, push, set, getDatabase, child, unshift } from 'firebase/database';
import * as ImagePicker from "expo-image-picker";
import {
    ref as ref_storage,
    uploadBytes,
    getDownloadURL,
    
  } from "firebase/storage";



const dbRef = ref(database);
const bountiesRef = child(dbRef, 'bounties'); 
/*
const pickImage = async () => {
    //verify permmision
    const mediaPermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (mediaPermission.status !== "granted") {
      console.log("library permission not granted");
      return;
    }
    //use ImagePicker api to get image uri
    let image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: "Images",
    });
    // getPendingResultAsync는 어떻게 사용되는지 모르겠음
    //if cancelled return
    if (image.canceled) return;
    //   if not cancled return uri
    // console.log(image);
    return image.assets[0].uri;
  };
  
  const takePic = async () => {
    //verify permmision
    const cameraPermission = await ImagePicker.getCameraPermissionsAsync();
  
    if (cameraPermission.status !== "granted") {
      console.log("camera permission not granted");
      return;
    }
    //use ImagePicker api to get image uri
    let image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      mediaTypes: "Images",
    });
    //if cancelled return
    if (image.canceled) return;
    //if not cancled return uri
    //   console.log(image);
    return image.assets[0].uri;
  };
  
  const uploadImage = async (imageUri) => {
    //return download url
    if (imageUri.length === 0) {
      return [];
    } else {
      const downloadUrls = [];
      for (const uri of imageUri) {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
        const imgRef = child(ref(database), "allImages/");
        const imageId = push(imgRef).key;
        const fileRef = ref_storage(storage, `images/${imageId}.jpeg`);
        const result = await uploadBytes(fileRef, blob, {
          contentType: "image/jpeg",
        });
        const downloadUrl = await getDownloadURL(fileRef);
  
        downloadUrls.push(downloadUrl);
        // console.log(`downloadurls:${downloadUrls}`)
        //need to get downloadableBytes.
        // We're done with the blob, close and release it
        blob.close();
      }
  
      return downloadUrls;
    }
  };
  */

export const Wantedbut = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [position, setposition] = useState('');

    const Post = async () => {
        const newbountie = push(bountiesRef);

        const date1 = new Date(Date.now()); //시간이 들어가야하는 경우에는 이 3줄 넣어서 date 업로드 해주기 
        const date = date1.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' }) + ' ' + 
                      date1.toLocaleTimeString('en-GB', { timeZone: 'Asia/Seoul' }); 
        set(newbountie, {
            content: content,
            date: date,
            pos: position,
            title: title,
            uid:newbountie.key
        });
        props.navigation.navigate('Shared');
    };


    return(
        <ScrollView
            style={styles.container}
            keyboardShouldPersistTaps='handled'>
            <View style={styles.container2}>
                <View style={styles.title}>
                    <Text style={styles.titletext}>수배</Text>
                    <TouchableOpacity style={styles.button} onPress={Post}>
                        <View style={styles.send}>
                            <Icon name="done" size={50} color="#000000" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.title2}>
                <TextInput
                    style={styles.input}
                    placeholder="수배 내용을 적어주세요"
                    onChangeText={text => setTitle(text)}
                    value={title}
                    returnKeyType="done"
                    onSubmitEditing={() => contentInput.focus()}
                    singleLine={true}
                />
                </View>
                <View style={styles.contentcontainer}>
                <TextInput
                    style={styles.content}
                    placeholder="위치를 입력해 주세요"
                    onChangeText={text => setposition(text)}
                    value={position}
                    ref={input => contentInput = input}
                    returnKeyType="done"
                    multiline={true}
                    numberOfLines={1}
                />
                </View>
                <View style={styles.contentcontainer}>
                <TextInput
                    style={styles.content}
                    placeholder="세부사항을 입력해주세요"
                    onChangeText={text => setContent(text)}
                    value={content}
                    ref={input => contentInput = input}
                    returnKeyType="done"
                    multiline={true}
                    numberOfLines={4}
                />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        backgroundColor:"white"
    },
    send:{
        marginLeft: 220,
    },
    container2:{
        marginTop:50,
      },
    
    title:{
        width:"100%",
        height:60,
        margin:13,
        //backgroundColor:"blue",
        flexDirection:"row"
    },
    titletext:{
        fontSize:27,
        fontWeight:"bold",
        margin:10,
    },
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
    title2:{
        width:"91%",
        padding:10,
        height:60,
        backgroundColor:"powderblue",
        borderRadius:10,
        marginLeft:16,
        marginTop: 20,
    },
    titletext2:{
        fontSize:27,
        fontWeight:"bold",
    },
    contentcontainer:{
        width:"91%",
        height:"100%",
        flex:1,
        backgroundColor:"#D9D9D9",
        borderRadius:10,
        marginLeft:17,
        marginTop:30,
    },
    content:{
        fontSize:17,
        marginTop:3,
        marginLeft:10,
        marginRight:5,
        marginBottom:5,
    }
});