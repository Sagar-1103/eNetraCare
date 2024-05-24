import React, { useState } from 'react';
import { View, Text, TextInput, Switch, ScrollView, StyleSheet, Button } from 'react-native';
import EyeSection from './EyeSection';

const VisionChartResults = ({ navigation }) => {
  const [rightEyeResult, setRightEyeResult] = useState('');
  const [leftEyeResult, setLeftEyeResult] = useState('');
  const [consent, setConsent] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>Vision Chart Results:</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Right Eye:</Text>
          <TextInput 
            style={styles.input} 
            value={rightEyeResult} 
            onChangeText={setRightEyeResult} 
            placeholder="Enter right eye result" 
            placeholderTextColor="#999"
            keyboardType='number-pad' 
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Left Eye:</Text>
          <TextInput 
            style={styles.input} 
            value={leftEyeResult} 
            onChangeText={setLeftEyeResult} 
            placeholder="Enter left eye result" 
            placeholderTextColor="#999"
            keyboardType='number-pad' 
          />
        </View>

        <EyeSection />

        <View style={styles.consentContainer}>
          <Text style={styles.label}>Consent for taking eye details and images:</Text>
          <Switch 
            value={consent} 
            onValueChange={setConsent} 
            trackColor={{ false: "#767577", true: "#81b0ff" }} 
            thumbColor={consent ? "#f5dd4b" : "#f4f3f4"} 
          />
        </View>
        <Button title="Submit" disabled={!consent} onPress={() => navigation.navigate('VisionChartResults')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  inputContainer: {
    marginBottom: 15,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  label: {
    marginBottom: 5,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: '#000',
  },
  consentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default VisionChartResults;
