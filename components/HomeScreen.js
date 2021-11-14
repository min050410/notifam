import * as React from 'react';
import { ScrollView, ActivityIndicator, Text, View, StyleSheet } from 'react-native';

//components
import todayTime from 'NOTIFAM/components/todaytime';

//홈 화면 스크린 - 예측 예상
function HomeScreen() {
    return (
        <View style={styles.normal}>
            <Text >{todayTime()}</Text>
        </View>
    );
}

// style
const styles = StyleSheet.create({
    normal: {
        // backgroundColor: "blue",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default HomeScreen;