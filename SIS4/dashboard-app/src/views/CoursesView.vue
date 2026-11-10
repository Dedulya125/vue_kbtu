<template>
  <div class="courses-container">
    <h2>Список учебных курсов</h2>
    <p class="subtitle">Данные загружаются с сервера с обработкой асинхронных состояний.</p>

    <div v-if="loading" class="state-container">
      <a-spin size="large" tip="Загрузка курсов с сервера..." />
    </div>

    <div v-else-if="error" class="state-container">
      <a-alert type="error" show-icon message="Ошибка загрузки данных" :description="error" />
      <a-button type="primary" style="margin-top: 16px" @click="fetchCourses"
        >Повторить попытку</a-button
      >
    </div>

    <div v-else>
      <a-table :dataSource="courses" :columns="columns" row-key="id" bordered>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'image'">
            <img
              :src="record.image || 'https://via.placeholder.com/60'"
              alt=""
              class="course-img"
            />
          </template>
          <template v-else-if="column.key === 'price'">
            <span style="color: #52c41a; font-weight: bold">${{ record.price }}</span>
          </template>
          <template v-if="column.key === 'Image'">
            <img
              :src="record.Image || 'https://via.placeholder.com/60'"
              alt=""
              class="course-img"
            />
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'

interface Course {
  id: string
  Name: string
  Credit: number
  Description: string
  Image: string
}

export default defineComponent({
  name: 'CoursesView',
  setup() {
    const courses = ref<Course[]>([])
    const loading = ref<boolean>(true)
    const error = ref<string | null>(null)

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Обложка',
        key: 'Image',
      },
      {
        title: 'Название курса',
        dataIndex: 'Name',
        key: 'Name',
      },
      {
        title: 'Стоимость / Кредиты',
        dataIndex: 'Credit',
        key: 'Credit',
      },
      {
        title: 'Описание',
        dataIndex: 'Description',
        key: 'Description',
      },
    ]

    const fetchCourses = async () => {
      try {
        loading.value = true
        error.value = null

        const response = await axios.get(
          'https://6af2bb3642c6561ced39736c.mockapi.io/api/data/courses',
        )
        courses.value = response.data
      } catch (err: any) {
        console.error(err)
        error.value =
          'Не удалось получить данные от сервера. Проверьте интернет-соединение или адрес API.'
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchCourses()
    })

    return {
      courses,
      loading,
      error,
      columns,
      fetchCourses,
    }
  },
})
</script>

<style scoped>
.courses-container {
  padding: 10px;
}
.subtitle {
  color: #666;
  margin-bottom: 24px;
}
.state-container {
  text-align: center;
  padding: 50px 0;
}
.course-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}
</style>
