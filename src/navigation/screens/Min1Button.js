import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useState, useEffect } from 'react';
import { database } from '../../../firebase';
import { ref, child, onChildAdded } from 'firebase/database';




const Min1Button = (props) => {

  const reports = [];

  const repref = child(ref(database), 'reports');
  onChildAdded(repref, (snapshot) => {
      reports.push(snapshot.val());
  });

  
  return (
    <View style={styles.item}>
      <View style={styles.item}>
          <View style={styles.itemLeft}>
             <View>
              <Image source = {{uri:JSON.parse(reports[1].photo)[0],}} style = {styles.square}/>
             </View>
          </View>                                
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'powderblue',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginLeft:10,
    marginRight:10,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    
  },
  square: { //여기에 이미지가 들어감
    width: 130,
    height: 130,
    borderRadius: 5,
    marginRight: 15,
    //backgroundColor:"white",
  },
  itemText: {
    maxWidth: '80%',
  },
});

export default  Min1Button;