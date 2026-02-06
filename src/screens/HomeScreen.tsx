import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    Button,
    SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

// Navigation Type
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const { addToCart } = useCart();
    const { theme, toggleTheme } = useTheme();

    const isDark = theme === 'dark';
    const backgroundColor = isDark ? '#121212' : '#F5F5F5';
    const textColor = isDark ? '#FFFFFF' : '#000000';
    const cardColor = isDark ? '#1E1E1E' : '#FFFFFF';

    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={[styles.title, { color: textColor }]}>Shop Now</Text>
                <Button 
                    title={isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
                    onPress={toggleTheme}
                />
            </View>

            {/* Go to Cart Button */}
            <TouchableOpacity
                style={styles.cartButton}
                onPress={() => navigation.navigate('Cart')}
            >
                <Text style={styles.cartButtonText}>Go to Cart 🛒</Text>
            </TouchableOpacity>

            {/* Product List */}
            <FlatList
                data={PRODUCTS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.card, { backgroundColor: cardColor }]}>
                        <Image source={item.image} style={styles.image} resizeMode="contain" />

                        <View style={styles.infoContainer}>
                            <Text style={[styles.productName, { color: textColor }]}>{item.name}</Text>
                            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => addToCart(item)}
                        >
                            <Text style={styles.addButtonText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    cartButton: {
        backgroundColor: '#6200ee',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    cartButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600'
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
    addButton: {
        backgroundColor: '#03dac6',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    addButtonText: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default HomeScreen;