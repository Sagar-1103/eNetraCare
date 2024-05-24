import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, PermissionsAndroid, Platform, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const EyeSection = (props) => {
  const {setLeftUri,setRightUri} = props;
  const [rightImageUri, setRightImageUri] = useState(null);
  const [leftImageUri, setLeftImageUri] = useState(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const upload = (side) => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
    }).then((image) => {
      if (side === 'right') {
        setRightImageUri(image.path);
        setRightUri(image.path);
      } else if (side === 'left') {
        setLeftImageUri(image.path);
        setLeftUri(image.path);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eye Section</Text>
      <View style={styles.imageButtonContainer}>
        <View style={styles.imageButtonWrapper}>
          {leftImageUri && <Image source={{ uri: leftImageUri }} style={styles.image} />}
          {!leftImageUri && <View style={styles.placeholder} />}
          <Button title="Left Image" onPress={() => upload('left')} color="#4CAF50" />
        </View>
        <View style={styles.imageButtonWrapper}>
          {rightImageUri && <Image source={{ uri: rightImageUri }} style={styles.image} />}
          {!rightImageUri && <View style={styles.placeholder} />}
          <Button title="Right Image" onPress={() => upload('right')} color="#4CAF50" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  imageButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  imageButtonWrapper: {
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  placeholder: {
    height: 150,
    width: 150,
    backgroundColor: '#e0e0e0',
    borderRadius: 75,
    marginBottom: 10,
  },
});

export default EyeSection;
