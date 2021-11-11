import * as React from 'react';
import { ScrollView, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { fetch } from 'react-native';
import { useEffect, useState } from 'react';

// function getSitename(){
//   fetch('https://www.garak.co.kr/publicdata/dataOpen.do?id=3098&passwd=qkrandjs1%21&dataid=data4&pagesize=10&pageidx=1&portal.templet=false&p_ymd=20211111&p_jymd=20211110&d_cd=2&p_jjymd=20201111&p_pos_gubun=1&pum_nm=').then((response) => {

//   return response
//   });
// }

// 날짜 구하기
function todayTime(){
  let now = new Date;
  let year = now.getFullYear();
  let todayMonth = now.getMonth() + 1;
  let todayDate = now.getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  let dayOfWeek = week[now.getDay()];

  return year + '년 ' + todayMonth + '월 ' + todayDate + '일 ' + dayOfWeek + '요일 ';
}

// 현재가를 알려주는 스크린
function NowScreen() {
  return (

    <View style={styles.normal}>
      <Text>{todayTime()}</Text>
    </View>

  );
}

//홈 화면 스크린 - 예측 예상
function HomeScreen() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //api 통신
  const getPrice = async () => {
    try {
      const response = await fetch('https://www.garak.co.kr/publicdata/dataOpen.do?id=3098&passwd=qkrandjs1%21&dataid=data4&pagesize=10&pageidx=1&portal.templet=false&p_ymd=20211111&p_jymd=20211110&d_cd=2&p_jjymd=20201111&p_pos_gubun=1&pum_nm=');
      const json = await response.text();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPrice();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        // <FlatList
        //   data={data}
        //   keyExtractor={({ id }, index) => id}
        //   renderItem={({ item }) => (
        //     <Text>{item}, {item.releaseYear}</Text>
        //   )}
        // />
        
        <ScrollView>
          <Text>{data}</Text>
        </ScrollView>
      )}
      <Text>{todayTime()}</Text>
    </View>
  );
}

//search 검색 스크린
function SettingsScreen() {
  return (
    <View style={styles.normal}>
      <Text>Search!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="now" component={NowScreen} />
        <Tab.Screen style={styles.completeCircle} name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  normal: {
    // backgroundColor: "blue",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeCircle: {
    flex: 1,
  }

})
