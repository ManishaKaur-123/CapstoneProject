import React, {useState} from 'react';
import {View, ScrollView, Button, Image, StyleSheet} from 'react-native';
import InputSection from './InputSection'; // Adjust the import path
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const UploadScreen = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [preparationSteps, setPreparationSteps] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servingPortions, setServingPortions] = useState('');
  const [rating, setRating] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUpload = async () => {
    try {
      const response = await fetch('http://localhost:3000/addrecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          ingredients: ingredients.split('\n'),
          preparationSteps: preparationSteps.split('\n'),
          cookingTime,
          servingPortions,
          rating,
          image: selectedImage.uri,
        }),
      });

      console.log('response' + JSON.stringify(response));

      if (response.ok) {
        console.log('Everything working well');
      } else {
        const errorData = await response.json();
        console.log('Error registering recipe:', errorData.message);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const handleImageCapture = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.7,
    };

    launchImageLibrary(options, response => {
      if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0]);
      }
    });
  };
  console.log(selectedImage?.uri);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <InputSection title="Title" onEdit={setTitle} value={title} />
        <InputSection
          title="Ingredients"
          addButton
          onEdit={setIngredients}
          items={ingredients} // Pass ingredients array to the items prop
        />
        <InputSection
          title="Preparation Steps"
          addButton
          onEdit={setPreparationSteps}
          value={preparationSteps}
        />
        <InputSection
          title="Cooking Time"
          onEdit={setCookingTime}
          value={cookingTime}
        />
        <InputSection
          title="Serving Portion"
          onEdit={setServingPortions}
          value={servingPortions}
        />
        <InputSection title="Quantity" onEdit={setRating} value={rating} />
        <InputSection
          title="Image"
          addButton
          onEdit={handleImageCapture}
          // value={imageURI}
          buttonText="Capture Image"
        />

        {selectedImage && (
          <Image
            source={{uri: selectedImage.uri}}
            style={{height: 200, width: 200}}
          />
        )}

        {/* ...Upload button... */}
        <View style={styles.uploadButtonContainer}>
          <Button title="Upload Recipe" onPress={handleUpload} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  uploadButtonContainer: {
    padding: 20, // Add padding to give space between button and input fields
    borderTopWidth: 1, // Add a border to separate the button from the input fields
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
});

export default UploadScreen;
