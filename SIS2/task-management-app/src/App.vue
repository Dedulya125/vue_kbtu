<template>
  <div id="app" class="container">
    <h1>Task Management App</h1>

    <TaskStats
      :total="totalCount"
      :active="activeCount"
      :completed="completedCount"
    />

    <TaskForm :editingTask="taskToEdit" @save-task="handleSaveTask" />

    <div class="controls">
      <input v-model="searchQuery" placeholder="Search tasks by title..." />

      <select v-model="statusFilter">
        <option value="all">All Statuses</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <select v-model="priorityFilter">
        <option value="all">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>

    <div class="task-list">
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @delete-task="deleteTask"
        @toggle-complete="toggleComplete"
        @change-priority="changePriority"
        @edit-task="setEditTask"
      />
      <p v-if="filteredTasks.length === 0">No tasks found.</p>
    </div>
  </div>
</template>

<script>
import TaskItem from "./components/TaskItem.vue";
import TaskForm from "./components/TaskForm.vue";
import TaskStats from "./components/TaskStats.vue";

export default {
  name: "App",
  components: { TaskItem, TaskForm, TaskStats },
  data() {
    return {
      tasks: [],
      searchQuery: "",
      statusFilter: "all",
      priorityFilter: "all",
      taskToEdit: null,
    };
  },
  computed: {
    totalCount() {
      return this.tasks.length;
    },
    activeCount() {
      return this.tasks.filter((t) => !t.completed).length;
    },
    completedCount() {
      return this.tasks.filter((t) => t.completed).length;
    },
    filteredTasks() {
      return this.tasks.filter((task) => {
        const matchesSearch = task.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        const matchesStatus =
          this.statusFilter === "all" ||
          (this.statusFilter === "completed"
            ? task.completed
            : !task.completed);
        const matchesPriority =
          this.priorityFilter === "all" ||
          task.priority === this.priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
      });
    },
  },
  watch: {
    tasks: {
      deep: true,
      handler(newTasks) {
        localStorage.setItem("sis_tasks", JSON.stringify(newTasks));
      },
    },
  },
  created() {
    const saved = localStorage.getItem("sis_tasks");
    if (saved) {
      this.tasks = JSON.parse(saved);
    } else {
      this.tasks = [
        {
          id: 1,
          title: "Complete SIS 2 Assignment",
          description: "Build Vue task app",
          priority: "high",
          completed: false,
          createdAt: new Date().toLocaleDateString(),
        },
      ];
    }
  },
  mounted() {
    console.log("Task Management App mounted successfully.");
  },
  methods: {
    handleSaveTask(taskData) {
      if (this.taskToEdit) {
        const index = this.tasks.findIndex((t) => t.id === taskData.id);
        if (index !== -1) {
          this.tasks[index] = { ...this.tasks[index], ...taskData };
        }
        this.taskToEdit = null;
      } else {
        this.tasks.push({
          ...taskData,
          completed: false,
          createdAt: new Date().toLocaleDateString(),
        });
      }
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },
    toggleComplete(id) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) task.completed = !task.completed;
    },
    changePriority({ id, priority }) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) task.priority = priority;
    },
    setEditTask(task) {
      this.taskToEdit = task;
    },
  },
};
</script>

<style>
.container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.controls input {
  flex: 1;
}
</style>
