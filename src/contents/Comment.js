import React, { useState, useEffect } from 'react';
import { SafeAreaView ,Text, View, ScrollView, StyleSheet, TouchableOpacity, 
        KeyboardAvoidingView, Platform, Button, Image, RefreshControl, TextInput } from 'react-native';
import { database,storage } from "../../firebase";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ref, set, update, child } from 'firebase/database';
import * as ImagePicker from "expo-image-picker";
import { onValue, push, remove } from "firebase/database";
import { showAlert,closeAlert } from 'react-native-customisable-alert';
import {
    ref as ref_storage,
    uploadBytes,
    getDownloadURL,
    
  } from "firebase/storage";
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


export const Comment = (props) => {

    // const report = props.route.params.report;
    const report=props.report
    const [images,setImages]=useState([]);
    const [preImages,setPreImages]=useState([]);
    useEffect(()=>{
        // console.log(props.route.params)
        setPreImages(JSON.parse(report.processImage));
    },[])


    const [content, setContent] = useState(report.processText);
    const [cameraStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [mediaStatus, requestMediaPermission] =
    ImagePicker.useMediaLibraryPermissions();
    const updateReportProcess = async (report, newText) => { //과정 업데이트 해주는거
        const dbRef = ref(database);
        const reportsRef = child(dbRef, `reports/${report.uid}`);
        await update(reportsRef, { processText: newText });
    };
    const updateReportProcessImages = async (report, urls) => { //과정 업데이트 해주는거
        const dbRef = ref(database);
        const reportsRef = child(dbRef, `reports/${report.uid}`);
        await update(reportsRef, { processImage: urls });
    };
    const handleSave = async (images) => {
        await updateReportProcess(report, content);
        const downloadUrls=await uploadImage(images);
        await updateReportProcessImages(report, JSON.stringify(downloadUrls));
        report.processText=content;
        // props.navigation;
    };



    const updateReportState = async (report, newState) => {//상태 업데이트 해주는거
        const dbRef = ref(database);
        const reportsRef = child(dbRef, `reports/${report.uid}`);
        await update(reportsRef, { state: newState });
      };

    const handlePost = async (report, nextState) => {
        await updateReportState(report, nextState);
        props.navigation.navigate('Mainscreen');
    };

    return (
    //   <KeyboardAvoidingView
    //     behavior={Platform.OS === "ios" ? "padding" : "height"}
    //     style={styles.container}
    //     keyboardVerticalOffset={50}
    //   >
        <ScrollView style={{ width:"100%" }} keyboardShouldPersistTaps="handled">
          <SafeAreaView>
            <View style={styles.title}>
              <Text style={styles.titletext}>조치 사항</Text>

              <TouchableOpacity style={styles.button} onPress={()=>{handleSave(images)}}>
                <View style={styles.send}>
                  <Icon name="save" size={50} color="#000000" />
                  <Text style={styles.sendTenxt}>저장하기</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.title2}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ width: "100%", maxHeight: 100, marginVertical: 10 }}
              contentContainerStyle={{
                maxHeight: 100,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (images.length > 4) {
                    showAlert({
                      alertType: "custom",
                      dismissable: true,
                      customAlert: (
                        <View style={styles.alertText}>
                          <Text>사진은 4장까지만 추가 가능합니다!</Text>
                        </View>
                      ),
                    });
                    return;
                  }
                  showAlert({
                    alertType: "custom",
                    dismissable: true,
                    customAlert: (
                      <View
                        style={{
                          width: 300,
                          height: 200,
                          elevation: 2,
                          backgroundColor: "white",
                          borderRadius: 30,
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          color={"powderblue"}
                          title={"사진 촬영"}
                          onPress={async () => {
                            if (!cameraStatus.granted) {
                             await requestCameraPermission();
                            }
                          try{
                            const imageUri = await takePic();
                            
                            if(imageUri){
                              setImages((prev) =>{return [...prev, imageUri]});
                              closeAlert();
                            }
                            
                          } catch{

                          }
                            
                          }}
                        />
                        <Button
                          color={"powderblue"}
                          title={"이미지 선택"}
                          onPress={async () => {
                            if (!mediaStatus.granted) {
                              await requestMediaPermission();
                            }

                            
                            try{
                              const imageUri = await pickImage();
                              // console.log(imageUri);
                              if(imageUri){
                                setImages((prev) =>{return [...prev, imageUri]});
                                closeAlert();
                              }
                              // console.log(images);
                             
                            } catch{
  
                            }
                          }}
                        />
                      </View>
                    ),
                  });
                }}
              >
                <View
                  style={{
                    width: 80,
                    height: 80,
                    backgroundColor: "gray",
                    borderRadius: 15,
                    alignItems: "center",
                    justifyContent: "center",
                    marginHorizontal: 5,
                  }}
                >
                  <Text style={{ fontSize: 20 }}>+</Text>
                </View>
              </TouchableOpacity>
              {images.map((uri) => {
                //이미지 띄우기
                //   console.log(uri);
                return (
                  <Image
                    source={{ uri: uri }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 15,
                      marginHorizontal: 5,
                    }}
                    resizeMode="stretch"
                  />
                );
                //일단 삭제 기능은 나중으로 미루기.
              })}{preImages.map((uri) => {
                //이미지 띄우기
                //   console.log(uri);
                return (
                  <Image
                    source={{ uri: uri }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 15,
                      marginHorizontal: 5,
                    }}
                    resizeMode="stretch"
                  />
                );
                //일단 삭제 기능은 나중으로 미루기.
              })}
            </ScrollView>
            </View>
            <View style={styles.contentcontainer}>
              <TextInput
                style={styles.content}
                placeholder="조치된 내용을 입력해 주세요"
                onChangeText={(text) => setContent(text)}
                value={content}
                ref={(input) => (contentInput = input)}
                returnKeyType="done"
                multiline={true}
                // numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </SafeAreaView>
        </ScrollView>
    //   {/* </KeyboardAvoidingView> */}
    );
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        // height:"90%",
        backgroundColor:"white"
    },
    send:{
        marginLeft: 75,
        marginRight:5,
        alignItems:"center",
    },
    send2:{
        marginLeft:10,
        alignItems:"center",
    },
    sendTenxt:{
        fontSize:12,
        fontWeight:"bold",
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
        height:130,
        backgroundColor:"powderblue",
        borderRadius:10,
        marginLeft:16,
        marginTop: 5,
    },
    titletext2:{
        fontSize:27,
        fontWeight:"bold",
    },
    contentcontainer:{
        width:"91%",
        height:300,
        flex:1,
        backgroundColor:"#D9D9D9",
        borderRadius:10,
        marginLeft:17,
        marginTop:30,
        justifyContent:"flex-start"
    },
    content:{
        height:"100%",
        fontSize:17,
        marginTop:3,
        marginLeft:10,
        marginRight:5,
        marginBottom:5,
        padding:10,
    }
});