<template>
  <table class="composer-list">
    <thead>
      <tr>
        <th>Composer Name</th>
        <th>Date of Birth</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(composer, i) in composers"
        :key="composer.id"
        class="item cursor-pointer"
        @click="emits('change-active-composer', i)"
      >
        <td class="p-2">{{ composer.name }}</td>
        <td class="p-2">{{ composer.dateOfBirth }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const props = defineProps<{
  composers: any
}>()

const emits = defineEmits<{
  (event: "change-active-composer", value: number)
}>()
</script>

<style lang="scss" scoped>
.composer-list {
  width: 100%;
  thead tr {
    background: darken(whitesmoke, 20%);
  }
  th {
    font-weight: bold;
    font-size: 1.1em;
  }
  .item {
    transition: background 0.5s ease;
    &:nth-child(even) {
      background: whitesmoke;
    }
    &:hover {
      background: darken(whitesmoke, 8%);
    }
  }
}
</style>
