<template>
  <div>
    <h2>Список заданий и дедлайны</h2>
    <a-list item-layout="horizontal" :dataSource="assignments">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.date">
            <template #title>
              <a href="#">{{ item.title }}</a>
            </template>
          </a-list-item-meta>
          <a-tag :color="item.status === 'Сдано' ? 'green' : 'orange'">{{ item.status }}</a-tag>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const assignments = ref([
      { title: 'Лабораторная работа №3 по Vue.js', date: 'Дедлайн: 15 ноября 2026', status: 'Сдано' },
      { title: 'Проект по кибербезопасности (Anti-Cheat)', date: 'Дедлайн: 25 ноября 2026', status: 'В процессе' },
      { title: 'Анализ данных в Python (pandas / scikit-learn)', date: 'Дедлайн: 30 ноября 2026', status: 'В процессе' },
    ])
    return { assignments }
  }
})
</script>