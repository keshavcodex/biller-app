import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {TextInput} from 'react-native-paper';
import ConsumerList from './ConsumerList';
import {checkServer, getConsumers} from '../services/apiServices';
import {Button} from 'react-native-paper';
import HomeIcon from '@mui/icons-material/Home';
import {HomeRepairServiceRounded} from '@mui/icons-material';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Box} from '@mui/material';
import CreateConsumer from './CreateConsumer';
import { dateFormater, longDateFormater, monthDayFormatter, monthYearFormatter } from '../utils/helper';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [serverUp, setServerUp] = useState(false);
  const [consumers, setConsumers] = useState<any>([]);

  const [consumerState, setConsumerState] = useState({
    conId: '',
    bill: '',
    LK: '',
    name: '',
    billMonth: monthYearFormatter(new Date()),
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
        mode="flat"
        activeUnderlineColor="#333"
        placeholder="Search..."
        value={searchTerm}
        onChangeText={handleSearch}
        right={
          <TextInput.Icon
            icon="close-circle"
            onPress={() => setSearchTerm('')}
          />
        }
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
    borderRadius: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    fontSize: 20,
  },
});

export default Home;
