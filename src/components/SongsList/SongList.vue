<script lang="ts" setup>
import PlayIcon from '@/components/Base/PlayIcon.vue';
import {formatNumber} from '@/utils';
import {Play} from '@vicons/carbon';
import {useRouter} from 'vue-router';
import BaseEmpty from '../Base/BaseEmpty.vue';
import LoadImg from '../Base/LoadImg.vue';

const router = useRouter();
defineProps<{
    songs?: any[]
}>();

</script>
<template>
    <div v-if="songs && songs.length !== 0" class="mb-4">
        <n-grid
                :x-gap="12"
                :y-gap="8"
                cols="2 s:3 m:5 l:5 xl:5 2xl:7"
                responsive="screen"
        >
            <n-grid-item
                    v-for="(item, index) in songs"
                    :key="index"
                    class="group cursor-pointer"
            >
                <n-card
                        footer-style="padding: 5px 10px"
                        size="small"
                >
                    <template #cover>
                        <div class="relative" @click="router.push(`/songList/${item.id}`);">
                            <load-img
                                    :src="item.picUrl || item.coverImgUrl"
                                    class-name="w-full h-full"
                                    loading-height="12vw"
                            />
                            <div
                                    ref="hoverRef"
                                    class="flex absolute top-0 right-0 justify-end items-center p-1 w-full text-white card-mask"
                            >
                                <n-icon :component="Play"/>
                                <span class='pl-1'>{{ formatNumber(item.playCount) }}</span>
                            </div>
                            <play-icon/>
                        </div>
                    </template>
                    <template #footer>
                        <n-ellipsis>{{ item.name }}</n-ellipsis>
                    </template>
                </n-card>
            </n-grid-item>
        </n-grid>
    </div>
    <base-empty v-else height="300px"/>
</template>

<style scoped>
</style>
