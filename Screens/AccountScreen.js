import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const AccountScreen = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState({
    id: 1,
    username: 'Learners',
    email: 'm@gmail.com',
    profileImage: require('./profile.jpeg'), // Replace with actual image source
  });

  const handleEditProfile = () => {
    navigation.navigate('EditProfileScreen', {user, setUser});
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => performDeleteAccount(),
        },
      ],
    );
  };

  const performDeleteAccount = () => {
    // Perform delete account logic here
    // Show delete confirmation message
    Alert.alert('Account Deleted', 'Your account has been deleted.', [
      {
        text: 'OK',
        onPress: () => {
          // Navigate to the login screen after account deletion
          navigation.navigate('Login'); // Example navigation to login screen
        },
      },
    ]);
  };

  const handleLogout = () => {
    // Perform logout logic here

    // Show logout confirmation message
    Alert.alert('Logged Out', 'You have been logged out.', [
      {
        text: 'OK',
        onPress: () => {
          // Navigate to the login screen after logging out
          navigation.navigate('Login'); // Example navigation to login screen
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.profileImage} source={user.profileImage} />
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <TouchableOpacity
        style={[styles.button, styles.editButton]}
        onPress={handleEditProfile}>
        <Text style={[styles.buttonText, styles.editButtonText]}>
          Edit Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.dangerButton]}
        onPress={handleDeleteAccount}>
        <Text style={[styles.buttonText, styles.dangerButtonText]}>
          Delete Account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}>
        <Text style={[styles.buttonText, styles.logoutButtonText]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles for AccountScreen
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  email: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
    width: 200,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#EFEFF4',
  },
  dangerButton: {
    backgroundColor: '#FF6B6B',
  },
  logoutButton: {
    backgroundColor: '#D1D1D6',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  editButtonText: {
    color: '#007AFF',
  },
  dangerButtonText: {
    color: '#FFF',
  },
  logoutButtonText: {
    color: '#333',
  },
});

export default AccountScreen;
