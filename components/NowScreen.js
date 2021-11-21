import * as React from 'react';
import { ActivityIndicator, Text, View, StyleSheet, ScrollView } from 'react-native';
import { parseString } from 'xml2js';
import { useEffect, useState } from 'react';

//components
import todayTime from 'NOTIFAM/components/todaytime';


// 현재가를 알려주는 스크린
function NowScreen() {
    const [isLoading, setLoading] = useState(true)

    // 이렇게 한 이유 비동기 통신이라 계속 값이 바뀌고 배열에도 잘 안들어감
    // 24시간동안 하다가 결국은 이 방식을 씀
    // 나중에 꼭 수정하겠음

    // 농작물 이름
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);
    const [data5, setData5] = useState([]);
   
    // 농작물 가격
    const [price, setPrice] = useState([]);
    const [price2, setPrice2] = useState([]);
    const [price3, setPrice3] = useState([]);
    const [price4, setPrice4] = useState([]);
    const [price5, setPrice5] = useState([]);
 
    // 농작물 무게
    const [weight, setWeight] = useState([]);
    const [weight2, setWeight2] = useState([]);
    const [weight3, setWeight3] = useState([]);
    const [weight4, setWeight4] = useState([]);
    const [weight5, setWeight5] = useState([]);
   
    
    // 농작물 시장
    const [marketname, setMarketname] = useState([]);
    const [marketname2, setMarketname2] = useState([]);
    const [marketname3, setMarketname3] = useState([]);
    const [marketname4, setMarketname4] = useState([]);
    const [marketname5, setMarketname5] = useState([]);
    

    //api 통신
    const getPrice = async () => {
        try {

            const todaytime = todayTime();
            // 전날 => newTime
            const newTime = todaytime.substring(0, 4) + todaytime.substring(6, 8) + (Number(todaytime.substring(10, 12)) - 1).toString()
            const response = await fetch('http://openapi.epis.or.kr/openapi/service/RltmAucBrknewsService/getPrdlstRltmAucBrknewsList?serviceKey=Yf8CKY2ztyZit92xmxsHJJLZr%2B47fcT4dDiZyhelKmqkjcATuJ4oCLfUWDeNHJuMA%2BNvXz9UhBTyV%2B8ZQdT8WQ%3D%3D&scode=&marketco=&cocode=&dates=' + newTime + '&lcode=&mcode=&numOfRows=250&pageNo=250');
            const text = await response.text();
            parseString(text, function (err, result) {
                console.log(result['response']['body'])
                setData(result['response']['body'][0]['items'][0]['item'][0]['mclassname']);
                setPrice(result['response']['body'][0]['items'][0]['item'][0]['price']);
                setWeight(result['response']['body'][0]['items'][0]['item'][0]['unitname']);
                setMarketname(result['response']['body'][0]['items'][0]['item'][0]['marketname']);

                setData2(result['response']['body'][0]['items'][0]['item'][1]['mclassname']);
                setPrice2(result['response']['body'][0]['items'][0]['item'][1]['price']);
                setWeight2(result['response']['body'][0]['items'][0]['item'][1]['unitname']);
                setMarketname2(result['response']['body'][0]['items'][0]['item'][1]['marketname']);

                setData3(result['response']['body'][0]['items'][0]['item'][2]['mclassname']);
                setPrice3(result['response']['body'][0]['items'][0]['item'][2]['price']);
                setWeight3(result['response']['body'][0]['items'][0]['item'][2]['unitname']);
                setMarketname3(result['response']['body'][0]['items'][0]['item'][2]['marketname']);

                setData4(result['response']['body'][0]['items'][0]['item'][3]['mclassname']);
                setPrice4(result['response']['body'][0]['items'][0]['item'][3]['price']);
                setWeight4(result['response']['body'][0]['items'][0]['item'][3]['unitname']);
                setMarketname4(result['response']['body'][0]['items'][0]['item'][3]['marketname']);

                setData5(result['response']['body'][0]['items'][0]['item'][4]['mclassname']);
                setPrice5(result['response']['body'][0]['items'][0]['item'][4]['price']);
                setWeight5(result['response']['body'][0]['items'][0]['item'][4]['unitname']);
                setMarketname5(result['response']['body'][0]['items'][0]['item'][4]['marketname']);
            
            })
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    getPrice();

    console.log(data);
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
            <ScrollView>
                <View style={styles.item}>
                    <Text style={styles.itemTitle}
                        ellipsizeMode={'tail'}>{data}</Text>
                    <Text style={styles.itemCreator}
                        ellipsizeMode={'tail'}>
                        {marketname} {weight}
                    </Text>
                    <Text style={styles.itemDate}>{price}원</Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.itemTitle}
                        ellipsizeMode={'tail'}>{data2}</Text>
                    <Text style={styles.itemCreator}
                        ellipsizeMode={'tail'}>
                        {marketname2} {weight2}
                    </Text>
                    <Text style={styles.itemDate}>{price2}원</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemTitle}
                        ellipsizeMode={'tail'}>{data3}</Text>
                    <Text style={styles.itemCreator}
                        ellipsizeMode={'tail'}>
                        {marketname3} {weight3}
                    </Text>
                    <Text style={styles.itemDate}>{price3}원</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemTitle}
                        ellipsizeMode={'tail'}>{data4}</Text>
                    <Text style={styles.itemCreator}
                        ellipsizeMode={'tail'}>
                        {marketname4} {weight4}
                    </Text>
                    <Text style={styles.itemDate}>{price4}원</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemTitle}
                        ellipsizeMode={'tail'}>{data5}</Text>
                    <Text style={styles.itemCreator}
                        ellipsizeMode={'tail'}>
                        {marketname5} {weight5}
                    </Text>
                    <Text style={styles.itemDate}>{price5}원</Text>
                </View>
                
            </ScrollView>
        </View>
    );
}

// style
const styles = StyleSheet.create({

    time: { //시간
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 0.8,
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
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 1,
        flex: 0,
        flexDirection: 'row',
    },
    itemTitle: {
        fontSize: 18,
        flex: 1,
        fontWeight: 'bold'
    },
    itemCreator: {
        flex: 1,
        fontSize: 15,
        color: '#666'
    },
    itemDate: {
        marginTop: 8,
        fontSize: 18,
        color: '#c00'
    }
})

export default NowScreen;