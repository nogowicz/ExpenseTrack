import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../constants/Colors';
import SymbolComponent from '../components/SymbolComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import IconButton from '../components/IconButton';
import { Ionicons } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


function SymbolListScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<any>();
    const { symbols, from } = route.params;
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
                    <Text style={styles.titleText}>Select currency symbol</Text>
                </View>
                <ScrollView>
                    {symbols.map((symbol: any) => (
                        <SymbolComponent
                            key={symbol.code}
                            symbol={symbol.code}
                            title={symbol.description}
                            from={from}
                        />
                    ))}
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

export default SymbolListScreen;

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
})