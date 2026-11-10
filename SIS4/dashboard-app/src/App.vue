<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible theme="dark">
      <div class="logo">
        <h3>Student Portal</h3>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <router-link to="/">
            <span>Обзор (Dashboard)</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/courses">
            <span>Курсы и API</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/assignments">
            <span>Задания</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <router-link to="/profile">
            <span>Профиль</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 24px; display: flex; align-items: center; justify-content: space-between;">
        <h2>Личный кабинет студента</h2>
        <span style="font-weight: bold; color: #1890ff;">КБТУ | 3-й курс</span>
      </a-layout-header>

      <a-layout-content style="margin: 24px 16px 0">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view />
        </div>
      </a-layout-content>

      <a-layout-footer style="text-align: center">
        Student Dashboard ©2026 Built with Ant Design Vue & Axios
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    const collapsed = ref<boolean>(false)
    const selectedKeys = ref<string[]>(['1'])
    const route = useRoute()

    watch(
      () => route.path,
      (path) => {
        if (path === '/') selectedKeys.value = ['1']
        else if (path === '/courses') selectedKeys.value = ['2']
        else if (path === '/assignments') selectedKeys.value = ['3']
        else if (path === '/profile') selectedKeys.value = ['4']
      },
      { immediate: true }
    )

    return {
      collapsed,
      selectedKeys,
    }
  },
})
</script>

<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo h3 {
  color: white;
  margin: 0;
  font-size: 1.1rem;
}
</style>