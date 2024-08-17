import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, Text, ScrollView} from 'react-native';
import ConsumerList from './ConsumerList';
import {checkServer, getConsumers} from '../services/apiServices';
import {Button} from 'react-native-paper';
import HomeIcon from '@mui/icons-material/Home';
import {HomeRepairServiceRounded} from '@mui/icons-material';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Box} from '@mui/material';
import CreateConsumer from './CreateConsumer';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [serverUp, setServerUp] = useState(false);
  const [consumers, setConsumers] = useState<any>([]);
  const [consumerState, setConsumerState] = useState({
    conId: '',
    bill: '',
    LK: '',
    name: '',
    billMonth: '',
    isLoading: false,
  });

  useEffect(() => {
    initiateApplication();
    // fetchConsumers('14020');
  });

  const initiateApplication = async () => {
    try {
      const response = await checkServer();
      setServerUp(response.length > 0);
    } catch (error) {}
  };

  const handleSearch = (e: string) => {
    e = e.trim();
    setSearchTerm(e);
    fetchConsumers(e);
  };

  const fetchConsumers = async (id: string) => {
    try {
      const response = await getConsumers(id);
      if (Array.isArray(response)) {
        setConsumers(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
          marginRight: 10,
        }}>
        <Icon name="circle" size={25} color={serverUp ? 'green' : 'red'} />
        <Text style={{fontSize: 20, color: '#fff', marginHorizontal: 10}}>
          Electric Bill
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor={'#fff'}
        value={searchTerm}
        onChangeText={handleSearch}
      />

      {searchTerm.length > 0 && consumers.length > 0 ? (
        <ConsumerList consumers={consumers} />
      ) : (
        <CreateConsumer
          consumerState={consumerState}
          setConsumerState={setConsumerState}
        />
      )}
    </ScrollView>
  );
};

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
});

export default Home;
