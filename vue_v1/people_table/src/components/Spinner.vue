<script lang="ts" setup>
import { type Ref } from 'vue'
import { HollowDotsSpinner } from 'epic-spinners'
const props = defineProps<{
  isLoading: Ref<boolean>
  dynamicColor: Ref<string>
}>()

const color = ['white', '#ffffff'].includes(props.dynamicColor.toLowerCase()) ? 'black' : props.dynamicColor

</script>


<template>
  <div v-if="props.isLoading">
    <hollow-dots-spinner :animation-duration="1000" :dot-size="15" :dots-num="3" class="spinner mt-4" :color="color" />
  </div>
</template>

<style>
.spinner {
  position: absolute;
  left: 45vw;
}

@media (max-width: 500px) {
  .spinner {
    left: 9rem;
  }
}
</style>
