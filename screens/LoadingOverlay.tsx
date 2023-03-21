import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';

type LoadingOverlayProps = {
    message: string,
}

function LoadingOverlay({ message }: LoadingOverlayProps) {
    return (
        <View style={styles.rootContainer}>
            <Text style={styles.message}>{message}</Text>
            <Image
                style={{ width: 70, height: 70 }}
                source={require('../assets/loadingBall.gif')}
            />
        </View>
    );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    message: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        color: Colors.textColor
    },
});