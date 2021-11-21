import * as React from 'react';
import {TextInput, ActivityIndicator, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from 'react';
import { parseString } from 'xml2js';
import todayTime from 'NOTIFAM/components/todaytime';

//date 포멧 
Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };

//search 검색 스크린
function SearchScreen() {

    const [isLoading, setLoading] = useState(true)
    // 농작물 이름
    const [data, setData] = useState([]);
    // 농작물 가격
    const [price, setPrice] = useState([]);
    // 농작물 무게
    const [weight, setWeight] = useState([]);
    // 농작물 품질
    const [quality, setQuality] = useState([]);

    const [text, onChangeText] = useState("");
    const [realtext, realonChangeText] = useState("");
    const [vagetable, setVagetable] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    //api 통신
    const getPrice = async (yd, texts) => {
        try {
            const response = await fetch('https://www.garak.co.kr/publicdata/dataOpen.do?id=3098&passwd=qkrandjs1%21&dataid=data4&pagesize=10&pageidx=1&portal.templet=false&p_ymd=' + yd + '&p_jymd=20211110&d_cd=2&p_jjymd=' + yd + '&p_pos_gubun=1&pum_nm=' + texts);
            const text = await response.text();
            parseString(text, function (err, result) {
                setData(result['lists']['list'][2]['PUM_NM_A']);
                setPrice(result['lists']['list'][2]['PAV_P_A']);
                setWeight(result['lists']['list'][2]['U_NAME']);
                setQuality(result['lists']['list'][2]['E_NAME']);
            })
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    //date picker
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // const value = date.format("MMdd");
        // console.warn("dateFormat: ", value);"
        hideDatePicker();
        onChangeText(date.format("yy/MM/dd"))
        realonChangeText("20"+date.format("yyMMdd"))
        //realtext가 검색에 활용됨
    };

    const submit = () => {

        getPrice(realtext, vagetable);

    }

    return (

        <View style={{ flex: 1 }}>
            <View style={styles.time}>
                <Text sytle={{ fontSize: 24 }}>{todayTime()}</Text>
                <Text sytle={{ fontSize: 24 }}>서울특별시 가락시장 기준입니다</Text>
            </View>

            {/* SearchScreen 구성 */}
            <View style={styles.container2}>
                <TextInput
                    style={styles.textInput}
                    placeholder="어느 품목?"
                    onChangeText={text => setVagetable(text)}
                    value={vagetable}
                />
            </View>

            <View style={styles.container2}>
                <TouchableOpacity onPress={showDatePicker}>
                    <TextInput
                        pointerEvents="none"
                        style={styles.textInput}
                        placeholder="날짜를 입력해주세요"
                        underlineColorAndroid="transparent"
                        editable={false}
                        value={text}
                    />

                    <DateTimePickerModal
                        headerTextIOS="날짜를 입력해주세요"
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={submit}>
                    <View style={styles.textInput}></View>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <View style={styles.c_item1} ><Text style={{ fontSize: 15 }}>품목</Text></View>
                <View style={styles.c_item2} ><Text style={{ fontSize: 15 }}>거래량/등급</Text></View>
                <View style={styles.c_item3} ><Text style={{ fontSize: 15 }}>가격</Text></View>
            </View>
            {isLoading ? (<ActivityIndicator/>) : (
            <View style={styles.item}>
                <Text style={styles.itemTitle}
                    ellipsizeMode={'tail'}>{data}</Text>
                <Text style={styles.itemCreator}
                    ellipsizeMode={'tail'}>
                    품질 : {quality}  {weight}
                </Text>
                <Text style={styles.itemDate}>{price}원</Text>
            </View>
            )}
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
    time: { //시간
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 0.1,
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
    // input: {
    //     height: 40,
    //     margin: 12,
    //     borderWidth: 1,
    //     padding: 10,
    // },
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
        borderRadius: 12,
        padding: 10
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

export default SearchScreen;