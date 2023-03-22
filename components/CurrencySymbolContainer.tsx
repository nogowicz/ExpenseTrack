import { Pressable, Text, StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors';

type CurrencySymbolContainerProps = {
    symbol: string,
    onPress: () => void,
}

function CurrencySymbolContainer({ symbol, onPress }: CurrencySymbolContainerProps) {
    return (
        <Pressable style={({ pressed }) => [
            {
                zIndex: 0.5,
                opacity: (pressed) ? 0.5 : 1,
            },
            styles.container
        ]}
            onPress={onPress}
        >
            <Text style={styles.symbol}>{symbol}</Text>
        </Pressable>
    );
}

export default CurrencySymbolContainer;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primaryColor,
        width: 100,
        height: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    symbol: {
        fontWeight: 'bold',
        fontSize: 28,
        color: Colors.backgroundColor,
    },
});