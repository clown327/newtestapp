import React, {useContext,useState, useEffect, useRef} from "react";
import { NavigationContainer } from "@react-navigation/native";
import {CNavigation} from "./src/navigation/CNavigation";
import {View, Text} from 'react-native';
import CustomisableAlert from "react-native-customisable-alert";
import { Context } from "./Context";
import 'expo-dev-client';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as TaskManager from "expo-task-manager";
import {useFonts} from 'expo-font'

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({ data, error, executionInfo }) => {
  console.log('Received a notification in the background!');
  // Do something with the notification data
  // Notifications.scheduleNotificationAsync({
  //   content: {
  //     title: "Background recieve.",
  //     body: 'hmm',
  //     data: { data: 'goes here' },
  //   },
  //   trigger: { seconds: 2, repeats:false },
  // });
});


Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
}); 

export default function App()
{
  const [cityContext,setCityContext]=useState("");
  const [fontsLoaded] = useFonts({
    'armyBold': require('./assets/fonts/Army-Bold.ttf'),
    'army':require('./assets/fonts/Army-Medium.ttf'),
    "goL":require('./assets/fonts/goL.ttf'),
    "goB":require('./assets/fonts/goB.ttf'),
    "goM":require('./assets/fonts/goM.ttf'),
    "suiteB":require('./assets/fonts/SUITE-Bold.ttf'),
    "suiteM":require('./assets/fonts/SUITE-Medium.ttf'),
    "suiteL":require('./assets/fonts/SUITE-Light.ttf'),
  });

  const notificationListener = useRef();
  useEffect(() => {

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      // Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Context.Provider value={[cityContext, setCityContext]}>
      <View style={{ flex: 1 }}>
        <CNavigation />
        <CustomisableAlert />
      </View>
    </Context.Provider>
  );
}

//const style = StyleSheet.create({});