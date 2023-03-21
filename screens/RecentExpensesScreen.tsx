import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { Colors } from "../constants/Colors";
import SummaryWidget from "../components/SummaryWidget";
import ExpenseRecord from "../components/ExpenseRecord";
import { Ionicons } from '@expo/vector-icons'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RecordProp, deleteRecord, fetchRecords } from "../util/database";
import { useEffect, useState } from "react";
import { useIsFocused } from '@react-navigation/native'
import LoadingOverlay from "./LoadingOverlay";

function RecentExpensesScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [loadedData, setLoadedData] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const [summaryAmount, setSummaryAmount] = useState(0);
    const isFocused = useIsFocused();
    let fetchedRecords: any;


    const currentDate = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(currentDate.getDate() - 7);



    async function loadRecords() {
        fetchedRecords = await fetchRecords();
        setLoadedData(fetchedRecords);

    }

    const filteredData = loadedData.filter((record: RecordProp) => {
        const recordDate = new Date(record.date);
        return recordDate >= weekAgo && recordDate <= currentDate;
    });



    async function deleteRecordHandler(id: number) {
        await deleteRecord(id);
        loadRecords();
    }

    useEffect(() => {
        loadRecords().then(() => {
            setInitialized(true);
        })
    }, [isFocused])

    useEffect(() => {
        let totalAmount = filteredData.reduce((acc: number, record: any) => {
            return acc + parseFloat(record.amount);
        }, 0);
        setSummaryAmount(totalAmount);
    }, [loadedData]);


    if (!initialized) {
        return <LoadingOverlay message="Loading..." />
    }

    if ((!loadedData.length)) {
        return (
            <SafeAreaView style={styles.root}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Expenses Tracker</Text>
                        <Pressable style={({ pressed }) => [
                            {
                                zIndex: 0.5,
                                opacity: (pressed) ? 0.5 : 1,
                            },

                        ]}
                            onPress={() => {
                                navigation.navigate('AddNewExpenseScreen')
                            }}
                        >
                            <Ionicons name="add-circle-outline" size={28} color={Colors.primaryColor} />
                        </Pressable>
                    </View>

                    <View style={styles.recentExpensesContainer}>
                        <SummaryWidget title="Your last week" amount={String(summaryAmount)} />
                        <Text style={styles.sectionTitle}>Your recent expenses</Text>

                        <View style={{
                            marginTop: 200,
                            alignItems: 'center',
                        }}>
                            <Text style={styles.sectionTitle}>You don't have any records yet!</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }



    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Expenses Tracker</Text>
                    <Pressable style={({ pressed }) => [
                        {
                            zIndex: 0.5,
                            opacity: (pressed) ? 0.5 : 1,
                        },

                    ]}
                        onPress={() => {
                            navigation.navigate('AddNewExpenseScreen')
                        }}
                    >
                        <Ionicons name="add-circle-outline" size={28} color={Colors.primaryColor} />
                    </Pressable>
                </View>

                <View style={styles.recentExpensesContainer}>
                    <SummaryWidget title="Your last week" amount={String(summaryAmount)} />
                    <Text style={styles.sectionTitle}>Your recent expenses</Text>

                    <ScrollView>
                        {filteredData.map((item: RecordProp) => {
                            // console.log(item)
                            return (
                                <ExpenseRecord
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    amount={item.amount}
                                    date={item.date}
                                    onDelete={() => deleteRecordHandler(Number(item.id))}
                                />
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default RecentExpensesScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    container: {
        marginHorizontal: 20,
        flex: 1,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleText: {
        color: Colors.textColor,
        fontSize: 22,
        fontWeight: 'bold',
    },
    recentExpensesContainer: {
        flex: 1,
    },
    sectionTitle: {
        color: Colors.textColor,
        fontSize: 15,
        fontWeight: 'bold',
    }
});