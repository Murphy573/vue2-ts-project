<template>
  <div>
    <div class="container">
      <VirtualScrollList
        v-model="loading"
        :isFixedHeight="true"
        :estimateHeight="40"
        @load="handleLoadMore"
      >
        <div v-for="item of data" :key="item.key" class="item">
          {{ item.value }}
        </div>

        <template #loading> loading.... </template>
      </VirtualScrollList>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import VirtualScrollList from "@/components/VirtualScrollList.vue";

@Component({
  components: { VirtualScrollList },
})
export default class Virtural extends Vue {
  loading = false;

  data = [];

  async handleLoadMore() {
    this.loading = true;
    console.log(1);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });

    const newData = new Array(20).fill(1).map((value) => {
      return {
        key: Math.random(),
        value: Math.random(),
        p: value,
      };
    });

    this.data = this.data.concat(...newData);

    this.loading = false;
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 300px;
  height: 500px;
  background: wheat;
  margin: auto;
  overflow-y: auto;

  .item {
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid black;
    background-color: whitesmoke;
  }
}
</style>
