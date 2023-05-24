import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  NativeModules,
  LayoutAnimation,
} from "react-native";
// import { mainColor } from "../constants/colors";
import { useState } from "react";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export const DropDownCard = (props) => {
  const [isSelected, setIsSelected] = useState(false);
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
        setIsSelected((prev) => !prev);
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
            width: props.buttonWidth * 0.9,
            alignItems: "center",
            ...styles.dropDown,
          }}
          pointerEvents="box-none"
        >
          <Text style={{ fontSize: 15, margin: 10, textAlign: "center" }}>
            {props.description}
          </Text>
          {props.children}
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
  dropDown: {
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 5,
    elevation:1,
  },
});
