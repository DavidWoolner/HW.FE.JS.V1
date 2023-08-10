<script lang="ts" setup>
import { HollowDotsSpinner } from 'epic-spinners'
const { isLoading } = defineProps<{
  isLoading: boolean
}>()
</script>


<template>
  <div v-if="isLoading">
    <hollow-dots-spinner
      :animation-duration="1000"
      :dot-size="15"
      :dots-num="3"
      color="#297566"
      class="spinner mt-4"
    />
  </div>
</template>

<style>
.spinner {
  margin: 0 auto;
  position: absolute;
  left: 28rem;
}

@media (max-width: 500px) {
  .spinner {
    left: 9rem;
  }
}
</style>
