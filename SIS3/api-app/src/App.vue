<template>
  <div id="app">
    <header class="app-header">
      <h1>Vue E-Commerce Store</h1>
      <nav class="navbar">
        <router-link to="/">Главная</router-link>
        <router-link to="/cart">Корзина</router-link>
        <router-link to="/admin">Админ-панель</router-link>
        <router-link to="/login">Вход</router-link>
      </nav>
    </header>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #f4f6f8;
}
.app-header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar {
  display: flex;
  gap: 1.5rem; /* Добавляет отступы между ссылками */
}
.navbar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
.navbar a.router-link-exact-active {
  color: #42b983;
}
.main-content {
  padding: 2rem;
}
</style>
