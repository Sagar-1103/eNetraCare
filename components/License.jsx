import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

function License({navigation,route}) {
  const [licenseNumber,setLicenseNumber] = useState(null);
  const [userLicenseNumber,setUserLicenseNumber] = useState(null);
  const licenseNumbers = ['1234','2345','3456','4567'];
  const category = route.params.category;

  useEffect(()=>{
    setLicenseNumber(licenseNumbers[category-1])
    console.log(licenseNumber);
    console.log(category);
  },[category]);

  const handleSubmit = ()=>{
    if (licenseNumber===userLicenseNumber) {
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
      {/* <Text>{userLicenseNumber}</Text>
      <Text>{licenseNumber}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  }
});

export default License;
