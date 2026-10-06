<template>
  <span :class="['badge', typeClass]">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "BaseBadge",
  props: {
    type: {
      type: String,
      default: "default",
    },
  },
  computed: {
    typeClass() {
      return `badge-${this.type}`;
    },
  },
};
</script>

<style scoped>
.badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}
.badge-high {
  background-color: #ff4d4f;
  color: white;
}
.badge-medium {
  background-color: #faad14;
  color: white;
}
.badge-low {
  background-color: #52c41a;
  color: white;
}
.badge-default {
  background-color: #d9d9d9;
  color: black;
}
</style>
