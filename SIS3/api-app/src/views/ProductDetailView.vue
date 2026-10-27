<template>
  <div class="product-detail">
    <router-link to="/" class="back-btn">&larr; Назад к каталогу</router-link>

    <div v-if="loading" class="loading">Загрузка информации о товаре...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="!loading && !error && product" class="detail-container">
      <img
        :src="product.image || 'https://via.placeholder.com/300'"
        :alt="product.name"
        class="detail-img"
      />
      <div class="detail-info">
        <h2>{{ product.name }}</h2>
        <p class="detail-price">{{ product.price }}₸</p>
        <p class="detail-desc">
          <strong>Описание:</strong> {{ product.description }}
        </p>
        <p class="detail-id"><strong>ID товара:</strong> {{ product.id }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "@/services/api";

export default {
  name: "ProductDetailView",
  setup() {
    const route = useRoute();
    const product = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const fetchProductDetail = async () => {
      try {
        loading.value = true;
        error.value = null;
        const productId = route.params.id;
        const response = await api.get(`/products/${productId}`);
        product.value = response.data;
      } catch (err) {
        console.error(err);
        error.value =
          "Не удалось загрузить данные товара. Возможно, он был удален.";
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchProductDetail();
    });

    return {
      product,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
.product-detail {
  max-width: 900px;
  margin: 0 auto;
}
.back-btn {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
}
.back-btn:hover {
  text-decoration: underline;
}
.loading,
.error {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
}
.error {
  color: #e74c3c;
}
.detail-container {
  display: flex;
  gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.detail-img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 6px;
}
.detail-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.detail-info h2 {
  margin-top: 0;
  color: #2c3e50;
}
.detail-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #27ae60;
  margin: 1rem 0;
}
.detail-desc {
  color: #555;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}
.detail-id {
  color: #888;
  font-size: 0.85rem;
}
</style>
