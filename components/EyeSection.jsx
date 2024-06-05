import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import EyeCam from '../assets/eyeCam.png';

const EyeSection = props => {
  const {setLeftUri, setRightUri} = props;
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
          },
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

  const upload = side => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
    })
      .then(image => {
        if (side === 'right') {
          setRightImageUri(image.path);
          setRightUri(image.path);
        } else if (side === 'left') {
          setLeftImageUri(image.path);
          setLeftUri(image.path);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Eye Images</Text>
      <View style={styles.imageButtonContainer}>
        <View style={styles.imageButtonWrapper}>
          <Image
            source={leftImageUri ? {uri: leftImageUri} : EyeCam}
            style={styles.image}
          />
          <TouchableOpacity
            style={styles.imageBtn}
            onPress={() => upload('left')}>
            <Text style={styles.imageBtnText}>Left Image</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageButtonWrapper}>
          <Image
            source={rightImageUri ? {uri: rightImageUri} : EyeCam}
            style={styles.image}
          />
          <TouchableOpacity
            style={styles.imageBtn}
            onPress={() => upload('right')}>
            <Text style={styles.imageBtnText}>Right Image</Text>
          </TouchableOpacity>
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
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 27,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#134687',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  imageButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  imageButtonWrapper: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  image: {
    height: 120,
    width: 120,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 60,
  },
  placeholder: {
    height: 120,
    width: 120,
    backgroundColor: '#B2DFDB',
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#004D40',
  },
  imageBtn: {
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#134687',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    minWidth: 100,
  },
  imageBtnText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default EyeSection;
