import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function MyCheckbox(props) {
  
  const [checked, setChecked] = useState(props.initCheck);
  return (
    <Pressable
    disabled={props.disabled}
      style={[styles.checkboxBase, checked && styles.checkboxChecked, props.disabled&&styles.disabled]}
      onPress={() => {props.checkFunction(!checked); setChecked(!checked); }}>
      {checked && <Ionicons name="checkmark" size={20} color="white" />}
    </Pressable>
  );
}


const styles = StyleSheet.create({
  disabled:{
    backgroundColor: 'gray',
  },
  checkboxBase: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'coral',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: 'coral',
  },
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    marginVertical: 16,
    fontWeight: 'bold',
    fontSize: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: 500,
    fontSize: 18,
  },
});