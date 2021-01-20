import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {LoadingView} from '../../constants/loadingView';
import {ShowListItem} from '../../listItem/showListItem';
import * as CONST from '../../constants/constants';

export const HomeScreen = (props) => {
  const [showsData, setshowsData] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    getAllShows();
  }, []);

  const getAllShows = () => {
    setloading(true);
    fetch(CONST.BASE_URL + CONST.FULL_SCHEDULE)
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          setshowsData(json);
          setloading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const goToDetialScreen = (item) => {
    props.navigation.navigate('DetailsScreen', item);
  };

  const renderItem = ({item}) => (
    <ShowListItem
      title={item.show.name}
      imageUrl={
        item.show.image
          ? item.show.image.original
          : 'https://static.wikia.nocookie.net/awakening-of-the-rebellion/images/c/c4/Missing_Image.jpg/revision/latest?cb=20200516103417'
      }
      status={item.show.status}
      language={item.show.language}
      schedule={item.show.schedule.days}
      genres={item.show.genres}
      goToDetialScreen={goToDetialScreen}
      show={item.show}
    />
  );

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <LoadingView />
      ) : (
        <FlatList
          numColumns={2}
          data={showsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};
