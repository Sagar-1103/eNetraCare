import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useSession } from '../context/SessionProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

function License({ navigation, route }) {
  const { category, setCategory, entries, setEntries } = useSession();
  const [licenseNumber, setLicenseNumber] = useState(null);
  const [userLicenseNumber, setUserLicenseNumber] = useState(null);
  const licenseNumbers = ['1234', '2345', '3456', '4567'];
  const entryList = [3, 100, 500, 1000];
  const cat = route.params.category;

  useEffect(() => {
    setLicenseNumber(licenseNumbers[cat - 1]);
    console.log(licenseNumber);
    console.log(cat);
  }, [cat]);

  const handleSubmit = async () => {
    if (licenseNumber === userLicenseNumber) {
      await AsyncStorage.setItem('category', JSON.stringify(cat));
      await AsyncStorage.setItem('entries', JSON.stringify(entryList[cat - 1]));
      setCategory(cat);
      setEntries(entryList[cat - 1]);
      navigation.navigate("PatientInfo");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="License Number"
        onChangeText={text => setUserLicenseNumber(text)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  }
});

export default License;
