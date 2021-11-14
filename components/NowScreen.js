import * as React from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { parseString } from 'xml2js';
import { useEffect, useState } from 'react';

//components
import todayTime from 'NOTIFAM/components/todaytime';

// 현재가를 알려주는 스크린
function NowScreen() {
    const [isLoading, setLoading] = useState(true);
    // 농작물 이름
    const [data, setData] = useState([]);
    // 농작물 가격
    const [price, setPrice] = useState([]);
    // 농작물 무게
    const [weight, setWeight] = useState([]);


    // var xml2js = require('xml2js');
    // var parser = new xml2js.Parser();

    //api 통신
    const getPrice = async () => {
        try {
            const response = await fetch('https://www.garak.co.kr/publicdata/dataOpen.do?id=3098&passwd=qkrandjs1%21&dataid=data4&pagesize=10&pageidx=1&portal.templet=false&p_ymd=20211111&p_jymd=20211110&d_cd=2&p_jjymd=20201111&p_pos_gubun=1&pum_nm=고구마');
            const json = await response.text();
            //const x2js = new X2JS()
            //const rss = x2js.xml2js(json)
            parseString(json, function (err, result) {
                // console.log(result['lists']['list'][0]['PUM_NM_A']);
                setData(result['lists']['list'][0]['PUM_NM_A']);
                setPrice(result['lists']['list'][0]['AV_P_A']);
                setWeight(result['lists']['list'][0]['U_NAME']);
            })

            // setData(json);

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
        <View style={{ flex: 1 }}>
            <View style={styles.time}>
                <Text sytle={{ fontSize: 24 }}>{todayTime()}</Text>
            </View>
            {/* 품목 거래량 등급 가격 */}
            <View style={styles.container}>
                <View style={styles.c_item1} ><Text style={{ fontSize: 15 }}>품목</Text></View>
                <View style={styles.c_item2} ><Text style={{ fontSize: 15 }}>거래량/등급</Text></View>
                <View style={styles.c_item3} ><Text style={{ fontSize: 15 }}>가격</Text></View>
            </View>
            {isLoading ? <ActivityIndicator /> : (
                <View style={styles.item}>
                    <Text style={styles.itemTitle}

                        ellipsizeMode={'tail'}>{data}</Text>

                    <Text style={styles.itemCreator}
                        ellipsizeMode={'tail'}>
                        가락시장 {weight}
                    </Text>
                    <Text style={styles.itemDate}>{price}원</Text>
                </View>
            )}
        </View>
    );
}

// style
const styles = StyleSheet.create({
    time: { //시간
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 0.15,
        flexDirection: 'row', // 혹은 'column'
    },
    c_item1: {
        flex: 1,
        backgroundColor: '#7BBCEC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    c_item2: {
        flex: 1,
        backgroundColor: '#9CC2FB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    c_item3: {
        flex: 1,
        backgroundColor: '#0675C6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // 감싸는 아이템
    item: {
        padding: 15,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
    },
    itemTitle: {
        fontSize: 20,
        flex: 1,
        fontWeight: 'bold'
    },
    itemCreator: {
        flex: 1,
        marginTop: 8,
        fontSize: 13,
        color: '#666'
    },
    itemDate: {
        marginTop: 8,
        fontSize: 13,
        color: '#c00'
    }
})

export default NowScreen;