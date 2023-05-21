//접수된 민원을 보여주는 곳입니다.
import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { SliderBox } from 'react-native-image-slider-box';



export const Min1 =(props) => {
    return (
        
    <SafeAreaView style = {styles.container}>
    <View >
      <View>
        <Text style = {styles.Text}>
            옆집 차은우
        </Text>
        <Text>
            민원 유형
        </Text>
        <SliderBox 
          images={[
              "https://source.unsplash.com/1024x768/?nature", // Network image
              "https://source.unsplash.com/1024x768/?water",  // Network image
              "https://source.unsplash.com/1024x768/?girl",   // Network image
              "https://source.unsplash.com/1024x768/?tree"    // Network image
              //require('./assets/images/girl.jpg')           // Local image
          ]}   sliderBoxHeight={350}
          dotColor="#3785F9"
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={20}
          resizeMethod={'resize'}
          resizeMode={'cover'}
          paginationBoxStyle={{
            position: "absolute",
            bottom: 0,
            padding: 0,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            paddingVertical: 10
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            backgroundColor: "rgba(128, 128, 128, 0.92)"
          }}
          ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
          imageLoadingColor="#2196F3" 
            />
        </View> 
        <View styles={styles.container1}>
            <Text style = {styles.textcontainer}>
                안녕하세요 이곳에는 민원 관련한 내용들이 들어갈 곳입니다.
                안녕하세요 이곳에는 민원 관련한 내용들이 들어갈 곳입니다.
                안녕하세요 이곳에는 민원 관련한 내용들이 들어갈 곳입니다.
                안녕하세요 이곳에는 민원 관련한 내용들이 들어갈 곳입니다.
                안녕하세요 이곳에는 민원 관련한 내용들이 들어갈 곳입니다.
                안녕하세요 이곳에는 민원 관련한 내용들이 들어갈 곳입니다.
                안녕하세요 이곳에는 민원 관련한 내용들이 들어갈 곳입니다.
                안녕하세요 이곳에는 민원 관련한 내용들이 들어갈 곳입니다.
                안녕하세요 이곳에는 민원 관련한 내용들이 들어갈 곳입니다.
                안녕하세요 이곳에는 민원 관련한 내용들이 들어갈 곳입니다.
            </Text>
            <View style ={ styles.buttoncontainer}>
            <TouchableOpacity TouchableOpacity style={styles.textContainer2} onPress={() => props.navigation.navigate("Complete")}>
                <Text style = {styles.Text2}>
                    접수하기
                </Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width:"100%",
        height:"100%",
        backgroundColor:"white",

    },
    textcontainer:{
        
        margin:10,

    },
    textContainer2: {
        width:"95%",
        height:80,
        margin:10,
        backgroundColor: "#9F8BEF",
        borderRadius: 20,
    },
    buttoncontainer: {


    },
    Text:{
        fontSize:25,

    },
    Text2: {
        fontSize:30,
        textAlign:"center",
        marginTop:19,
        color: "white",

    },
    container1:{
        flex:1,
    },
    images: {
        width:"100%",
        height:200,
    },

});
