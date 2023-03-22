import { Pressable, Text, StyleSheet, TextInput } from 'react-native'
import { Colors } from '../constants/Colors';
import { Dispatch, SetStateAction, useState } from 'react';

type CurrencyTextInputProps = {
    value: string,
    setValue: Dispatch<SetStateAction<string>>,
    from: boolean

}

function CurrencyTextInput({ value, setValue, from }: CurrencyTextInputProps) {

    return (
        <TextInput
            style={styles.container}
            value={value}
            editable={from}
            keyboardType='number-pad'
            onChangeText={(text) => {
                function isNumber(text: any) {
                    return !isNaN(parseFloat(text)) && isFinite(text);
                }
                if (isNumber(text) || text.length < 1) {
                    setValue(text)
                }

            }}

        />
    );
}

export default CurrencyTextInput;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.secondaryColor,
        flex: 1,
        height: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        color: Colors.textColor,
        fontSize: 20,
        padding: 20,
    },

});