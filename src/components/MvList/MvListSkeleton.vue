<script lang="ts" setup>
withDefaults(defineProps<{
    count?: number;
}>(), {count: 0});
</script>

<template>
    <n-grid
            cols="4"
            responsive="screen"
            x-gap="20"
            y-gap="20"
    >
        <n-grid-item
                v-for="(item,index) in count"
                :key="index"
        >
            <n-skeleton
                    :sharp="false"
                    height="10vw"
                    width="100%"
            />
            <n-skeleton
                    :repeat="2"
                    :sharp="false"
                    text
            />
        </n-grid-item>
    </n-grid>
</template>