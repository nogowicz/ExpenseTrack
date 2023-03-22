import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, Pressable, Keyboard } from 'react-native';
import { Colors } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import IconButton from "../components/IconButton";
import { Ionicons } from '@expo/vector-icons'
import CustomTextInput from "../components/CustomTextInput";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from "react";
import { Record } from "../models/Record";
import { insertRecord } from "../util/database";

function AddNewExpenseScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [showDate, setShowDate] = useState(false);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date());
    const [isSubmitButtonVisible, setIsSubmitButtonVisible] = useState(false);
    const [isIncome, setIsIncome] = useState(false);

    const onDateChange = (event: { type: string; }, selectedDate: any) => {
        if (event.type === 'set') {
            const currentDate = selectedDate;
            setShowDate(false);
            setDate(currentDate);
        } else {
            setShowDate(false);
        }
    };

    useEffect(() => {
        if (isIncome) {
            if (!amount.includes('-')) {
                setAmount("-" + amount)
            } else {
                const cleanedStr = amount.startsWith('-') ? amount.substring(1) : amount;
                setAmount(cleanedStr)
            }
        }
    }, [isIncome])

    useEffect(() => {
        if (amount.includes('-')) {
            setIsIncome(true)
        } else {
            setIsIncome(false)
        }
    }, [amount])

    useEffect(() => {
        if (title && amount && date) {
            setIsSubmitButtonVisible(true);
        } else {
            setIsSubmitButtonVisible(false);
        }
    }, [title, amount, date])


    async function handleAddExpense() {

        const recordData = new Record(title, amount, String(date))
        await insertRecord(recordData);
        Keyboard.dismiss();
    }

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <IconButton
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <Ionicons name="arrow-back" size={24} color={Colors.textColor} />
                    </IconButton>
                    <Text style={styles.titleText}>Add new record</Text>
                </View>
                <View>
                    <CustomTextInput
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        label="Title"
                        maxLength={25}
                        placeholder="ex. New keyboard"
                        keyboardType='default'
                    />
                    <View style={styles.amountAndDateContainer}>
                        <CustomTextInput
                            value={String(amount)}
                            onChangeText={(text) => {
                                const cleanText = String(text).replace(/[^0-9.-]/g, '');
                                if (!/^(-)?(\d+)?(\.\d{0,2})?$/.test(cleanText)) {
                                    return;
                                }
                                setAmount(cleanText);
                            }}

                            label="Amount"
                            maxLength={10}
                            placeholder="ex. 125.55"
                            keyboardType='number-pad'
                        />
                        <Pressable style={({ pressed }) => [
                            {
                                zIndex: 0.5,
                                opacity: (pressed) ? 0.5 : 1,
                            },
                            styles.dateAndIcon



                        ]}
                            onPress={() => setShowDate(true)}>
                            <Ionicons name="md-calendar-outline" size={24} color={Colors.textColor} />
                            <Text style={styles.dateText}>{date.toDateString()}</Text>
                        </Pressable>
                    </View>

                    <View style={styles.switchButton}>
                        <Pressable style={({ pressed }) => [
                            {
                                zIndex: 0.5,
                                opacity: (pressed) ? 0.5 : 1,
                                backgroundColor: !(isIncome) ? Colors.backgroundColor : Colors.textColor
                            },
                            styles.switch
                        ]}
                            onPress={() => setIsIncome(false)}
                        >
                            <Text style={[
                                styles.switchText,
                                !isIncome ? { color: Colors.textColor } : { color: Colors.backgroundColor }

                            ]}>Expense</Text>
                        </Pressable>

                        <Pressable style={({ pressed }) => [
                            {
                                zIndex: 0.5,
                                opacity: (pressed) ? 0.5 : 1,
                                backgroundColor: (isIncome) ? Colors.backgroundColor : Colors.textColor
                            },
                            styles.switch
                        ]}
                            onPress={() => setIsIncome(true)}
                        >
                            <Text style={[
                                styles.switchText,
                                isIncome ? { color: Colors.textColor } : { color: Colors.backgroundColor }
                            ]}>Income</Text>
                        </Pressable>
                    </View>



                    {showDate ?
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={new Date(date)}
                            mode='date'
                            is24Hour={true}
                            onChange={onDateChange}
                        />
                        : null}


                    {isSubmitButtonVisible ?
                        <Pressable
                            style={({ pressed }) => [
                                {
                                    zIndex: 0.5,
                                    opacity: (pressed) ? 0.5 : 1,
                                },
                                styles.button
                            ]}
                            onPress={() => {
                                console.log(`
                                Title: ${title}
                                Amount: ${amount}
                                Date: ${date.toDateString()}
                                `)
                                handleAddExpense();
                                navigation.goBack();
                            }}
                        >
                            <Text style={styles.buttonText}>Submit</Text>
                        </Pressable>
                        : null}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AddNewExpenseScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    container: {
        marginHorizontal: 20,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'row',
    },
    titleText: {
        color: Colors.textColor,
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    amountAndDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 40,
        justifyContent: 'space-between',
    },
    dateText: {
        color: Colors.textColor,
        fontWeight: 'bold',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: Colors.primaryColor,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30,
    },
    buttonText: {
        color: Colors.secondaryColor,
        fontWeight: 'bold',
        fontSize: 24,
    },
    dateAndIcon: {
        gap: 20,
        marginTop: 30,
    },
    switchButton: {
        backgroundColor: Colors.textColor,
        height: 30,
        marginTop: 30,
        borderRadius: 10,
        padding: 2,
        gap: 10,
        flexDirection: 'row'
    },
    switch: {
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    switchText: {
        fontWeight: 'bold'
    }
});