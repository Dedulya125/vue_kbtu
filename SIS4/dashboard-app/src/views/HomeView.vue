<template>
  <div>
    <h2>Обзор студента</h2>
    <p>Добро пожаловать в ваш личный кабинет Student Dashboard!</p>
    
    <a-row :gutter="16" style="margin-top: 24px;">
      <a-col :span="8">
        <a-card title="Текущий GPA" bordered>
          <h1 style="color: #1890ff; margin: 0;">3.75</h1>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="Активные курсы" bordered>
          <h1 style="color: #52c41a; margin: 0;">5</h1>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="Задолженности" bordered>
          <h1 style="color: #ff4d4f; margin: 0;">0</h1>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>