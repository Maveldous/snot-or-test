<template>
  <main class="mx-auto mb-20">
    <SelectedComposer v-if="activeComposer" :composer="activeComposer" />
    <div>
      <ComposersList
        :composers="composers"
        @change-active-composer="activeComposerIndex = $event"
      />

      <Pagination
        v-if="composerCount"
        :maxPages="maxPages"
        :pageIndex="pageIndex"
        @change-page="pageIndex = $event"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from "vue"
import SelectedComposer from "../components/SelectedComposer.vue"
import Pagination from "../components/Pagination.vue"
import ComposersList from "../components/ComposersList.vue"
import { useQuery } from "@tanstack/vue-query"
import { ComposerService } from "../services/composerService"

const pageSize = 20

const activeComposerIndex = ref(0)
const pageIndex = ref(0)

const filter = ref("")
const order = ref(null)

const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ["composers", filter.value, order.value, pageIndex.value],
  queryFn: async () => {
    return ComposerService.getComposers({
      filter: filter.value,
      order: order.value,
      page: pageIndex.value,
      take: pageSize,
    })
  },
})

watch(
  () => [pageIndex.value],
  () => {
    refetch()
    activeComposerIndex.value = null
  }
)

const composers = computed(() => data.value?.data || [])
const activeComposer = computed(
  () => composers.value[activeComposerIndex.value]
)
const composerCount = computed(() => data.value?.meta?.itemCount)
const maxPages = computed(() => data.value?.meta?.itemCount / pageSize)
</script>

<style lang="scss">
main {
  width: 1280px;
}

h4,
h5 {
  font-weight: bold;
}

h4 {
  font-size: 1.2em;
}
</style>
