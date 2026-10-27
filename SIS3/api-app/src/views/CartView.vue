<template>
  <div class="cart-view">
    <h2>Корзина / Избранное</h2>
    <p class="subtitle">Ваши выбранные товары.</p>

    <div v-if="cartItems.length > 0">
      <div class="cart-list">
        <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
          <img
            :src="item.image || 'https://via.placeholder.com/80'"
            alt=""
            class="cart-img"
          />
          <div class="cart-info">
            <h4>{{ item.name }}</h4>
            <p class="cart-price">{{ item.price }}₸</p>
          </div>
          <button @click="removeItem(index)" class="remove-btn">Удалить</button>
        </div>
      </div>
      <div class="cart-summary">
        <h3>Итого: {{ totalPrice }}₸</h3>
        <button @click="checkout" class="checkout-btn">Оформить заказ</button>
      </div>
    </div>
    <div v-else class="empty-cart">
      <p>Ваша корзина пуста.</p>
      <router-link to="/" class="go-catalog-btn">Перейти в каталог</router-link>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";

export default {
  name: "CartView",
  setup() {
    const cartItems = ref([]);

    onMounted(() => {
      const saved = localStorage.getItem("cart");
      if (saved) {
        cartItems.value = JSON.parse(saved);
      }
    });

    const totalPrice = computed(() => {
      return cartItems.value.reduce((sum, item) => sum + Number(item.price), 0);
    });

    const removeItem = (index) => {
      cartItems.value.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems.value));
    };

    const checkout = () => {
      alert("Заказ успешно оформлен!");
      cartItems.value = [];
      localStorage.removeItem("cart");
    };

    return {
      cartItems,
      totalPrice,
      removeItem,
      checkout,
    };
  },
};
</script>

<style scoped>
.cart-view {
  max-width: 800px;
  margin: 0 auto;
}
.subtitle {
  color: #666;
  margin-bottom: 1.5rem;
}
.cart-list {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}
.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}
.cart-item:last-child {
  border-bottom: none;
}
.cart-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}
.cart-info {
  flex-grow: 1;
  margin-left: 1rem;
}
.cart-price {
  font-weight: bold;
  color: #27ae60;
}
.remove-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}
.cart-summary {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.checkout-btn {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
.empty-cart {
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.go-catalog-btn {
  display: inline-block;
  margin-top: 1rem;
  background-color: #3498db;
  color: white;
  padding: 0.6rem 1.2rem;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
}
</style>
