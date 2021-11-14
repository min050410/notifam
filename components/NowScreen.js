import * as React from 'react';
import { ActivityIndicator, Text, View, StyleSheet, ScrollView } from 'react-native';
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

    let [total, setTotal] = useState([]);
    let [totalprice, setTotalprice] = useState([]);

   

    //api 통신
    const getPrice = async (texts) => {
        try {
            const response = await fetch('https://www.garak.co.kr/publicdata/dataOpen.do?id=3098&passwd=qkrandjs1%21&dataid=data4&pagesize=10&pageidx=1&portal.templet=false&p_ymd=20211111&p_jymd=20211110&d_cd=2&p_jjymd=20201111&p_pos_gubun=1&pum_nm='+texts);
            const text = await response.text();
            parseString(text, function (err, result) {
                setData(result['lists']['list'][0]['PUM_NM_A']);
                setPrice(result['lists']['list'][0]['AV_P_A']);
                setWeight(result['lists']['list'][0]['U_NAME']);
                
                setTotalprice(totalprice.concat(price)),
                setTotal(total.concat(weight))
                console.log(totalprice)
            })
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // onClick={()=>changeFilter(column)}

    const menus = ["고구마", "감자", "배추", "상추"]

    const menuList = menus.map((menu, index) => (
        
        useEffect(() => {
            getPrice(menu);
        }, []),

        <View style={styles.item} key={index}>
            <Text style={styles.itemTitle}
            ellipsizeMode={'tail'}>{menu}</Text>
            <Text style={styles.itemCreator}
            ellipsizeMode={'tail'}>
            가락시장 {total[index]}
            </Text>
            <Text style={styles.itemDate}>{totalprice[index]}원</Text>
        </View>
    ))
    
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
                {menuList}
            </ScrollView>
        </View>
    );
}

// style
const styles = StyleSheet.create({
    time: { //시간
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 0.2,
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