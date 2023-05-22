import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,ScrollView } from 'react-native';
import roka from "./../../../assets/rokalogo.png";

export const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (props) => {
    // Handle login logic here
  };

  return ( 
 
    <View style={styles.container}>
     
      <Image source = {roka} style={styles.image}/>
      <Text style={styles.title}>관리자 로그인</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("Login2")}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
     
    </View> 
    
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    margintop: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '80%',
    height: 48,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#1E90FF',
    width: '80%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Login;