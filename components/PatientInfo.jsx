import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';

const PatientInfo = ({ navigation }) => {
  const [regNo, setRegNo] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [diabetes, setDiabetes] = useState(false);
  const [reducedVisionRight, setReducedVisionRight] = useState(false);
  const [reducedVisionLeft, setReducedVisionLeft] = useState(false);
  const [reducedVisionBoth, setReducedVisionBoth] = useState(false);
  const [otherComplaints, setOtherComplaints] = useState('');
  const [cataractSurgery, setCataractSurgery] = useState(false);
  const [surgeryEye, setSurgeryEye] = useState('');

  const handleReducedVisionSwitch = (value, eye) => {
    if (eye === 'right') {
      setReducedVisionRight(value);
      if (value && reducedVisionLeft) {
        setReducedVisionBoth(true);
      } else {
        setReducedVisionBoth(false);
      }
    } else if (eye === 'left') {
      setReducedVisionLeft(value);
      if (value && reducedVisionRight) {
        setReducedVisionBoth(true);
      } else {
        setReducedVisionBoth(false);
      }
    } else {
      setReducedVisionBoth(value);
      setReducedVisionRight(value);
      setReducedVisionLeft(value);
    }
  };

  const handleSubmit = () => {
    if (!regNo || !name || !age || !gender || !occupation || !mobileNumber || !email || !bloodGroup) {
      Alert.alert('Missing Information', 'Please fill out all required fields.');
      return;
    }
    if (cataractSurgery && !surgeryEye) {
      Alert.alert('Missing Information', 'Please specify which eye had the cataract surgery.');
      return;
    }
    navigation.navigate('VisionChartResults');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Basic Patient Information</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Registration No:</Text>
        <TextInput
          style={styles.input}
          value={regNo}
          onChangeText={setRegNo}
          placeholder="Enter Registration Number"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter Full Name"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholder="Enter Age"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender:</Text>
        <TextInput
          style={styles.input}
          value={gender}
          onChangeText={setGender}
          placeholder="Enter Gender"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Occupation:</Text>
        <TextInput
          style={styles.input}
          value={occupation}
          onChangeText={setOccupation}
          placeholder="Enter Occupation"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mobile Number:</Text>
        <TextInput
          style={styles.input}
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
          placeholder="Enter Mobile Number"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email ID:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter Email Address"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Blood Group:</Text>
        <TextInput
          style={styles.input}
          value={bloodGroup}
          onChangeText={setBloodGroup}
          placeholder="Enter Blood Group"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Diabetes:</Text>
        <Switch value={diabetes} onValueChange={setDiabetes} />
      </View>

      <Text style={styles.heading}>Vision Information</Text>
      
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Reduced Vision in Right Eye:</Text>
        <Switch 
          value={reducedVisionRight} 
          onValueChange={(value) => handleReducedVisionSwitch(value, 'right')} 
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Reduced Vision in Left Eye:</Text>
        <Switch 
          value={reducedVisionLeft} 
          onValueChange={(value) => handleReducedVisionSwitch(value, 'left')} 
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Reduced Vision in Both Eyes:</Text>
        <Switch 
          value={reducedVisionBoth} 
          onValueChange={(value) => handleReducedVisionSwitch(value, 'both')} 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Other Complaints:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={otherComplaints}
          onChangeText={setOtherComplaints}
          placeholder="Describe any other complaints"
          placeholderTextColor="#888"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Cataract Surgery Done:</Text>
        <Switch value={cataractSurgery} onValueChange={setCataractSurgery} />
      </View>

      {cataractSurgery && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>If Yes, in which Eye:</Text>
          <TextInput
            style={styles.input}
            value={surgeryEye}
            onChangeText={setSurgeryEye}
            placeholder="Specify the Eye"
            placeholderTextColor="#888"
          />
        </View>
      )}

      <Button title="Next" onPress={handleSubmit} color="#1e90ff" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    marginBottom: 5,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default PatientInfo;
