<template>
  <div class="stats-card">
    <h3>Statistics</h3>
    <p>
      Total Tasks: <strong>{{ total }}</strong>
    </p>
    <p>
      Active: <strong>{{ active }}</strong>
    </p>
    <p>
      Completed: <strong>{{ completed }}</strong>
    </p>
  </div>
</template>

<script>
export default {
  name: "TaskStats",
  props: {
    total: Number,
    active: Number,
    completed: Number,
  },
};
</script>

<style scoped>
.stats-card {
  display: flex;
  gap: 20px;
  background: #f4f4f5;
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>
