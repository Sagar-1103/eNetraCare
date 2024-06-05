import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, PermissionsAndroid } from 'react-native';
import Eye from '../assets/homeEye.jpg';
import LinearGradient from 'react-native-linear-gradient';

function HomeScreen({ navigation }) {

  const categoryArray = [
    {id:1,entries:" (50 entries) "},
    {id:3,entries:"(500 entries) "},
    {id:2,entries:"(100 entries) "},
    {id:4,entries:"(1000 entries)"},
  ]

  const [clickedButton,setClickedButton] = useState(null);

  const handleCategory = category => {
    setClickedButton(category);
    setTimeout(() => {
      setClickedButton(null);
      navigation.navigate('License', { category });
    }, 0);
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
      <View style={styles.container1}>
        <Image source={Eye} style={styles.logo} />
      </View>
      <LinearGradient colors={['#D5E8F0', '#A1CDDE', '#3EA6D6']} style={styles.container2}>
        <Text style={styles.title}>Select a Category</Text>
        <View style={styles.container3}>
          {categoryArray.map(category => (
            <TouchableOpacity
              key={category.id}
              style={clickedButton===category.id?styles.buttonPressed:styles.button}
              onPress={() => handleCategory(category.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Category</Text>
              <TouchableOpacity disabled style={clickedButton===category.id?styles.numberPressed:styles.number}>
                <Text style={clickedButton===category.id?styles.numberTextPressed:styles.numberText}>{category.id}</Text>
              </TouchableOpacity>
              <Text style={styles.entriesText}>{category.entries}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop:-50
  },
  container1: {
    marginTop: 250,
    alignItems: 'center',
  },
  container2: {
    paddingTop: 30,
    alignItems: 'center',
    backgroundColor: 'powderblue',
    height: 600,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  container3: {
    flex: 1,
    flexWrap: 'wrap',
    maxHeight: 600,
  },
  logo: {
    width: '100%',
    objectFit: 'contain',
    marginBottom: -10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#134687',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 23,
    borderRadius: 25,
    margin: 10,
    minWidth: 140,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#84BED4',
    paddingVertical: 20,
    paddingHorizontal: 23,
    borderRadius: 25,
    margin: 10,
    minWidth: 140,
    alignItems: 'center',
  },
  buttonText: {
    color: '#134687',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  number: {
    borderRadius: 100,
    backgroundColor: '#84BED4',
    marginVertical: 5,
    paddingHorizontal: 25,
  },
  numberPressed: {
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    marginVertical: 5,
    paddingHorizontal: 25,
  },
  numberText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
    paddingVertical: 18,
  },
  numberTextPressed: {
    color: '#84BED4',
    fontWeight: '600',
    fontSize: 20,
    paddingVertical: 18,
  },
  entriesText: {
    color: '#134687',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
  },
});

export default HomeScreen;
