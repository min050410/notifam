import * as React from 'react';
import { TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { useState } from 'react';

//components
import todayTime from 'NOTIFAM/components/todaytime';

//홈 화면 스크린 - 예측 예상
function HomeScreen() {
    const [isLoading, setLoading] = useState(false)

    const [vagetable, setVagetable] = useState("");

    const [predata, setPredata] = useState("");

    //내 서버와 통신
    const getPrice = async (texts) => {
        // console.log(texts);
        try {
            setLoading(true);
            const response = await fetch('http://172.30.1.27/apidata', { // 학교 가서 바꾸기 
                method: "POST",
                credentials: "include",
                body: JSON.stringify({"data": texts}),
                cache: "no-cache",
                headers: new Headers({
                  "content-type": "application/json"
                })
            })
            const text = await response.text();
            console.log(text);
            setPredata(text.substring(1,text.length-1));
            setLoading(false);
        } catch (error) {
            console.error(error);
        } 
        
    }

    const submit = () => {
        
        getPrice(vagetable);

    }

    return (
        <View style={{ flex: 1 }}>
        { isLoading? <ActivityIndicator/> : <View style={styles.normal}>
            {/* <Text >{todayTime()}</Text> */}
            <Text>AI를 통한 예측 시스템이 가동중입니다</Text>
            <View style={styles.container2}>
                <TextInput
                    style={styles.textInput}
                    placeholder="어느 품목?"
                    onChangeText={text => setVagetable(text)}
                    value={vagetable}
                />
            </View>
            <TouchableOpacity onPress={submit}>
                    <View style={styles.textInput}><Text style={{ fontSize: 16, textAlign: 'center' }}>가격 확인(클릭)</Text></View>
            </TouchableOpacity>
            <Text>다음 날의 가격은 .. {predata} 원</Text>
        </View>
        }
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
    container2: {
        alignItems: 'center',
    },
    
    textInput: {
        fontSize: 16,
        color: '#000000',
        height: 50,
        width: 300,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        margin: 5,
    }
})

export default HomeScreen;