

import { View, Text, StyleSheet, ScrollView,LayoutAnimation,NativeModules } from "react-native";
import { buttonGreen, mainColor, subColor1, subColor3 } from "../../color.js";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import MapView, {PROVIDER_GOOGLE,Marker} from "react-native-maps";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
export const Wantedview = (props) => {
  // console.log(props.route)
  const bountie = props.route.params.bountie;
  const [locationText, setLocationText] = useState("");
  const [locationPermission, setLocationPermission] = Location.useForegroundPermissions();
  const [coordLoaded,setCoordLoaded]=useState(false);
  const [coords,setCoords]=useState(null);
//   const getLocation= async (address) => {
//     if (!locationPermission.granted) {
//       await setLocationPermission();
//     }
//     const locationCoord =
//       await Location.geocodeAsync(address);
//     return locationCoord;
// }
 const setLocation=useCallback(async()=>{
    if (!locationPermission?.granted) {
        await setLocationPermission();
      }
      const locationCoord =
        await Location.geocodeAsync(bountie.pos);
    //  console.log(locationCoord);
    if(locationCoord.length>0){
      console.log(locationCoord)
      await setCoords(locationCoord);
      LayoutAnimation.spring();
      await setCoordLoaded(true);
    }
 
 })
  useEffect(()=>{
    setTimeout(()=>{
        setLocation();
    },1000)
  
  },[locationPermission])
  return (
    <View style={{ flex: 1, justifyContent:"flex-start", alignItems: "center",paddingTop:40,backgroundColor:"white" }}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{bountie.title}</Text>
      </View>
      <View style={styles.dateView}>
      <Text style={{color:subColor3,fontFamily:"suiteL"}} >{bountie.date}</Text>
      </View>
      {coordLoaded?<MapView 
      provider={PROVIDER_GOOGLE}
      style={{width:300,height:300}}
      initialRegion={
        {
            latitude: coords[0].latitude,
            longitude: coords[0].longitude,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0100,
        }
      }
      showsUserLocation={true}
      >
        <Marker 
        key={1}
        coordinate={{
            latitude: coords[0].latitude,
            longitude: coords[0].longitude,
        }}
        title={"수배 위치"}
        />
        </MapView>:<Text style={{height:100,textAlign:'center',fontFamily:"suiteL",textAlignVertical:"center",color:subColor3}}>지도표시 중...</Text>}
      <View style={styles.position}>
       <Text style={{color:subColor1,textAlign:"center",fontSize:16,fontFamily:"suiteB"}} >{"-수배 위치-\n"+bountie.pos}</Text>
      </View>
      <ScrollView style={styles.contentScroll}>
        <Text style={{fontFamily:"suiteM"}}>
            {bountie.content}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  titleView: {
    width: "80%",
    borderBottomColor: buttonGreen,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  dateView:{
    width:"80%",
    alignItems:"flex-end",
    marginBottom:15
  },
  titleText:{
    fontSize:18,
    fontFamily:"suiteB",
    textAlign:"center",
    marginBottom:5
  },
  contentScroll:{
    borderWidth:1,
    padding:20,
    borderColor:buttonGreen,
    borderRadius:10,
    maxHeight:250,
    width:"80%",
    backgroundColor:'white',
    elevation:3
  },
  dateView:{
    width:"80%",
    alignItems:"flex-end",
    marginBottom:15
  },
  position:{
    width:"100%",
    alignItems:"center",
    marginVertical:15,
  },
});
