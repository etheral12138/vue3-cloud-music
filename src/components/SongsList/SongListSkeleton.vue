<template>
    <n-grid :x-gap="12" :y-gap="8" cols="5">
        <n-grid-item v-for="(item, index) in 15" :key="index" class="group cursor-pointer">
            <n-skeleton :sharp="false" height="15vw" width="100%"/>
            <n-skeleton :sharp="false" text/>
        </n-grid-item>
    </n-grid>
</template>

<style scoped>
</style>
