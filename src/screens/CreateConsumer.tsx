import {View, StyleSheet} from 'react-native';
import React from 'react';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {addConsumer} from '../services/apiActions';
import { monthYearFormatter } from '../utils/helper';

const CreateConsumer = ({consumerState, setConsumerState}: any) => {
  const handleCreateConsumer = async () => {
    setConsumerState(prevState => ({...prevState, isLoading: true}));
    const body = {
      conId: consumerState.conId,
      reading: consumerState.reading,
      status: consumerState.status,
      name: consumerState.name,
      readingMonth: consumerState.readingMonth,
    };
    try {
      const response = await addConsumer(body);
      if (response?.data) {
        setConsumerState({
          conId: '',
          reading: '',
          status: '',
          name: '',
          readingMonth: monthYearFormatter(new Date()),
          isLoading: false,
        });
      } else {
        setConsumerState(prevState => ({...prevState, isLoading: false}));
      }
    } catch (error) {
      console.log(error);
      setConsumerState(prevState => ({...prevState, isLoading: false}));
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
          value={consumerState.conId}
          onChangeText={conId =>
            setConsumerState(prevState => ({...prevState, conId}))
          }
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
            placeholder="Reading"
            value={consumerState.reading}
            onChangeText={reading =>
              setConsumerState(prevState => ({...prevState, reading}))
            }
            keyboardType="numeric"
          />
          <TextInput
            style={styles.halfInput}
            placeholder="Status"
            value={consumerState.status}
            onChangeText={status =>
              setConsumerState(prevState => ({...prevState, status}))
            }
            keyboardType="default"
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Reading Month"
          value={consumerState.readingMonth}
          onChangeText={readingMonth =>
            setConsumerState(prevState => ({...prevState, readingMonth}))
          }
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={consumerState.name}
          onChangeText={name =>
            setConsumerState(prevState => ({...prevState, name}))
          }
          keyboardType="default"
        />
      </View>
      {consumerState.isLoading ? (
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
