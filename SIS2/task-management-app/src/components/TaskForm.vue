<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <h3>{{ isEditing ? "Edit Task" : "Add New Task" }}</h3>
    <input v-model="title" placeholder="Task Title" required />
    <textarea
      v-model="description"
      placeholder="Task Description"
      required
    ></textarea>
    <select v-model="priority">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <button type="submit">{{ isEditing ? "Save Changes" : "Add Task" }}</button>
  </form>
</template>

<script>
export default {
  name: "TaskForm",
  props: {
    editingTask: Object,
  },
  emits: ["save-task"],
  data() {
    return {
      title: "",
      description: "",
      priority: "medium",
    };
  },
  computed: {
    isEditing() {
      return !!this.editingTask;
    },
  },
  watch: {
    editingTask: {
      immediate: true,
      handler(newTask) {
        if (newTask) {
          this.title = newTask.title;
          this.description = newTask.description;
          this.priority = newTask.priority;
        } else {
          this.resetForm();
        }
      },
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("save-task", {
        id: this.editingTask ? this.editingTask.id : Date.now(),
        title: this.title,
        description: this.description,
        priority: this.priority,
      });
      this.resetForm();
    },
    resetForm() {
      this.title = "";
      this.description = "";
      this.priority = "medium";
    },
  },
};
</script>

<style scoped>
.task-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
</style>
