import {Text, View} from 'react-native'
import React from 'react'
import { GoogleSignin, GoogleSigninButton, } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const Googlesign = () => {
    // initialize the Google SDK
    const signInWithGoogleAsync = async () => {
        GoogleSignin.configure({
            scopes: [],
            webClientId: '148269276907-1v5gb8bl92s8pogoa1qrtvh9v8cjcqrb.apps.googleusercontent.com',
            offlineAccess: true,
        });
        // Get the users ID token
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("userInfo", userInfo)
            const { idToken } = await GoogleSignin.signIn();
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential);
        } catch (error) {
            console.log({ error });
        }
    }
    return (
        <View style={{
            flex: 1, justifyContent: "center",
            alignItems: "center",
            backgroundColor: '#add9e6'
        }}>
            <Text style={{ fontSize: 25, color: "black", position: "absolute", top: 15, fontWeight: "bold" }}>Google signin</Text>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signInWithGoogleAsync}
            />
        </View>
    )
}

export default Googlesign;
