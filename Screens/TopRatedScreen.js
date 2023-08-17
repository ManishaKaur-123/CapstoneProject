import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {images} from './images';

const TopRatedScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:3000/getrecipes');
      const data = await response.json();
      const sortedRecipes = data.sort((a, b) => b.rating - a.rating);
      setRecipes(sortedRecipes);
      setFilteredRecipes(sortedRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSearch = query => {
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredRecipes(filtered);
  };

  const handleSearchInputChange = text => {
    setSearchQuery(text);

    if (text === '') {
      setFilteredRecipes(recipes);
    } else {
      handleSearch(text);
    }
  };

  const navigation = useNavigation();

  const navigateToDetail = (recipe, index) => {
    navigation.navigate('RecipeDetailScreen', {recipe, index});
  };

  const renderRecipeItem = ({item, index}) => {
    const patternIndex = Math.floor(index / 1);
    const imageIndex = patternIndex % 2;
    const imageName = 'item_' + imageIndex;

    return (
      <TouchableOpacity
        style={styles.recipeItem}
        onPress={() => navigateToDetail(item, index)}>
        <Image
          style={styles.recipeImage}
          source={images[imageName].source}
          onError={() => console.log('Error loading image')}
          // defaultSource={require('./dish.jpg')}
        />
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeTitle}>{item.title}</Text>
          <Text style={styles.recipeRating}>Rating: {item.rating}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Rated Recipes</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search recipes..."
        value={searchQuery}
        onChangeText={handleSearchInputChange}
      />
      <FlatList
        data={filteredRecipes}
        renderItem={renderRecipeItem}
        keyExtractor={item => item._id}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    color: '#333',
  },
  searchInput: {
    height: 40,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  recipeItem: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  recipeImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  recipeInfo: {
    padding: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  recipeRating: {
    fontSize: 16,
    color: '#555',
  },
});

export default TopRatedScreen;
