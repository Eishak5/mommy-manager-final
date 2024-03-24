import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { GlobalContext } from '../Context/GlobalContext';
import OnBoardingItem from './OnBoardingItem';
import Paginator from './Paginator';
import { useNavigation } from '@react-navigation/native';

const OnBoarding = () => {
  const { onBoarding, getOnBoarding } = useContext(GlobalContext)
  const [currentIndex, setCurrentIndex] = useState()
  const slidesRef = useRef(null)
  const scrollX = useRef(new Animated.Value(0)).current
  const navigation = useNavigation();
  useEffect(() => {
    getOnBoarding()
  }, [])
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const viewableItemChange = ({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index)
  }
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate("login")}>
        <Text style={{ fontSize: 20 }}>Skip</Text>
      </TouchableOpacity>
      <View style={{ flex: 3 }}>
        <FlatList
          data={onBoarding}
          pagingEnabled
          bounces={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event([{
            nativeEvent: {
              contentOffset: {
                x: scrollX
              }
            }
          }], {
            useNativeDriver: false
          })}
          horizontal
          onViewableItemsChanged={viewableItemChange}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <OnBoardingItem item={item} />} />
      </View>
      <Paginator data={onBoarding} scrollX={scrollX} />
      <View style={styles.nextButtonView}>
        {
          (currentIndex + 1) === onBoarding?.length &&
          <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("login")}>
            <Text style={{ fontSize: 20 }}>Next</Text>
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}

export default OnBoarding

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  nextButtonView: {
    marginHorizontal: 20,
    marginBottom: 40,
    height: 70,
    alignSelf: 'stretch',
  },
  skipButton: {
    position: "absolute",
    top: 50,
    right: 30,
    zIndex: 3
  },
  nextButton: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",

  },
})