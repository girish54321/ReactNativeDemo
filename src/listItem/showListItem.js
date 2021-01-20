import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export const ShowListItem = (props) => {
  return (
    <TouchableOpacity
      style={{flex: 1}}
      onPress={() => {
        props.goToDetialScreen(props.show);
      }}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          borderRadius={16}
          resizeMode="cover"
          source={{
            uri: props.imageUrl,
          }}
        />
        <Text style={styles.title} numberOfLines={2}>
          {props.title}
        </Text>
        <View>
          <Text style={styles.grayText}>status : {props.status}</Text>
          <Text style={styles.grayText}>language : {props.language}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.grayText}>{props.schedule[0]}</Text>
          <Text style={styles.grayText}> to </Text>
          <Text style={styles.grayText}>
            {props.schedule[props.schedule.length - 1]}
          </Text>
        </View>
        <View style={{height: 1, backgroundColor: 'gray', marginTop: 8}} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 14,
  },
  grayText: {color: 'gray'},
  title: {
    fontSize: 22,
    fontWeight: '800',
    paddingVertical: 4,
  },
  image: {
    height: 230,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
