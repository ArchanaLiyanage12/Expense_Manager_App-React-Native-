/* eslint-disable prettier/prettier */

import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Footer from '../../Components/Footer';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const ImageUploadScreen = () => {
  const [image, setImage] = useState(null);
  const [Uploading, setUploading] = useState(false);
  const [transfered, settransfered] = useState(null);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      console.log(image);
      //  setImage(image.path);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      console.log(image);

      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const submitPost = async ()=>{
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    setUploading(true);

    try {
      await storage().ref(filename).putFile(uploadUri);
      setUploading(false);
      Alert.alert(
        'image Uploaded',
        'Your Image has been uploaded to the firebase cloud storage'
      )

    } catch (e){
      console.log(e);
    }
    setImage(null);

  };

  return (
    <View style={{flex: 1, backgroundColor: '#add9e6'}}>
      <View style={{backgroundColor: 'yellow'}}>
        <Text style={style.head}> upload Image</Text>
      </View>
      <View style={{height: '56.9%'}}>
        <Text>image display here</Text>
      </View>
      <View style={style.ButtonContainer}>
        <TouchableOpacity style={style.btmCamera} onPress={takePhotoFromCamera}>
          <Text style={{textAlign: 'center', color: 'white', margin: '4%'}}>
            Take Photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.btngalery}
          onPress={choosePhotoFromLibrary}>
          <Text style={{textAlign: 'center', color: 'white', margin: '4%'}}>
            choose from galery
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.btmCamera} onPress={submitPost}>
          <Text style={{textAlign: 'center', color: 'white', margin: '4%'}}>
            submit post
          </Text>
        </TouchableOpacity>
      </View>
      <View style={style.FooterView}>
        <Footer screenName1="Resault" screenName2="Home" />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  head: {
    textAlign: 'center',
    fontFamily:'bold',
    fontSize:25,
  },
  btmCamera: {
    borderRadius: 10,
    backgroundColor: '#3291a8',
    width: '70%',
    marginLeft: '15%',
  },
  btngalery: {
    borderRadius: 10,
    backgroundColor: '#3291a8',
    width: '70%',
    marginLeft: '15%',
  },
  ButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '30%',
    backgroundColor: 'grey',
  },
  FooterView: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
});

export default ImageUploadScreen;
