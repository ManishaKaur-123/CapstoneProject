import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import RecipePost from './RecipePost';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StarRating from 'react-native-star-rating';

const HomeScreen = () => {
  const [uploadedRecipes, setUploadedRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [recipeRatings, setRecipeRatings] = useState({});

  const fetchUploadedRecipes = async () => {
    try {
      const response = await fetch('http://localhost:3000/getrecipes');
      const data = await response.json();
      setUploadedRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    fetchUploadedRecipes();
  }, []);

  const navigation = useNavigation();

  const handleLike = recipeId => {
    // Toggle the liked state for the recipe
    const isLiked = likedRecipes.includes(recipeId);
    if (isLiked) {
      setLikedRecipes(likedRecipes.filter(id => id !== recipeId));
    } else {
      setLikedRecipes([...likedRecipes, recipeId]);
    }
  };

  const handleRating = (recipeId, rating) => {
    setRecipeRatings({...recipeRatings, [recipeId]: rating});
  };

  const handleShare = async recipeTitle => {
    try {
      await Share.share({
        message: `Check out this delicious recipe: ${recipeTitle}`,
      });
    } catch (error) {
      console.error('Error sharing recipe:', error);
    }
  };

  // Filter recipes based on search query
  const filteredRecipes = uploadedRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    // This effect will be triggered whenever likedRecipes or recipeRatings change.
    // You can add any additional logic here that should occur when these values change.
    console.log('Liked Recipes:', likedRecipes);
    console.log('Recipe Ratings:', recipeRatings);
  }, [likedRecipes, recipeRatings]);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {filteredRecipes.length === 0 ? (
        <Text style={styles.noRecipesText}>No recipes available</Text>
      ) : (
        filteredRecipes.map((recipe, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('RecipeDetailScreen', {recipe, index})
            }>
            <RecipePost recipe={recipe} index={index} />
            <View style={styles.recipeFooter}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={recipeRatings[recipe._id] || 0}
                selectedStar={rating => handleRating(recipe._id, rating)}
                fullStarColor="#FFD700"
                starSize={20}
              />
              <TouchableOpacity
                onPress={() => handleLike(recipe._id)}
                style={styles.likeButton}>
                {/* Updated like icon */}
                <Icon
                  name={
                    likedRecipes.includes(recipe._id)
                      ? 'favorite'
                      : 'favorite-border'
                  }
                  size={24}
                  color={likedRecipes.includes(recipe._id) ? '#FF0000' : '#999'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleShare(recipe.title)}
                style={styles.shareButton}>
                <Icon name="share" size={24} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  noRecipesText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#555',
  },
  recipeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  likeButton: {
    padding: 5,
  },
  shareButton: {
    padding: 5,
  },
});

export default HomeScreen;
