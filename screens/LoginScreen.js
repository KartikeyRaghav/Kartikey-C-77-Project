import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase'
export default class LoginScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      emailId: '',
      password: ''
    }
  }

  login = async (email, password) => {
    if (email && password) {
      try {
        const response = await firebase.auth().signInWithEmailAndPassword(email, password)
        if (response) {
          alert('User Successful Login.')
        }
      }
      catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            alert("user dosen't exists")
            console.log("doesn't exist")
            break
          case 'auth/invalid-email':
            alert('incorrect email or password')
            console.log('invaild')
            break
        }
      }
    }
    else {
      alert('enter email and password');
    }
  }

  signUp = async (email, password) => {
    if (email && password) {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
      if (response) {
        alert('User Successful Sign Up.')
      }
    }
    else {
      alert('enter email and password');
    }
  }
  render() {
    return (
      <KeyboardAvoidingView style={{ alignItems: 'center', marginTop: 20 }}>
        <View>
          <Image
            source={require("../assets/Barter.png")}
            style={{ width: 259, height: 194 }} />
          <Text style={{ textAlign: 'center', fontSize: 30 }}>Barter App</Text>
        </View>
        <View>
          <TextInput
            style={styles.loginBox}
            placeholder="Email address"
            keyboardType='email-address'
            onChangeText={(text) => {
              this.setState({
                emailId: text
              })
            }}
          />

          <TextInput
            style={styles.loginBox}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => {
              this.setState({
                password: text
              })
            }}
          />
        </View>
        <View>
          <TouchableOpacity style={{ height: 30, width: 90, borderWidth: 1, marginTop: 20, paddingTop: 5, borderRadius: 7 }}
            onPress={() => { this.login(this.state.emailId, this.state.password) }}>
            <Text style={{ textAlign: 'center' }}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ height: 30, width: 90, borderWidth: 1, marginTop: 20, paddingTop: 5, borderRadius: 7 }}
            onPress={() => { this.signUp(this.state.emailId, this.state.password) }}>
            <Text style={{ textAlign: 'center' }}>Sign Up</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    )
  }

}

const styles = StyleSheet.create({
  loginBox:
  {
    width: 300,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10
  }
})