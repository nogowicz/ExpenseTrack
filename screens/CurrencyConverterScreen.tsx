import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Colors } from "../constants/Colors";
import { Octicons } from '@expo/vector-icons'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import CurrencySymbolContainer from "../components/CurrencySymbolContainer";
import CurrencyTextInput from "../components/CurrencyTextInput";
import { useSelector } from "react-redux";
// @ts-ignore
import { CURRENCY_CONVERTER_API_KEY } from '@env'

interface Symbol {
    code: string;
    description: string;
}


function CurrencyConverterScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const fromCurrencyRedux = useSelector((state: any) => state.converterSlice.fromCurrency)
    const toCurrencyRedux = useSelector((state: any) => state.converterSlice.toCurrency)
    const [symbols, setSymbols] = useState<Symbol[]>([]);
    const [result, setResult] = useState("");
    const [fromValue, setFromValue] = useState("1");


    async function convert(amount: number, from: string, to: string) {
        var myHeaders = new Headers();
        myHeaders.append("apikey", CURRENCY_CONVERTER_API_KEY);

        const requestOptions: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };



        await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setResult(data.result);
            })
            .catch(error => console.log('error', error));


    }


    useEffect(() => {
        async function fetchSymbols(): Promise<void> {
            const myHeaders = new Headers();
            myHeaders.append("apikey", CURRENCY_CONVERTER_API_KEY);

            const requestOptions: RequestInit = {
                method: 'GET',
                redirect: 'follow',
                headers: myHeaders,
            };

            const response = await fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
                .then((response) => response.json())
                .catch((error) => console.log('error', error));

            const symbols = Object.keys(response.symbols).map((code) => ({
                code,
                description: response.symbols[code] as string,
            }));

            setSymbols(symbols);
        }

        fetchSymbols();
        convert(Number(fromValue), fromCurrencyRedux, toCurrencyRedux)
    }, []);




    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Currency Converter</Text>

                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.containerRow}>
                        <CurrencySymbolContainer
                            symbol={fromCurrencyRedux}
                            onPress={() => {
                                navigation.navigate('SymbolListScreen', {
                                    symbols: symbols,
                                    from: true

                                })
                            }}
                        />
                        <CurrencyTextInput
                            from={true}
                            value={`${fromValue}`}
                            setValue={setFromValue}
                        />
                    </View>
                    <View style={styles.iconContainer}>
                        <Octicons
                            name="arrow-switch"
                            size={24}
                            color={Colors.primaryColor}
                            style={{ transform: [{ rotate: '90deg' }] }}
                        />
                    </View>
                    <View style={styles.containerRow}>
                        <CurrencySymbolContainer
                            symbol={toCurrencyRedux}
                            onPress={() => {
                                navigation.navigate('SymbolListScreen', {
                                    symbols: symbols,
                                    from: false
                                })
                            }}
                        />
                        <CurrencyTextInput
                            from={false}
                            value={`${result}`}
                            setValue={setResult}
                        />
                    </View>

                    <Pressable
                        style={({ pressed }) => [
                            {
                                zIndex: 0.5,
                                opacity: (pressed) ? 0.5 : 1,
                            },
                            styles.button
                        ]}
                        onPress={() => {
                            convert(Number(fromValue), fromCurrencyRedux, toCurrencyRedux)
                        }}
                    >
                        <Text style={styles.buttonText}>Convert</Text>
                    </Pressable>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default CurrencyConverterScreen;

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
    mainContainer: {
        marginTop: 50,
        gap: 30,
    },
    containerRow: {
        flexDirection: 'row',
        gap: 30,
    },
    button: {
        backgroundColor: Colors.primaryColor,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 0,
    },
    buttonText: {
        color: Colors.secondaryColor,
        fontWeight: 'bold',
        fontSize: 24,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});