<script lang="ts" setup>
import useThemeStyle from '@/hook/useThemeStyle';
import useValidateVipSong from '@/hook/useValidateVipSong';
import {useMainStore} from '@/stores/main';
import {formatSongsAuthor} from '@/utils';
import {VolumeMuteFilled, VolumeUpFilled} from '@vicons/material';
import {ref} from 'vue';
import {useRouter} from 'vue-router';

export interface PlayListExpose {
    show: () => void
}

const active = ref(false);
const mainStore = useMainStore();
const router = useRouter();
let isLoad = false;
const { themeVars, tagColor } = useThemeStyle();

defineExpose({
  show() {
    active.value = true;
  }
});
// 双击播放
const handleDoubleClick = async (index: number) => {
  const value = useValidateVipSong(mainStore.playList[index]);
  if (value) return;
  if (isLoad) return;
  isLoad = true;
  await mainStore.changePlayIndex(index);
  isLoad = false;
};
// 点击清空播放列表
const handleRestClick = () => {
  mainStore.resetPlayList();
};
const handleGoHemeClick = () => {
  router.push('/discovery');
  active.value = false;
};
</script>

<template>
  <n-drawer
    v-model:show="active"
    :block-scroll="false"
    :trap-focus="false"
    :width="450"
    placement="right"
  >
    <n-drawer-content>
      <template #header>
        <div class="flex justify-between odd:" style="width:400px">
          <span class="text-sm opacity-50">共 {{ mainStore.playListCount }} 首 </span>
          <n-button text type="primary" @click="handleRestClick">
            清空列表
          </n-button>
        </div>
      </template>
      <!--  -->
      <n-empty v-if="mainStore.playList.length===0" class="mt-20" description="您还未添加任何歌曲">
        <template #extra>
          <n-button
            size="small" text type="primary"
            @click="handleGoHemeClick"
          >
            去首页发现音乐
          </n-button>
        </template>
      </n-empty>
      <DynamicScroller
        :items="mainStore.playList"
        :min-item-size="45"
        class="scroller"
        key-field="id"
      >
        <template #default="{ item, index }">
          <DynamicScrollerItem
            :active="active"
            :data-index="index"
            :item="item"
            :size-dependencies="[
              item.message,
            ]"
          >
            <div
              class="flex justify-between text-sm hover:bg-green-500 hover:bg-opacity-20 item "
              @dblclick="handleDoubleClick(index)"
            >
              <div class="flex overflow-hidden flex-1 items-center pr-2">
                <n-icon
                  v-if="+mainStore.currentPlayIndex === index"
                  :color="mainStore.playing
                    ? themeVars.primaryColor
                    : themeVars.textColor1"
                  :component="mainStore.playing
                    ? VolumeUpFilled
                    :VolumeMuteFilled" style="padding-right:5px"
                />
                <p class="truncate" style="max-width:140px">
                  {{ item.name }}
                </p>
                <n-tag
                  v-if="item.mv !== 0"
                  :color="tagColor" class="ml-2" size="small"
                  @click="router.push(`/mv/${item.mv}`)"
                >
                  MV
                </n-tag>
                <n-tag
                  v-if="item.fee === 1"
                  :color="tagColor" class="ml-2" size="small"
                >
                  VIP
                </n-tag>
              </div>
              <p class=" w-24 truncate">
                {{ formatSongsAuthor(item?.ar || []) }}
              </p>
              <n-time :time="item?.dt" class="pl-4 opacity-40" format="mm:ss" />
            </div>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>
.scroller {
    height: 100%;
}

:deep(.resize-observer) {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    pointer-events: none;
    display: block;
    overflow: hidden;
    opacity: 0;
}

.item {
    padding: 12px 20px;
    cursor: pointer;
}

:deep(.n-drawer-body-content-wrapper) {
    padding: 0 !important;
    padding-bottom: 15px;
}
</style>
