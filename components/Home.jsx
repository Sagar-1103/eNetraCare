import React,{useEffect} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity,PermissionsAndroid} from 'react-native';
import Logo from '../assets/Innovease_Logo.jpg';

function HomeScreen({navigation}) {
  const handleCategory = category => {
    navigation.navigate('License', {category: category});
  };
  useEffect(() => {
    perm();
  }, []);
  const perm = async () => {
    await requestCameraPermission();
    await requestStoragePermission();
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message:
            'This App needs access to your camera ' +
            'so you can take pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message:
            'App needs access to your storage ' +
            'so you can save photos and files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>Select a Category</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleCategory(1)}
        activeOpacity={0.7} // Adds the click effect
      >
        <Text style={styles.buttonText}>Category 1 (50 entries)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleCategory(2)}
        activeOpacity={0.7} // Adds the click effect
      >
        <Text style={styles.buttonText}>Category 2 (100 entries)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleCategory(3)}
        activeOpacity={0.7} // Adds the click effect
      >
        <Text style={styles.buttonText}>Category 3 (500 entries)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleCategory(4)}
        activeOpacity={0.7} // Adds the click effect
      >
        <Text style={styles.buttonText}>Category 4 (1000 entries)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  logo: {
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#dcdcdc',
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#4f83cc', // Slightly darker blue color for a hospital feel
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
