import * as React from 'react';
import { TextInput, ScrollView, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { useState } from 'react';

//components
import todayTime from 'NOTIFAM/components/todaytime';

//홈 화면 스크린 - 예측 예상
function HomeScreen() {
    const [vagetable, setVagetable] = useState("");
    return (
        
        <View style={styles.normal}>
            <View style={styles.container2}>
                <TextInput
                    style={styles.textInput}
                    placeholder="어느 품목?"
                    onChangeText={text => setVagetable(text)}
                    value={vagetable}
                />
            </View>
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