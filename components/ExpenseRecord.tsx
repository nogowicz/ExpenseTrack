import { View, StyleSheet, Text, Pressable, TouchableWithoutFeedback, Animated, Dimensions } from "react-native";
import { Colors } from "../constants/Colors";
import { FontAwesome5 } from '@expo/vector-icons'
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";


type ExpenseRecordProps = {
    id: number | undefined,
    title: string,
    amount: string,
    date: string,
    onDelete: () => void
}

function ExpenseRecord({ id, title, amount, date, onDelete }: ExpenseRecordProps) {
    const dateAsDate = new Date(date)

    const RenderRight = (progress: any, dragX: any) => {
        const scale = dragX.interpolate({
            inputRange: [-180, 0.5],
            outputRange: [1, 0.50]
        })

        const Style: any = {
            transform: [
                {
                    scale
                }
            ],
            justifyContent: 'center',
            alignItems: 'center',
        }

        return (
            <TouchableWithoutFeedback onPress={onDelete}>
                <View style={styles.hiddenItemRightContainer}>
                    <Animated.View style={[Style]}>
                        <FontAwesome5 name="trash-alt" size={25} color='white' />
                        <Text style={[styles.hiddenItemText]}>Delete</Text>
                    </Animated.View>
                </View >
            </TouchableWithoutFeedback>
        )
    }


    return (

        <GestureHandlerRootView>
            <Swipeable
                overshootLeft={false}
                overshootRight={false}
                renderRightActions={RenderRight}

            >
                <Pressable
                    style={({ pressed }) => [
                        {
                            zIndex: 0.5,
                            opacity: (pressed) ? 0.5 : 1,
                        },

                    ]}
                >
                    <View style={styles.container}>
                        <View>
                            <Text style={styles.titleStyle}>{title}</Text>
                            <Text style={styles.dateStyle}>{dateAsDate.toDateString()}</Text>
                        </View>
                        <Text
                            style={[
                                styles.amountStyle,
                                amount.includes('-') ? { color: Colors.expenseTextColor } : { color: Colors.incomeTextColor }
                            ]}>${parseFloat(amount).toFixed(2)}</Text>
                    </View>
                </Pressable>
            </Swipeable>
        </GestureHandlerRootView >
    )
}

export default ExpenseRecord;

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