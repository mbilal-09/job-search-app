import React, {useState} from 'react';
import {Text, View, ScrollView, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, icons, images, SIZES} from '../constants';
import {Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome} from '../components';

const Home = () => {
  const navigator = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, padding: SIZES.medium}}>
          <Welcome
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleClick={() => {
            if (searchTerm) {
              navigator.navigate(`search`, {
                id: searchTerm
              })
            }
          }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;