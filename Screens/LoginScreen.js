import React, {useState} from 'react';
import {View, Image, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TextInput as PaperTextInput} from 'react-native-paper';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      if (response.ok) {
        console.log('User registered successfully');
        navigation.navigate('Main');
      } else {
        const errorData = await response.json();
        console.log('Error registering user:', errorData.message);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./logo.jpg')} style={styles.logo} />

      <PaperTextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <PaperTextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  logo: {
    width: 220,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
});

export default LoginScreen;
