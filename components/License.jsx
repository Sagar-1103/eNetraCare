import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useSession } from '../context/SessionProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

function License({ navigation, route }) {
  const {setCategory, setEntries } = useSession();
  const [licenseNumber, setLicenseNumber] = useState(null);
  const [userLicenseNumber, setUserLicenseNumber] = useState('');
  const licenseNumbers = ['1234', '2345', '3456', '4567'];
  const entryList = [50, 100, 500, 1000];
  const cat = route.params.category;

  useEffect(() => {
    setLicenseNumber(licenseNumbers[cat - 1]);
  }, [cat]);

  const handleSubmit = async () => {
    if (licenseNumber === userLicenseNumber) {
      await AsyncStorage.setItem('category', JSON.stringify(cat));
      await AsyncStorage.setItem('entries', JSON.stringify(entryList[cat - 1]));
      setCategory(cat);
      setEntries(entryList[cat - 1]);
      navigation.navigate("PatientInfo");
    } else {
      Alert.alert('Invalid License', 'The license number you entered is incorrect.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter License Number</Text>
      <TextInput
        style={styles.input}
        placeholder="License Number"
        onChangeText={text => setUserLicenseNumber(text)}
        value={userLicenseNumber}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color:"black"
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default License;
