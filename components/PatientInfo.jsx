import React, { useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { useSession } from '../context/SessionProvider';

const PatientInfo = ({ navigation }) => {
  const {
    setCataractSurgery,
    cataractSurgery,
    setSurgeryEye,
    otherComplaints,
    setOtherComplaints,
    diabetes,
    setDiabetes,
    bloodGroup,
    setBloodGroup,
    email,
    setEmail,
    regNo,
    setRegNo,
    name,
    setName,
    age,
    setAge,
    gender,
    setGender,
    occupation,
    setOccupation,
    mobileNumber,
    setMobileNumber,
    reducedVision,
    setReducedVision,
    reducedVisionEye,
    setReducedVisionEye,
  } = useSession();

  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Left Eye',
        value: 'Left Eye',
        containerStyle: styles.radioButton,
        labelStyle: styles.radioLabel,
      },
      {
        id: '2',
        label: 'Right Eye',
        value: 'Right Eye',
        containerStyle: styles.radioButton,
        labelStyle: styles.radioLabel,
      },
      {
        id: '3',
        label: 'Both Eyes',
        value: 'Both Eyes',
        containerStyle: styles.radioButton,
        labelStyle: styles.radioLabel,
      },
      {
        id: '4',
        label: 'None',
        value: 'No Surgery Done',
        containerStyle: styles.radioButton,
        labelStyle: styles.radioLabel,
      },
    ],
    [],
  );

  const handleSubmit = () => {
    setSurgeryEye(radioButtons[cataractSurgery-1].value)
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

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Diabetes:</Text>
        <TextInput
          style={styles.input}
          value={diabetes}
          onChangeText={setDiabetes}
          placeholder="Yes or No"
          placeholderTextColor="#888"
        />
      </View>

      <Text style={styles.heading}>Vision Information</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Other Complaints:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={otherComplaints}
          onChangeText={setOtherComplaints}
          placeholder="Describe any other complaints"
          placeholderTextColor="#888"
          multiline
          numberOfLines={2}
        />
      </View>

      <Text style={styles.label}>Cataract Surgery Done:</Text>
      <View style={styles.radioBox}>
        <RadioGroup
          radioButtons={[radioButtons[0], radioButtons[1]]}
          onPress={setCataractSurgery}
          selectedId={cataractSurgery}
          layout="row"
        />
      </View>
      <View style={styles.radioBox}>
        <RadioGroup
          radioButtons={[radioButtons[2], radioButtons[3]]}
          onPress={setCataractSurgery}
          selectedId={cataractSurgery}
          layout="row"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e0f7fa', // Light teal background for a calming feel
    flexGrow: 1,
  },
  heading: {
    fontSize: 24, // Larger font size for headings
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796b', // Dark teal for headings
    textAlign: 'center', // Centered heading
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff', // White background for input containers
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1, // Add a border
    borderColor: '#b2dfdb', // Light teal border color
  },
  label: {
    marginBottom: 5,
    color: '#00796b', // Dark teal for labels
    fontWeight: '600', // Slightly bolder labels
  },
  input: {
    borderWidth: 1,
    borderColor: '#b2dfdb', // Light teal border for inputs
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    fontSize: 16,
    color: '#000000',
  },
  textArea: {
    textAlignVertical: 'center',
  },
  button: {
    backgroundColor: '#004d40', // Darker teal for buttons
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#b2dfdb',
    borderRadius: 10,
    padding: 7,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  radioLabel: {
    color: '#00796b',
    fontWeight: '600',
  },
  radioBox: {
    flex: 1,
    flexDirection: 'row', // Set flex direction to row for horizontal layout
    justifyContent: 'space-around', // Distribute space around the radio buttons
    marginVertical: 1, // Add some vertical margin for spacing
  },
});

export default PatientInfo;
