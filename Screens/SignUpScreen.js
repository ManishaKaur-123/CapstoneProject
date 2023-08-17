import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TextInput as PaperTextInput} from 'react-native-paper';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, email, password}),
      });

      if (response.ok) {
        navigation.navigate('Main');
      } else {
        const errorData = await response.json();
        console.log('Error registering user:', errorData.message);
        // Handle error, show error message to the user, etc.
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      // Handle network errors or other issues.
    }
  };
  const showUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/showUserName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username}),
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
      <Text style={styles.title}>Create an Account</Text>
      <PaperTextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
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
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}>
          Log In
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9', // Set a light background color
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
  loginText: {
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
  loginLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
