// Navbar.js
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

const Navbar = ({children}) => {
  return (
    <View style={styles.navbar}>
      {/* <Text style={styles.title}>Patient Form</Text> */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    height: 70,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  title: {
    color: '#134687',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 30,
  },
});

export default Navbar;
