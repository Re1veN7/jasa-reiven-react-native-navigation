import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

type CheckoutScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Checkout'>;

const CheckoutScreen = () => {
  const navigation = useNavigation<CheckoutScreenNavigationProp>();
  const { cart, totalPrice, clearCart } = useCart();
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const backgroundColor = isDark ? '#121212' : '#f5f5f5';
  const textColor = isDark ? '#ffffff' : '#000000';

  const handleCheckout = () => {
    Alert.alert(
      'Success',
      'Checkout successful',
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart(); // Optional: Clean up cart after purchase
            navigation.navigate('Home');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.header, { color: textColor }]}>Order Summary</Text>
      
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.text, { color: textColor }]}>{item.name} x {item.quantity}</Text>
            <Text style={[styles.text, { color: textColor }]}>${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, { color: textColor }]}>Grand Total:</Text>
          <Text style={styles.totalAmount}>${totalPrice.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={handleCheckout}>
          <Text style={styles.payButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingBottom: 8
  },
  text: { fontSize: 16 },
  footer: { marginTop: 20 },
  totalRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20 
  },
  totalLabel: { fontSize: 20, fontWeight: 'bold' },
  totalAmount: { fontSize: 20, fontWeight: 'bold', color: '#6200ee' },
  payButton: {
    backgroundColor: '#03dac6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: { color: 'black', fontSize: 18, fontWeight: 'bold' },
});

export default CheckoutScreen;