import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";

const Header = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { theme, toggleTheme } = useTheme();
  const { cart } = useCart();

  const isDark = theme === "dark";
  const textColor = isDark ? "#ffffff" : "#000000";
  const containerColor = isDark ? "#1f1f1f" : "#ffffff";

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getTabStyle = (tabName: string) => {
    return {
      color: route.name === tabName ? "#6200ee" : textColor,
      fontWeight: route.name === tabName ? "bold" : "normal",
      marginRight: 15,
      fontSize: 16,
    } as const;
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: containerColor,
          borderBottomColor: isDark ? "#333" : "#eee",
        },
      ]}
    >
      {/* Navigation Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={getTabStyle("Home")}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Text style={getTabStyle("Cart")}>
            Cart {totalItems > 0 ? `(${totalItems})` : ""}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Theme Toggle (Emoji) on the far right */}
      <TouchableOpacity onPress={toggleTheme}>
        <Text style={styles.emoji}>{isDark ? "🌙" : "☀️"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  tabsContainer: {
    flexDirection: "row",
  },
  emoji: {
    fontSize: 22,
  },
});

export default Header;
