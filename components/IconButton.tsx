import { Pressable, StyleProp, ViewStyle } from "react-native";
import { Colors } from "../constants/Colors";
import { ReactNode } from 'react'

type IconButtonProps = {
    children: ReactNode,
    onPress: () => void,
    style?: StyleProp<ViewStyle>,
}

function IconButton({ children, onPress, style }: IconButtonProps) {
    return (
        <Pressable style={({ pressed }) => [
            {
                width: 40,
                height: 40,
                borderRadius: 32 / 2,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 0.5,
                marginLeft: -10,
                backgroundColor: pressed ? Colors.separatorColor : Colors.backgroundColor,
            },
            style

        ]}
            onPress={onPress}>
            {children}
        </Pressable>
    );
}

export default IconButton