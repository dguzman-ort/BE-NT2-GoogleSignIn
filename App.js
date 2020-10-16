import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
// import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

// GoogleSignin.configure({
//   webClientId: '198056780059-cuunk2bi9oo7q5ek9hcsde2h74n96bcj.apps.googleusercontent.com',
// });

import * as Google from 'expo-google-app-auth';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      {/* Asi seria con un boton normal */}
      {/* <Button
        title="Google Sign in"
        onPress={() => signInWithGoogleAsync()}

      /> */}

      {/* Asi seria con un TouchableOpacity que permite agregar varios elementos para que sean "touchables" */}
      {/* En este ejemplo yo les puse una simple imagen para Google Sign In */}
      <TouchableOpacity
        style={styles.buttonGPlusStyle}
        activeOpacity={0.5}
        onPress={() => signInWithGoogleAsync()}
        >
        <Image
          source={require('./assets/btn_google_signin.png')}
          style={styles.buttonImageIconStyle}
        />
      </TouchableOpacity>
    </View>
  );
}

async function signInWithGoogleAsync() {
  console.log("Inicia logueo... ")
  try {
    const config = {
      // Se tiene que configurar un clientID para una App en iOS (pueden usar esta que estara disponible hasta el 31 de octubre)
      iosClientId: `33860000961-hc93104d0s5ovs1t7jmcapdkvrdefu82.apps.googleusercontent.com`,
      // Se tiene que configurar un clientID para una App en Android (pueden usar esta que estara disponible hasta el 31 de octubre)
      androidClientId: `33860000961-un4ghka1k2sepcnj4gvqeoge4bndf25k.apps.googleusercontent.com`,
    };

    const result = await Google.logInAsync(config);
    console.log("Result: ", result)
    const { type, accessToken } = result;

    if (type === 'success') {
      /* Log-Out */
      await Google.logOutAsync({ accessToken, ...config });
      /* `accessToken` is now invalid and cannot be used to get data from the Google API with HTTP requests */
    }
  } catch (e) {
    console.error("Error: ", e)
    return { error: true };
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGPlusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 5,
    margin: 50,
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    width: 260,
    height: 80,
    resizeMode: 'stretch',
  },
});
