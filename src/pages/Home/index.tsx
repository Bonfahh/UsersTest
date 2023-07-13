/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/Header';
import {
  Container,
  ContentWrap,
  DeleteButton,
  DeleteText,
  SearchInput,
} from './styles';
import axios from 'axios';
import {Alert, FlatList, Image, Text, View} from 'react-native';

type Person = {
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    country: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  login: {
    uuid: string;
  };
  email: string;
};

function Home(): JSX.Element {
  const resultsNumber = 20;

  const [data, setData] = useState<Person[]>([]);
  const [filteredData, setFilteredData] = useState<Person[]>([]);
  const [value, setValue] = useState('');
  const [sorted, setSorted] = useState(false);
  const [sortedCopy, setSortedCopy] = useState<Person[]>([]);

  useEffect(() => {
    axios
      .get(`https://randomuser.me/api?results=${resultsNumber}`)
      .then(res => {
        const {results} = res.data;
        if (results?.length > 0) {
          setData(results);
          setFilteredData(results);
        }
      })
      .catch(() => {
        Alert.alert('Error', 'An error ocurred, try again!');
      });
  }, []);

  const filterData = useCallback(() => {
    const newFilteredData = data.filter(
      d => d.location.country.indexOf(value) !== -1,
    );

    setFilteredData(newFilteredData);
  }, [data, value]);

  const deleteUser = (item: Person) => {
    setFilteredData(prev => prev.filter(p => p.email !== item.email));
  };

  const handleRestore = () => {
    setFilteredData(data);
  };

  const handleSort = () => {
    const newFilteredData = Array.from(filteredData);

    if (!sorted) {
      setSortedCopy(filteredData);
      newFilteredData.sort((a, b) =>
        a.location.country.localeCompare(b.location.country),
      );
      setFilteredData(newFilteredData);
      setSorted(true);
    } else {
      setFilteredData(sortedCopy);
      setSorted(false);
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (value !== null) {
      timeout = setTimeout(() => {
        filterData();
      }, 2000);
    }

    return () => timeout && clearTimeout(timeout);
  }, [filterData, value]);

  return (
    <Container>
      <Header handleSort={handleSort} handleRestore={handleRestore} />
      <ContentWrap>
        <SearchInput value={value} onChangeText={setValue} />
        <FlatList
          data={filteredData}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          keyExtractor={item => item.email}
          renderItem={({item}) => (
            <View
              style={{
                width: '90%',
                borderColor: 'lightgray',
                justifyContent: 'space-around',
                alignItems: 'center',
                borderWidth: 1,
                flexDirection: 'row',
                borderRadius: 8,
                marginBottom: 10,
              }}>
              <Image
                source={{uri: item.picture.thumbnail}}
                style={{width: 100, height: 50, marginVertical: 5}}
                resizeMode="contain"
              />
              <Text>{item.name.first}</Text>
              <Text>{item.location.country}</Text>
              <DeleteButton onPress={() => deleteUser(item)}>
                <DeleteText>Delete</DeleteText>
              </DeleteButton>
            </View>
          )}
        />
      </ContentWrap>
    </Container>
  );
}
export default Home;
