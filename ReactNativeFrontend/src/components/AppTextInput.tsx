import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";
import useThemeStore from "../hooks/useTheme";

interface AppTextInputProps extends TextInputProps {
    label: string,
}

function AppTextInput({ label, style, ...rest }: AppTextInputProps) {
    const colors = useThemeStore((state) => state.colors);

    return (
        <View style={styles.wrapper}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
            <TextInput
                style={[
                    styles.input,
                    { borderColor: colors.border, color: colors.text, backgroundColor: colors.surface },
                    style,
                ]}
                placeholderTextColor={colors.textSecondary}
                {...rest}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        gap: 6,
    },
    label: {
        fontSize: 13,
        fontWeight: "500",
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 14,
        fontSize: 16,
    },
});

export default AppTextInput;
