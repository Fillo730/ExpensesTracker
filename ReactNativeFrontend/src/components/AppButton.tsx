import { Pressable, Text, StyleSheet, ActivityIndicator, GestureResponderEvent } from "react-native";
import useThemeStore from "../hooks/useTheme";

interface AppButtonProps {
    title: string,
    onPress: (event: GestureResponderEvent) => void,
    variant?: "primary" | "secondary",
    disabled?: boolean,
    loading?: boolean,
}

function AppButton({ title, onPress, variant = "primary", disabled = false, loading = false }: AppButtonProps) {
    const colors = useThemeStore((state) => state.colors);
    const isDisabled = disabled || loading;

    const isPrimary = variant === "primary";
    const backgroundColor = isPrimary ? colors.primary : "transparent";
    const textColor = isPrimary ? colors.onPrimary : colors.primary;

    return (
        <Pressable
            onPress={onPress}
            disabled={isDisabled}
            style={({ pressed }) => [
                styles.button,
                { backgroundColor, borderColor: colors.primary, borderWidth: isPrimary ? 0 : 1 },
                isDisabled && styles.disabled,
                pressed && !isDisabled && styles.pressed,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <Text style={[styles.text, { color: textColor }]}>{title}</Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 48,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    text: {
        fontSize: 16,
        fontWeight: "600",
    },
    disabled: {
        opacity: 0.5,
    },
    pressed: {
        opacity: 0.85,
    },
});

export default AppButton;
