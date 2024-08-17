import {View, StyleSheet} from 'react-native';
import React from 'react';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {addConsumer} from '../services/apiActions';

const CreateConsumer = ({consumerState, setConsumerState}: any) => {
  const handleCreateConsumer = async () => {
    setConsumerState(prevState => ({...prevState, isLoading: true}));
    const body = {
      conId: consumerState.conId,
      bill: consumerState.bill,
      LK: consumerState.LK,
      name: consumerState.name,
      billMonth: consumerState.billMonth,
    };
    try {
      const response = await addConsumer(body);
      if (response?.data) {
        setConsumerState({
          conId: '',
          bill: '',
          LK: '',
          name: '',
          billMonth: '',
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
            value={consumerState.bill}
            onChangeText={bill =>
              setConsumerState(prevState => ({...prevState, bill}))
            }
            keyboardType="numeric"
          />
          <TextInput
            style={styles.halfInput}
            placeholder="LK"
            value={consumerState.LK}
            onChangeText={LK =>
              setConsumerState(prevState => ({...prevState, LK}))
            }
            keyboardType="numeric"
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Bill Month"
          value={consumerState.billMonth}
          onChangeText={billMonth =>
            setConsumerState(prevState => ({...prevState, billMonth}))
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
