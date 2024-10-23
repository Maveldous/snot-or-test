<template>
  <div class="mt-5">
    <button
      v-for="(p, i) in maxPages"
      :key="p"
      @click="emits('change-page', i)"
      class="page-number-btn rounded bg-zinc-100 py-2 px-3 mr-2 text-zinc-600"
      :class="{ 'bg-zinc-200 text-blue-600': i === pageIndex }"
    >
      {{ p }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  maxPages: number
  pageIndex: number
}>()

const emits = defineEmits<{
  (event: "change-page", value: number)
}>()
</script>

<style lang="scss" scoped>
.page-number-btn {
  font-weight: bold;
  transition: background 0.5s ease;
  &:hover {
    background: darken(whitesmoke, 8%);
  }
}
</style>
