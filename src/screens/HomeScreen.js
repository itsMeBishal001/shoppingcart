import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";

const { width } = Dimensions.get("window");
const numColumns = width > 768 ? 3 : 2;
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - (numColumns + 1) * CARD_MARGIN * 2) / numColumns;

// Header Component
const Header = () => {
  const navigation = useNavigation();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.logo}>E-Shop</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
            style={styles.cartButton}
          >
            <Text style={styles.cartIcon}>🛒</Text>
            {cartQuantity > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartQuantity}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Product Card Component
const ProductCard = ({ product, onAddToCart }) => {
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          transform: [{ scale: scaleAnim }],
          width: CARD_WIDTH,
        },
      ]}
    >
      <View style={styles.card}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.cardContent}>
          <Text numberOfLines={2} style={styles.title}>
            {product.title}
          </Text>
          <Text numberOfLines={3} style={styles.description}>
            {product.description}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => onAddToCart(product)}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

// Error View Component
const ErrorView = ({ error, onRetry }) => (
  <View style={styles.centered}>
    <Image
      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5741/5741333.png' }}
      style={styles.errorImage}
    />
    <Text style={styles.errorText}>{error}</Text>
    <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
      <Text style={styles.retryText}>Try Again</Text>
    </TouchableOpacity>
  </View>
);

// Main Home Screen Component
export default function HomeScreen() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchProducts()).finally(() => setRefreshing(false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = useCallback((product) => {
    dispatch(addToCart(product));
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <ProductCard product={item} onAddToCart={handleAddToCart} />
  );

  if (status === "loading" && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (status === "failed") {
    return <ErrorView error={error} onRetry={onRefresh} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
        refreshing={refreshing}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products available</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartIcon: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  filterButtonText: {
    color: '#1a1a1a',
    fontSize: 14,
    fontWeight: '500',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    padding: CARD_MARGIN,
  },
  row: {
    justifyContent: 'flex-start',
  },
  cardContainer: {
    margin: CARD_MARGIN,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: '#f0f0f0',
  },
  cardContent: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  errorImage: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 32,
  },
});