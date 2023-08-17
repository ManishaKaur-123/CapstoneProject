import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const InputSection = ({title, addButton, onEdit, value}) => {
  const [listData, setListData] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleAddItem = () => {
    if (inputText.trim() !== '') {
      setListData([...listData, inputText]);
      setInputText('');
    }
  };
  const handleDeleteItem = index => {
    const updatedList = [...listData];
    updatedList.splice(index, 1);
    setListData(updatedList);
  };

  return (
    <View style={styles.section}>
      <Text>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={`Add ${title.toLowerCase()}...`}
          value={value}
          onChangeText={onEdit}
        />
        {addButton && <Button title="Add" onPress={handleAddItem} />}
      </View>
      {listData.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <Text>{item}</Text>
          <Button title="Delete" onPress={() => handleDeleteItem(index)} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  listItem: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default InputSection;
