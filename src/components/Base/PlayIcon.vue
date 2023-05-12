<script lang="ts" setup>
import { PlayFilledAlt } from '@vicons/carbon';
import { useThemeVars } from 'naive-ui';
import type { CSSProperties } from 'vue';

defineProps<{
    style?: CSSProperties;
    color?: string;
    size?: number;
}>();
const themeVars = useThemeVars();
</script>
<template>
  <div
    :class="['play-icon flex-items-justify-center', !style && 'right-4 bottom-4' ]"
    :style="style"
  >
    <n-icon
      :color="color ? color : themeVars.primaryColor"
      :component="PlayFilledAlt"
      :size="size ? size : 20"
    />
  </div>
</template>
<style scoped>
.play-icon {
    @apply absolute  w-10 h-10 bg-white
    rounded-full opacity-0 group-hover:opacity-100
    transition-opacity duration-700;
}
</style>
