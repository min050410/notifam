import * as React from 'react';
import { Button, TextInput, onChangeNumber, ScrollView, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useEffect, useState } from 'react';

//components
import todayTime from 'NOTIFAM/components/todaytime';

const UselessTextInput = (props) => {
    return (
      <TextInput
        {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable
        maxLength={40}
      />
    );
  }

//search 검색 스크린
function SearchScreen() {
    
    //
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

    return (

        <View style={{ flex: 1 }}>
        <View style={styles.time}>
                <Text sytle={{ fontSize: 24 }}>{todayTime()}</Text>
        </View>
        
        <View style={styles.container}>
                <View style={styles.c_item1} ><Text style={{ fontSize: 15 }}>품목</Text></View>
                <View style={styles.c_item2} ><Text style={{ fontSize: 15 }}>거래량/등급</Text></View>
                <View style={styles.c_item3} ><Text style={{ fontSize: 15 }}>가격</Text></View>
        </View>

        {/* SearchScreen 구성 */}

        <TextInput
            style={styles.input}
            placeholder="어느 품목?"
        />
        <TextInput
            style={styles.input}
            placeholder="어느 시장?"
        />
        {/* <TextInput
            style={styles.input}
            placeholder="날짜"
        /> */}
        <Button title="Show Date Picker" onPress={showDatePicker} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
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
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
})

export default SearchScreen;