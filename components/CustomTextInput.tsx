import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Colors } from '../constants/Colors';

type CustomTextInputProps = {
    value: string,
    onChangeText: Dispatch<SetStateAction<string>>,
    label: string,
    maxLength: number,
    placeholder: string,
    keyboardType: KeyboardTypeOptions,
}

function CustomTextInput({ value, onChangeText, label, maxLength, placeholder, keyboardType, ...props }: CustomTextInputProps) {
    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                <Text style={styles.labelTextStyle}>{label}</Text>
            </View>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                style={styles.textInput}
                maxLength={maxLength}
                placeholder={placeholder}
                placeholderTextColor={Colors.textColor}
                keyboardType={keyboardType}
            />
        </View>
    )
}

export default CustomTextInput;

const styles = StyleSheet.create({
    container: {
        height: 65,
        position: 'relative',
        marginTop: 40,
    },
    labelContainer: {
        position: 'absolute',
        backgroundColor: Colors.backgroundColor,
        top: -15,
        left: 25,
        padding: 5,
        zIndex: 50,
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.textColor,
        justifyContent: 'flex-end',
        height: 44,
        borderRadius: 10,
        paddingHorizontal: 25,
        color: Colors.textColor
    },
    labelTextStyle: {
        color: Colors.textColor,
        fontWeight: 'bold'
    }
})