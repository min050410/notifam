import * as React from 'react';
import { ScrollView, ActivityIndicator, Text, View, StyleSheet } from 'react-native';

//components
import todayTime from 'NOTIFAM/components/todaytime';

//search 검색 스크린
function SearchScreen() {
    return (
        <View style={styles.normal}>
            <Text>Search!</Text>
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

export default SearchScreen;