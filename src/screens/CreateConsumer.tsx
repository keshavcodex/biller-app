import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {addConsumer} from '../services/apiActions';

const CreateConsumer = () => {
  const [conId, setConId] = useState('');
  const [bill, setBill] = useState('');
  const [LK, setLK] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateConsumer = async () => {
    setIsLoading(true);
    const body = {conId, bill, LK, name};
    try {
      const response = await addConsumer(body);
      if (response?.data) {
        setConId('');
        setBill('');
        setLK('');
        setName('');
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
          style={styles.input}
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
            marginHorizontal: 5,
          }}>
          <TextInput
            style={styles.halfInput}
            placeholder="Bill"
            value={bill}
            onChangeText={setBill}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.halfInput}
            placeholder="LK"
            value={LK}
            onChangeText={setLK}
            keyboardType="numeric"
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          keyboardType="default"
        />
      </View>
      {isLoading ? (
        <ActivityIndicator animating={true} color={'#7154bf'} size={40} />
      ) : (
        <Button
          icon="plus"
          mode="contained-tonal"
          style={styles.button}
          labelStyle={{
            fontSize: 18,
          }}
          onPress={handleCreateConsumer}>
          Add Consumer
        </Button>
      )}
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
    borderBottomWidth: 1,
    margin: 5,
    fontSize: 20,
  },
  halfInput: {
    height: 60,
    color: '#fff',
    width: '48%',
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 2,
    fontSize: 20,
  },
  button: {
    borderRadius: 50,
    height: 60, // Increase button height
    marginHorizontal: 5,
    justifyContent: 'center',
  },
});
