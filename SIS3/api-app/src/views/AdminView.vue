<template>
  <div class="admin-view">
    <h2>Админ-панель: Управление товарами</h2>
    <p class="subtitle">
      Здесь вы можете добавлять, редактировать и удалять товары через API.
    </p>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="successMessage" class="success">{{ successMessage }}</div>

    <div class="form-card">
      <h3>{{ isEditing ? "Редактировать товар" : "Добавить новый товар" }}</h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Название:</label>
          <input
            type="text"
            v-model="form.name"
            required
            placeholder="Например, iPhone 15"
          />
        </div>
        <div class="form-group">
          <label>Цена (₸):</label>
          <input
            type="number"
            v-model.number="form.price"
            required
            placeholder="999"
          />
        </div>
        <div class="form-group">
          <label>Ссылка на картинку:</label>
          <input type="text" v-model="form.image" placeholder="https://..." />
        </div>
        <div class="form-group">
          <label>Описание:</label>
          <textarea
            v-model="form.description"
            required
            placeholder="Описание товара..."
          ></textarea>
        </div>

        <div class="form-buttons">
          <button type="submit" class="save-btn">
            {{ isEditing ? "Сохранить изменения" : "Добавить товар" }}
          </button>
          <button
            v-if="isEditing"
            type="button"
            @click="resetForm"
            class="cancel-btn"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>

    <div class="table-container">
      <h3>Список товаров</h3>
      <div v-if="loading" class="loading">Загрузка данных...</div>

      <table v-else-if="products.length > 0" class="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Фото</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>
              <img
                :src="product.image || 'https://via.placeholder.com/50'"
                alt=""
                class="table-img"
              />
            </td>
            <td>{{ product.name }}</td>
            <td>₸{{ product.price }}</td>
            <td class="actions">
              <button @click="startEdit(product)" class="edit-btn">
                Изменить
              </button>
              <button @click="deleteProduct(product.id)" class="delete-btn">
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>Товаров пока нет.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "@/services/api";

export default {
  name: "AdminView",
  setup() {
    const products = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const successMessage = ref("");

    const form = ref({
      name: "",
      price: "",
      image: "",
      description: "",
    });

    const isEditing = ref(false);
    const editId = ref(null);

    const fetchProducts = async () => {
      try {
        loading.value = true;
        const response = await api.get("/products");
        products.value = response.data;
      } catch (err) {
        console.error(err);
        error.value = "Не удалось загрузить список товаров.";
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchProducts();
    });

    const handleSubmit = async () => {
      try {
        error.value = null;
        successMessage.value = "";

        if (isEditing.value) {
          await api.put(`/products/${editId.value}`, form.value);
          successMessage.value = "Товар успешно обновлен!";
        } else {
          await api.post("/products", form.value);
          successMessage.value = "Товар успешно добавлен!";
        }

        resetForm();
        fetchProducts();
      } catch (err) {
        console.error(err);
        error.value = "Ошибка при сохранении товара.";
      }
    };

    const startEdit = (product) => {
      isEditing.value = true;
      editId.value = product.id;
      form.value = {
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
      };
    };

    const deleteProduct = async (id) => {
      if (!confirm("Вы уверены, что хотите удалить этот товар?")) return;

      try {
        error.value = null;
        successMessage.value = "";
        await api.delete(`/products/${id}`);
        successMessage.value = "Товар успешно удален!";
        fetchProducts();
      } catch (err) {
        console.error(err);
        error.value = "Не удалось удалить товар.";
      }
    };

    const resetForm = () => {
      isEditing.value = false;
      editId.value = null;
      form.value = {
        name: "",
        price: "",
        image: "",
        description: "",
      };
    };

    return {
      products,
      loading,
      error,
      successMessage,
      form,
      isEditing,
      handleSubmit,
      startEdit,
      deleteProduct,
      resetForm,
    };
  },
};
</script>

<style scoped>
.admin-view {
  max-width: 1000px;
  margin: 0 auto;
}
.subtitle {
  color: #666;
  margin-bottom: 1.5rem;
}
.error {
  background: #f8d7da;
  color: #721c24;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}
.success {
  background: #d4edda;
  color: #155724;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}
.form-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}
.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}
.form-group label {
  font-weight: bold;
  margin-bottom: 0.3rem;
}
.form-group input,
.form-group textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.form-buttons {
  display: flex;
  gap: 1rem;
}
.save-btn {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.cancel-btn {
  background-color: #7f8c8d;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
}
.table-container {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.admin-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.admin-table th,
.admin-table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}
.admin-table th {
  background-color: #f4f6f8;
}
.table-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}
.actions {
  display: flex;
  gap: 0.5rem;
}
.edit-btn {
  background-color: #f39c12;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
}
.delete-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
}
</style>
