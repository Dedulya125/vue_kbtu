<template>
  <div :class="['task-card', { completed: task.completed }]">
    <div class="task-header">
      <h4>{{ task.title }}</h4>
      <BaseBadge :type="task.priority">{{
        task.priority.toUpperCase()
      }}</BaseBadge>
    </div>

    <p>{{ task.description }}</p>
    <small>Created: {{ task.createdAt }}</small>

    <div class="actions">
      <label>Priority: </label>
      <select :value="task.priority" @change="onPriorityChange">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button @click="$emit('toggle-complete', task.id)">
        {{ task.completed ? "Mark Active" : "Complete" }}
      </button>
      <button @click="$emit('edit-task', task)">Edit</button>
      <button @click="$emit('delete-task', task.id)" class="btn-danger">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskItem",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  emits: ["delete-task", "toggle-complete", "change-priority", "edit-task"],
  methods: {
    onPriorityChange(event) {
      this.$emit("change-priority", {
        id: this.task.id,
        priority: event.target.value,
      });
    },
  },
};
</script>

<style scoped>
.task-card {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 6px;
}
.task-card.completed {
  background-color: #f0fdf4;
  opacity: 0.75;
}
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.actions {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
}
.btn-danger {
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
}
</style>
