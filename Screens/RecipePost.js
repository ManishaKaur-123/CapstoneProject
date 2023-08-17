//
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {images} from './images';
const RecipePost = ({recipe, index}) => {
  const filteredIngredients = recipe.ingredients;
  const patternIndex = Math.floor(index / 1);
  const imageIndex = patternIndex % 2;
  const imageName = 'item_' + imageIndex;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={images[imageName].source} // Use images parameter
        onError={err => console.log(err.status + 'Error loading image')}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {filteredIngredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredients}>
            {ingredient}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  ingredients: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
});

export default RecipePost;
