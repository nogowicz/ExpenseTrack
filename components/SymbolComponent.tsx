import { View, StyleSheet, Text, Pressable } from "react-native";
import { Colors } from "../constants/Colors";
import { useDispatch } from "react-redux";
import { setFromCurrency, setToCurrency } from "../store/converter";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";


type SymbolComponentProps = {
    symbol: string,
    title: string,
    from: boolean

}

function SymbolComponent({ symbol, title, from }: SymbolComponentProps) {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const dispatch = useDispatch();
    return (

        <Pressable
            style={({ pressed }) => [
                {
                    zIndex: 0.5,
                    opacity: (pressed) ? 0.5 : 1,
                },

            ]}
            onPress={() => {
                if (from) {
                    try {
                        dispatch(setFromCurrency({ fromCurrency: symbol }))
                        navigation.goBack()
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    try {
                        dispatch(setToCurrency({ toCurrency: symbol }))
                        navigation.goBack()
                    } catch (err) {
                        console.log(err)
                    }
                }
            }}
        >
            <View style={styles.container}>
                <Text style={styles.titleStyle}>{symbol}</Text>
                <Text
                    style={styles.titleStyle}>{title}</Text>
            </View>
        </Pressable>

    )
}

export default SymbolComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.separatorColor
    },
    titleStyle: {
        color: Colors.textColor,
        fontSize: 17,
        fontWeight: 'bold',
    },
    amountStyle: {
        fontWeight: 'bold',
        fontSize: 17,
    },
    dateStyle: {
        color: Colors.textColor,
    },
    hiddenItemRightContainer: {
        backgroundColor: '#d13838',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        marginTop: 10,
        alignItems: 'flex-end'
    },
    hiddenItemText: {
        color: Colors.textColor,
    },
})