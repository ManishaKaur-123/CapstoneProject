import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {images} from './images';

const RecipeDetailScreen = ({route, navigation}) => {
  const {recipe, index} = route.params; // Retrieve images and index parameter

  const [activeSection, setActiveSection] = useState('Summary');
  const [slideAnim] = useState(new Animated.Value(0));

  const slideToSection = section => {
    setActiveSection(section);
    slideAnim.setValue(section === 'Summary' ? 0 : 1);
  };

  const InfoItem = ({title, value}) => (
    <View style={styles.infoItem}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  const patternIndex = Math.floor(index / 1);
  const imageIndex = patternIndex % 2;
  const imageName = 'item_' + imageIndex;
  //console.log(recipe.index);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardContainer}>
        <ImageBackground
          style={styles.cardImage}
          source={images[imageName].source} // Use images parameter
          onError={() => console.log('Error loading image')}>
          <SafeAreaView style={styles.cardHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
          </SafeAreaView>
        </ImageBackground>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.sectionButtons}>
          {['Summary', 'Ingredients', 'Preparation'].map(section => (
            <TouchableOpacity
              key={section}
              style={[
                styles.sectionButton,
                {
                  borderBottomColor:
                    activeSection === section ? '#007BFF' : 'transparent',
                },
              ]}
              onPress={() => slideToSection(section)}>
              <Text
                style={[
                  styles.sectionButtonText,
                  {
                    color: activeSection === section ? '#007BFF' : '#555',
                  },
                ]}>
                {section}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.columnContainer}>
          <Column title="Summary" isActive={activeSection === 'Summary'}>
            <Text style={styles.title}>{recipe.title}</Text>
            <View style={styles.additionalInfoContainer}>
              <InfoItem
                title="Serving Portion"
                value={recipe.servingPortions}
              />
              <InfoItem title="Cooking Time" value={recipe.cookingTime} />
              <InfoItem title="Rating" value={recipe.rating} />
            </View>
          </Column>
          <Column
            title="Ingredients"
            isActive={activeSection === 'Ingredients'}>
            <Text style={styles.columnText}>
              {recipe.ingredients.join(', ')}
            </Text>
          </Column>
          <Column
            title="Preparation"
            isActive={activeSection === 'Preparation'}>
            <Text style={styles.columnText}>
              {recipe.preparationSteps.join('\n')}
            </Text>
          </Column>
        </View>
      </View>
    </ScrollView>
  );
};

const Column = ({title, isActive, children}) => (
  <View
    style={{
      padding: 20,
      width: isActive ? '100%' : null,
    }}>
    {isActive && children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    overflow: 'hidden',
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  cardHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  backButton: {
    padding: 5,
  },
  cardContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionButton: {
    borderBottomWidth: 1,
    marginBottom: -2,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  sectionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  columnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  column: {
    flex: 1,
    marginRight: 10,
    borderBottomWidth: 1,
    borderColor: 'transparent',
  },
  activeColumn: {
    borderColor: '#007BFF',
  },
  activeColumnTitle: {
    color: '#007BFF',
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  columnText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  infoItem: {
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  additionalInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 0.5,
    width: '100%',
    padding: 5,
  },
});

export default RecipeDetailScreen;
