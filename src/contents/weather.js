import * as Location from "expo-location";
import axios from "axios"
import { useState, useEffect } from "react";

export default function weather({navigation,route}) {
  console.disableYellowBox = true;

  const [state,setState] = useState([])
  const [cateState,setCateState] = useState([])
  const [ready,setReady] = useState(true)

  //날씨 데이터 상태관리 상태 생성!
  const [weather, setWeather] = useState({
    temp : 0,
    condition : ''
  })
  
  useEffect(()=>{
    setTimeout(()=>{
        let tip = data.tip;
        setState(tip)
        setCateState(tip)
        getLocation()
        setReady(false)
    },1000)
  },[])

  const getLocation = async () => {
    try {
      //자바스크립트 함수의 실행순서를 고정하기 위해 쓰는 async,await
      //권한 얻기
      await Location.requestPermissionsAsync();
      
      //현재 위치 정보 얻기
      const locationData= await Location.getCurrentPositionAsync();
      const latitude = locationData['coords']['latitude']		// 위도
      const longitude = locationData['coords']['longitude']		// 경도
      
      //날씨 정보 얻기
      const API_KEY = "cfc258c75e1da2149c33daffd07a911d";
      const result = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      const temp = result.data.main.temp; 
      const condition = result.data.weather[0].main
      
      console.log(temp)
      console.log(condition)

      setWeather({
        temp,condition
      })

    } catch (error) {
      Alert.alert("위치를 찾을 수가 없습니다.", "앱을 껏다 켜볼까요?");
    }
  }
