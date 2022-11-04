import { View, StyleSheet, Button, Image, Alert} from 'react-native'
import React, {useState} from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const Camere = () => {

    const [image, setImage] =  useState(null);
    const [uploading, setUploading] =  useState(false);
    const [transferred, setTransfarred] =  useState(0);

    const takePhoto = () => {
        ImagePicker.openCamera({
            width: 224,
            height: 224,
            cropping: true,
          }).then(image => {
            console.log(image);
            setImage(image.path)
          });
    }

    const choosePhoto = () => {
        ImagePicker.openPicker({
            width: 224,
            height: 224,
            cropping: true
        }).then(image => {
            console.log(image);
            setImage(image.path)
            this.bs.current.snapTo(1)
        });
    }

    const submit = async () => {
      const uploadUri = image;
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

      setUploading(true);
      try {
        await storage().ref(filename).putFile(uploadUri);
        setUploading(false)
        Alert.alert(
          'Image Uploaded !'
        );
      } catch(e) {
        console.log(e);
      }
      setImage(null);
    }
  return (
    <View style={{flex:1, justifyContent:"center"}}>
      <Button style={style.btn} title='take' onPress={takePhoto}></Button>
      <Button title='choose' onPress={choosePhoto}></Button>
      <Image source={{uri:image,}} style={style.img}></Image>
      <Button title='Submit' onPress={submit}></Button>
    </View>
  )
}

const style = StyleSheet.create({
    btn:{
        backgroundColor:"red"
    },
    img: {
        height:200,
        width:200
    }
})

export default Camere