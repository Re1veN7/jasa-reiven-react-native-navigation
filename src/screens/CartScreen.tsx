import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert, TextInput, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

const CartScreen = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const { cart, incrementQuantity, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const backgroundColor = isDark ? '#121212' : '#f5f5f5';
  const textColor = isDark ? '#ffffff' : '#000000';
  const cardColor = isDark ? '#1e1e1e' : '#ffffff';

  const handleDecrement = (id: string, currentQuantity: number) => {
    if (currentQuantity === 1) {
        Alert.alert(
            "Remove Product",
            "Are you sure you want to remove this product from the cart?",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Remove",
                    onPress: () => removeFromCart(id),
                    style: "destructive"
                }
            ]
        );
    } else {
        removeFromCart(id);
    }
  };

  const handleInputChange = (text: string, id: string) => {
    const cleanNumber = text.replace(/[^0-9]/g, '');
    const quantity = parseInt(cleanNumber, 10);

    if (!isNaN(quantity) && quantity > 0) {
        updateQuantity(id, quantity);
    }   else if (text === '') {
        // If user clears the input, don't update immediately or set to 1
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <Header />
        <View style={styles.contentContainer}>
            <Text style={[styles.header, { color: textColor }]}>Your Cart</Text>
        </View>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={[styles.emptyText, { color: textColor }]}>Your cart is empty.</Text>}
        renderItem={({ item }) => (
          <View style={[styles.cartItem, { backgroundColor: cardColor }]}>
            <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
            <View style={styles.itemDetails}>
              <Text style={[styles.name, { color: textColor }]}>{item.name}</Text>
              <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
            
            <View style={styles.controls}>
              <TouchableOpacity onPress={() => handleDecrement(item.id, item.quantity)} style={styles.button}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              
              <TextInput 
                style={[styles.input, { color: textColor, borderColor: isDark ? '#555' : '#ccc' }]}
                value={String(item.quantity)}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange(text, item.id)}
                maxLength={3} 
            />
              
              <TouchableOpacity onPress={() => incrementQuantity(item.id)} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={[styles.footer, { borderTopColor: isDark ? '#333' : '#ddd' }]}>
        <Text style={[styles.totalText, { color: textColor }]}>Total: ${totalPrice.toFixed(2)}</Text>
        <TouchableOpacity 
          style={[styles.checkoutButton, { opacity: cart.length === 0 ? 0.5 : 1 }]} 
          disabled={cart.length === 0}
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 16,
    borderRadius: 8,
  },
  itemDetails: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#888', marginTop: 4 },
  controls: { flexDirection: 'row', alignItems: 'center' },
  button: {
    width: 30,
    height: 30,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: 'black' },

  input: {
    marginHorizontal: 10,
    fontSize: 16,
    textAlign: 'center',
    width: 40,
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    padding: 0,
  },

  quantity: { marginHorizontal: 12, fontSize: 16 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 18 },
  footer: { paddingVertical: 20, borderTopWidth: 1 },
  totalText: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'right' },
  checkoutButton: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default CartScreen;