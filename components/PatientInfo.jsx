import React from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useSession} from '../context/SessionProvider';

const PatientInfo = ({navigation}) => {
  const {
    surgeryEye,
    setSurgeryEye,
    cataractSurgery,
    setCataractSurgery,
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

  const handleSubmit = () => {
    if (!regNo || !name || !age || !gender || !occupation || !mobileNumber || !email || !bloodGroup) {
      Alert.alert(
        'Missing Information',
        'Please fill out all required fields.',
      );
      return;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      Alert.alert(
        'Invalid Input',
        'Please enter a valid 10-digit mobile number.',
      );
      return;
    }
    if (cataractSurgery && !surgeryEye) {
      Alert.alert(
        'Missing Information',
        'Please specify which eye had the cataract surgery.',
      );
      return;
    }
    if (reducedVision && !reducedVisionEye) {
      Alert.alert(
        'Missing Information',
        'Please specify which eye has reduced vision.',
      );
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
        <Switch value={diabetes} onValueChange={setDiabetes} trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={diabetes ? '#f5dd4b' : '#f4f3f4'}/>
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
          numberOfLines={4}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Cataract Surgery Done:</Text>
        <Switch value={cataractSurgery} onValueChange={setCataractSurgery} trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={cataractSurgery ? '#f5dd4b' : '#f4f3f4'}/>
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

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Reduced Vision Surgery Done:</Text>
        <Switch value={reducedVision} onValueChange={setReducedVision} trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={reducedVision ? '#f5dd4b' : '#f4f3f4'}/>
      </View>

      {reducedVision && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>If Yes, in which Eye:</Text>
          <TextInput
            style={styles.input}
            value={reducedVisionEye}
            onChangeText={setReducedVisionEye}
            placeholder="Specify the Eye"
            placeholderTextColor="#888"
          />
        </View>
      )}

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
    height: 100,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#004d40', // Darker teal for buttons
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
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
});

export default PatientInfo;
