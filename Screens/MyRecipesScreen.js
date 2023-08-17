import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {images} from './images';

const MyRecipesScreen = () => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [editedTitle, setEditedTitle] = useState('');

  useEffect(() => {
    // Fetch user's uploaded recipes
    fetchUserRecipes();
  }, []);

  const fetchUserRecipes = async () => {
    try {
      // Fetch user's recipes based on their ID (replace with actual logic)
      const userRecipesData = await fetch('http://localhost:3000/getRecipes'); // Replace with your API endpoint
      const data = await userRecipesData.json();
      setUserRecipes(data);
    } catch (error) {
      console.error('Error fetching user recipes:', error);
    }
  };

  const handleEditRecipe = recipe => {
    setEditedTitle(recipe.title);
    setSelectedRecipe(recipe);
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    // Perform edit/update logic for the selected recipe (replace with actual logic)
    // ...

    // Update the title in the local state
    const updatedRecipes = userRecipes.map(recipe =>
      recipe._id === selectedRecipe._id
        ? {...recipe, title: editedTitle}
        : recipe,
    );
    setUserRecipes(updatedRecipes);
    setEditModalVisible(false);
  };

  const handleDeleteRecipe = recipeId => {
    // Perform delete logic for the selected recipe (replace with actual logic)
    // ...

    // Remove the recipe from the local state
    const updatedRecipes = userRecipes.filter(
      recipe => recipe._id !== recipeId,
    );
    setUserRecipes(updatedRecipes);
  };

  const renderRecipeItem = ({item, index}) => {
    const patternIndex = Math.floor(index / 1);
    const imageIndex = patternIndex % 2;
    const imageName = 'item_' + imageIndex;
    return (
      <View style={styles.recipeItem}>
        <Image
          style={styles.recipeImage}
          source={images[imageName].source}
          onError={() => console.log('Error loading image')}
          // defaultSource={require('./dish.jpg')}
        />
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <Text style={styles.uploadedTime}>Uploaded on:Today</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleEditRecipe(item)}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteRecipe(item._id)}>
            <Text style={styles.deleteButton}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={userRecipes}
        renderItem={renderRecipeItem}
        keyExtractor={item => item._id}
      />

      {/* Edit Recipe Modal */}
      <Modal visible={editModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.modalInput}
            value={editedTitle}
            onChangeText={setEditedTitle}
          />
          <Button title="Save Edit" onPress={handleSaveEdit} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  recipeItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
  },
  recipeImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  uploadedTime: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    color: '#007BFF',
    marginRight: 15,
  },
  deleteButton: {
    color: '#FF3B30',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '80%',
  },
});

export default MyRecipesScreen;
