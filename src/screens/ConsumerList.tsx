import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Clipboard,
  ToastAndroid,
} from 'react-native';

const MyComponent = ({consumers}: any) => {
  const copyToClipboard = (text: string) => {
    if (text != '') {
      Clipboard.setString(text);
      ToastAndroid.show('Id copied', ToastAndroid.TOP);
    }
  };
  return (
    <View style={styles.container}>
      {consumers.map((consumer: any, index: string) => (
        <View key={index} style={styles.consumerContainer}>
          <Pressable
            onLongPress={() => copyToClipboard(consumer?.conId)}
            style={styles.header}>
            <Text style={styles.conIdText}>Id: {consumer?.conId}</Text>
          </Pressable>
          <View style={styles.infoContainer}>
            {consumer?.name?.length > 0 && (
              <Text style={{color: '#94dfff', fontSize: 17}}>
                Name: {consumer?.name}
              </Text>
            )}
            <Text style={styles.infoText}>Reading: {consumer?.reading}</Text>
            {consumer?.readingMonth?.length > 0 && (
              <Text style={styles.infoText}>
                Month: {consumer?.readingMonth}
              </Text>
            )}
            {consumer?.status?.length > 0 && (
              <Text style={styles.infoText}>
                Status:{' '}
                {typeof consumer?.status === 'number' ||
                /^\d+$/.test(consumer?.status)
                  ? `${consumer.status} LK`
                  : consumer.status}
              </Text>
            )}
            {consumer?.category?.length > 0 && (
              <Text style={styles.infoText}>
                Category: {consumer?.category}
              </Text>
            )}
            {consumer?.book?.length > 0 && (
              <Text style={styles.infoText}>
                Book: {consumer?.book}
              </Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
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
    fontSize: 18,
  },
});

export default MyComponent;
