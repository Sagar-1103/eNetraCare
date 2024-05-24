import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {

  const handleCategory = (category)=>{
    navigation.navigate('License', { category: category })
  }
  return (
    <View style={styles.container}>
      <Button title="Category 1 (50 entries)" onPress={()=>handleCategory(1)} />
      <Button title="Category 2 (100 entries)" onPress={()=>handleCategory(2)} />
      <Button title="Category 3 (500 entries)" onPress={()=>handleCategory(3)} />
      <Button title="Category 4 (1000 entries)" onPress={()=>handleCategory(4)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeScreen;
