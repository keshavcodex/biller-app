import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView, RefreshControl} from 'react-native';
import {TextInput} from 'react-native-paper';
import ConsumerList from './ConsumerList';
import {checkServer} from '../services/apiServices';
import Icon from 'react-native-vector-icons/FontAwesome';
import CreateConsumer from './CreateConsumer';
import {monthYearFormatter, sleep} from '../utils/helper';
import NetInfo from '@react-native-community/netinfo';
import {getConsumer} from '../services/apiActions';

const Home = () => {
  const defaultConsumer = {
    conId: '',
    reading: '',
    status: '',
    name: '',
    readingMonth: monthYearFormatter(new Date()),
    isLoading: false,
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [serverUp, setServerUp] = useState(false);
  const [consumers, setConsumers] = useState<any>([]);
  const [seconds, setSeconds] = useState(45);
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const [consumerState, setConsumerState] = useState<any>(defaultConsumer);
  const [refreshing, setRefreshing] = useState(false);

  let secondCounter: any;

  useEffect(() => {
    // Subscribe to the internet connection status
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        initiateApplication(); // Call onRefresh when the internet is available
      }
    });

    // Clean up the NetInfo listener on component unmount
    return () => {
      unsubscribe();
    };
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    initiateApplication();
  }

  const initiateApplication = async () => {
    try {
      setServerUp(false);
      clearInterval(secondCounter);
      secondCounter = setInterval(() => {
        setSeconds(prevSeconds => (prevSeconds <= 1 ? 60 : prevSeconds - 1));
      }, 1000);
      // await sleep(5);
      const response = await checkServer();
      setRefreshing(false);
      setServerUp(response?.length > 0);
      setSeconds(45);
      clearInterval(secondCounter);
    } catch (error) {
      setRefreshing(false);
      console.log('\nerror', error);
    }
  };

  const handleSearch = async (text: string) => {
    setSearchTerm(text);
    try {
      if (text?.length < 1) {
        setConsumers([]);
        return;
      }
      const body = {search: text};
      const response = await getConsumer(body);
      console.log(JSON.stringify(response, null, 2));
      if (Array.isArray(response)) {
        setConsumers(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="always"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
          marginRight: 10,
        }}>
        <View style={{marginTop: 3}}>
          <Icon
            name="circle"
            size={25}
            color={serverUp ? 'green' : seconds & 1 && 'red'}
          />
        </View>
        <Text style={{fontSize: 20, color: '#fff', marginHorizontal: 10}}>
          Electric Bill
        </Text>
        {!serverUp && (
          <Text style={{fontSize: 20, color: '#fff', marginHorizontal: 10}}>
            {seconds}
          </Text>
        )}
      </View>
      {isConnected ? (
        <View>
          <TextInput
            style={styles.input}
            mode="flat"
            activeUnderlineColor="#333"
            placeholder="Search..."
            value={searchTerm}
            onChangeText={handleSearch}
            right={
              searchTerm?.length > 0 && (
                <TextInput.Icon
                  icon="close-circle"
                  onPress={() => setSearchTerm('')}
                />
              )
            }
          />

          {searchTerm?.length > 0 && consumers?.length > 0 ? (
            <ConsumerList consumers={consumers} />
          ) : (
            <CreateConsumer
              consumerState={consumerState}
              setConsumerState={setConsumerState}
            />
          )}
        </View>
      ) : (
        <View style={{alignItems: 'center', marginTop: 100}}>
          <Text
            style={{
              fontSize: 25,
              borderWidth: 1,
              padding: 15,
              borderRadius: 25,
              backgroundColor: 'black',
              fontWeight: 800,
              color: '#fff',
            }}>
            Internet is not connected
          </Text>
        </View>
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
