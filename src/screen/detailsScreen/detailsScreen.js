import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import {LoadingView} from '../../constants/loadingView';
import * as CONST from '../../constants/constants';

export const DetailsScreen = (props) => {
  const [showsData, setshowsData] = useState();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getShowsDetail(props.route.params.id);
  }, []);

  const getShowsDetail = (id) => {
    setloading(true);
    fetch(CONST.BASE_URL + CONST.SHOW_DETAIL + id.toString())
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

  const pointsView = (title, text) => {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={{flex: 1}}>{title}</Text>
          <Text style={{flex: 5}}>: {text}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <LoadingView />
      ) : (
        <ScrollView style={styles.container}>
          <Image
            style={styles.image}
            borderRadius={16}
            resizeMode="contain"
            source={{
              uri: showsData.image.original,
            }}
          />
          <Text style={styles.titleStyle} numberOfLines={2}>
            {showsData.name}
          </Text>
          {pointsView('Status', showsData.status)}
          {pointsView('language', showsData.language)}
          {pointsView(
            'Schedule',
            showsData.schedule.days[0] +
              'To' +
              showsData.schedule.days[showsData.schedule.days.length - 1],
          )}
          {pointsView(
            'Rating',
            showsData.rating.average
              ? showsData.rating.average.toString()
              : 'Not available',
          )}
          {pointsView(
            'Network',
            showsData.network
              ? showsData.network.name
                ? showsData.network.name
                : 'NA'
              : 'NA',
          )}

          <Text style={styles.summary}>
            {showsData.summary.replace(/(<([^>]+)>)/gi, '')}
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 6,
    marginHorizontal: 14,
  },
  image: {
    margin: 4,
    height: 300,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  titleStyle: {
    fontSize: 26,
    fontWeight: '800',
    paddingVertical: 4,
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 8,
  },
  summary: {
    marginTop: 8,
    fontWeight: '100',
    color: 'gray',
    textAlign: 'justify',
  },
});
