import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {addConsumer} from '../services/apiActions';

const CreateConsumer = () => {
  const [conId, setConId] = useState('');
  const [bill, setBill] = useState('');
  const [LK, setLK] = useState('');
  const [name, setName] = useState('');

  const handleCreateConsumer = async () => {
    const body = {conId, bill, LK, name};
    console.log('body', body);
    try {
      const response = await addConsumer(body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 20,
          borderColor: 'gray',
          padding: 5,
          marginVertical: 30,
        }}>
        <TextInput
          style={styles.newConsumerInput}
          placeholder="Consumer Id"
          value={conId}
          onChangeText={setConId}
          keyboardType="numeric"
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TextInput
            style={styles.halfSizeInput}
            placeholder="Bill"
            value={bill}
            onChangeText={setBill}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.halfSizeInput}
            placeholder="LK"
            value={LK}
            onChangeText={setLK}
            keyboardType="numeric"
          />
        </View>
        <TextInput
          style={styles.newConsumerInput}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          keyboardType="numeric"
        />
      </View>
      <Button
        icon="plus"
        mode="contained-tonal"
        style={{height: 44, borderRadius: 50}}
        labelStyle={{fontSize: 18}}
        onPress={() => handleCreateConsumer}>
        Add Consumer
      </Button>
    </View>
  );
};

export default CreateConsumer;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    height: 60,
    color: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: 15,
    fontSize: 20,
  },
  newConsumerInput: {
    height: 60,
    color: '#fff',
    borderColor: 'gray',
    borderBottomWidth: 1,
    margin: 5,
    fontSize: 20,
  },
  halfSizeInput: {
    height: 60,
    color: '#fff',
    borderColor: 'gray',
    borderBottomWidth: 1,
    margin: 5,
    width: '45%',
    fontSize: 20,
  },
});
