import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Logo from '../assets/Innovease_Logo.jpg';

function HomeScreen({navigation}) {
  const handleCategory = category => {
    navigation.navigate('License', {category: category});
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo}/>
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
