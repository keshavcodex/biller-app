import {View, Text, StyleSheet} from 'react-native';

const MyComponent = ({consumers}: any) => {
  return (
    <View style={styles.container}>
      {consumers.map((consumer: any, index: string) => (
        <View key={index} style={styles.consumerContainer}>
          <View style={styles.header}>
            <Text style={styles.conIdText}>Id: {consumer?.conId}</Text>
          </View>
          <View style={styles.infoContainer}>
            {consumer?.name?.length > 0 && (
              <Text style={styles.infoText}>Name: {consumer?.name}</Text>
            )}
            <Text style={styles.infoText}>Reading: {consumer?.bill}</Text>
            <Text style={styles.infoText}>LK: {consumer?.LK}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  consumerContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#333',
    borderColor: '#c9b6fc',
    borderWidth: 2,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#c9b6fc',
    paddingBottom: 5,
  },
  conIdText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 10,
  },
  infoText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default MyComponent;
