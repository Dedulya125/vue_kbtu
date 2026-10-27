<template>
  <div class="not-found">
    <h2>404</h2>
    <h3>Страница не найдена</h3>
    <p>Извините, запрашиваемая вами страница не существует.</p>
    <router-link to="/" class="home-btn">На главную</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFoundView",
};
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 2rem auto;
}
.not-found h2 {
  font-size: 5rem;
  color: #e74c3c;
  margin: 0;
}
.not-found h3 {
  font-size: 1.8rem;
  margin: 0.5rem 0;
}
.not-found p {
  color: #666;
  margin-bottom: 1.5rem;
}
.home-btn {
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 0.6rem 1.2rem;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
}
</style>
