<template>
  <div>vmodel1：<input v-model="myValue" /></div>
</template>

<script lang="ts">
import { Vue, Component, Model } from "vue-property-decorator";

@Component({})
export default class VModel1 extends Vue {
  @Model("onChange", String) value!: string;

  get myValue() {
    return this.value;
  }

  set myValue(v: V2TS.mystring) {
    this.$emit("onChange", v);
  }
}
</script>

<style lang="less" scoped></style>
