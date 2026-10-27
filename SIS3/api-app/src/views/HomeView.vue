<template>
  <div class="home">
    <h2>Каталог товаров</h2>

    <div v-if="loading" class="loading">Загрузка товаров...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="!loading && !error" class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img
          :src="product.image || 'https://via.placeholder.com/150'"
          :alt="product.name"
          class="product-img"
        />
        <h3>{{ product.name }}</h3>
        <p class="price">{{ product.price }}₸</p>
        <p class="desc">{{ product.description }}</p>

        <div class="card-actions">
          <router-link :to="`/product/${product.id}`" class="details-btn"
            >Подробнее</router-link
          >
          <button @click="addToCart(product)" class="buy-btn">В корзину</button>
        </div>
      </div>
    </div>

    <div v-if="!loading && !error && products.length === 0" class="empty">
      Товаров пока нет. Добавьте их через админ-панель!
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "@/services/api";

export default {
  name: "HomeView",
  setup() {
    const products = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const fetchProducts = async () => {
      try {
        loading.value = true;
        error.value = null;
        const response = await api.get("/products");
        products.value = response.data;
      } catch (err) {
        console.error(err);
        error.value =
          "Не удалось загрузить товары с сервера. Попробуйте позже.";
      } finally {
        loading.value = false;
      }
    };

    const addToCart = (product) => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`Товар "${product.name}" добавлен в корзину!`);
    };

    onMounted(() => {
      fetchProducts();
    });

    return {
      products,
      loading,
      error,
      addToCart,
    };
  },
};
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}
.loading,
.error,
.empty {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
}
.error {
  color: #e74c3c;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}
.product-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.product-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
}
.price {
  font-weight: bold;
  color: #27ae60;
  font-size: 1.1rem;
}
.desc {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
.card-actions {
  display: flex;
  gap: 0.5rem;
}
.details-btn,
.buy-btn {
  flex: 1;
  padding: 0.5rem 0.5rem;
  text-align: center;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  border: none;
}
.details-btn {
  background-color: #3498db;
  color: white;
}
.details-btn:hover {
  background-color: #2980b9;
}
.buy-btn {
  background-color: #27ae60;
  color: white;
}
.buy-btn:hover {
  background-color: #219653;
}
</style>
