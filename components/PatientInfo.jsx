import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  ScrollView,
  StyleSheet,
  Button,
} from 'react-native';

const PatientInfo = ({navigation}) => {
  const [regNo, setRegNo] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [diabetes, setDiabetes] = useState(false);
  const [visionEye, setVisionEye] = useState('');
  const [otherComplaints, setOtherComplaints] = useState('');
  const [cataractSurgery, setCataractSurgery] = useState(false);
  const [surgeryEye, setSurgeryEye] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Patient Information</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Registration No:</Text>
        <TextInput style={styles.input} value={regNo} onChangeText={setRegNo} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender:</Text>
        <TextInput
          style={styles.input}
          value={gender}
          onChangeText={setGender}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Occupation:</Text>
        <TextInput
          style={styles.input}
          value={occupation}
          onChangeText={setOccupation}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mobile Number:</Text>
        <TextInput
          style={styles.input}
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email ID:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Blood Group:</Text>
        <TextInput
          style={styles.input}
          value={bloodGroup}
          onChangeText={setBloodGroup}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Diabetes:</Text>
        <Switch value={diabetes} onValueChange={setDiabetes} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Reduced Vision in which Eye:</Text>
        <TextInput
          style={styles.input}
          value={visionEye}
          onChangeText={setVisionEye}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Other Complaints:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={otherComplaints}
          onChangeText={setOtherComplaints}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cataract Surgery Done:</Text>
        <Switch value={cataractSurgery} onValueChange={setCataractSurgery} />
      </View>

      {cataractSurgery && <View style={styles.inputContainer}>
        <Text style={styles.label}>If Yes, in which Eye:</Text>
        <TextInput
          style={styles.input}
          value={surgeryEye}
          onChangeText={setSurgeryEye}
        />
      </View>}
      <Button title="Next" onPress={() => navigation.navigate('VisionChartResults')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: 'gray',
    fontWeight:"500"
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // for Android
  },
});

export default PatientInfo;
