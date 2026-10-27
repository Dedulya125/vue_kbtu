<template>
  <div class="login-view">
    <div class="login-card">
      <h2>Вход в систему</h2>
      <p class="subtitle">Введите любые данные для входа в админ-панель</p>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Логин:</label>
          <input type="text" v-model="username" required placeholder="admin" />
        </div>
        <div class="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            v-model="password"
            required
            placeholder="******"
          />
        </div>
        <button type="submit" class="login-btn">Войти</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "LoginView",
  setup() {
    const username = ref("");
    const password = ref("");
    const router = useRouter();

    const handleLogin = () => {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/admin");
    };

    return {
      username,
      password,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}
.login-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}
.subtitle {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
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
.form-group input {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.login-btn {
  width: 100%;
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.7rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
}
.login-btn:hover {
  background-color: #2980b9;
}
</style>
