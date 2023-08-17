import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen'; // Create these screens as mentioned before
import TopRatedScreen from './TopRatedScreen';
import MyRecipesScreen from './MyRecipesScreen';
import AccountScreen from './AccountScreen';
import UploadScreen from './UploadScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import your icon library
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: 'blue', // Customize the active tab color
        inactiveTintColor: 'gray', // Customize the inactive tab color
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="home" size={25} color="blue" />
          ),
        }}
      />
      <Tab.Screen
        name="TopRated"
        component={TopRatedScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="star" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="cloud-upload" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyRecipes"
        component={MyRecipesScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
