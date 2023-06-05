import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    NativeModules,
    LayoutAnimation,
    useWindowDimensions
  } from "react-native";
  // import { mainColor } from "../constants/colors";
  import { useState } from "react";
import { showAlert } from "react-native-customisable-alert";
  
  const { UIManager } = NativeModules;
  
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
  
  export const PopUpCard = (props) => {
    const [isSelected, setIsSelected] = useState(false);
    const {width,height}=useWindowDimensions()
    return (
      <View style={{alignItems:"center"}}>
      <TouchableOpacity
        disabled={props.disableTouch}
        onPress={() => {
  
          isSelected
            ? LayoutAnimation.configureNext({
                duration: 300,
                update: { delay: 200, type: "spring", springDamping: 2 },
                delete: {
                  type: "linear",
                  duration: 90,
                  delay: 0,
                  property: "opacity",
                },
              })
            : LayoutAnimation.spring();
          showAlert({
            alertType:"custom",
            customAlert:(
               < View
            style={{
              width: width*0.8,
              height:height*0.8,
              alignItems: "center",
              ...styles.popUp,
            }}
            pointerEvents="box-none"
          >
                {props.children}
                </View>
            ),
            dismissable:true
          })
        }}
        style={{ alignItems: "center", marginVertical: 10 }}
      >
        <View
          style={{
            width: props.buttonWidth,
            height: props.buttonHeight,
            ...styles.buttonStyle,
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}> {props.title} </Text>
        </View>
        </TouchableOpacity>
        {isSelected ? 
          <View
            style={{
              width: width*0.8,
              height:height*0.8,
              alignItems: "center",
              ...styles.popUp,
            }}
            pointerEvents="box-none"
          >
            <Text style={{ fontSize: 15, margin: 10, textAlign: "center" }}>
              {props.description}
            </Text>
            
          </View> : null}
  
      
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    buttonStyle: {
      backgroundColor: "powderblue",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    popUp: {
      backgroundColor: "white",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      padding: 5,
      elevation:1,
    },
  });
  