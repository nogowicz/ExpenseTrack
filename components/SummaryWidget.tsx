import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/Colors";


type SummaryWidgetProps = {
    title: string,
    amount: string
}

function SummaryWidget({ title, amount }: SummaryWidgetProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>{title}</Text>
            <Text style={styles.amountStyle}>{amount.includes('-') ? `-$${parseFloat(amount.replace('-', "")).toFixed(2)}` :
                `$${parseFloat(amount).toFixed(2)}`}</Text>
        </View>
    )
}

export default SummaryWidget;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.secondaryColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        marginVertical: 20,
    },
    titleStyle: {
        color: Colors.textColor,
        fontSize: 14,
    },
    amountStyle: {
        color: Colors.primaryColor,
        fontWeight: 'bold',
        fontSize: 17,
    }
})