<template>
  <div>vmodel2：<input v-model="myValue" /></div>
</template>

<script lang="ts">
import { Vue, Component, ModelSync } from "vue-property-decorator";

@Component<VModel2>({})
export default class VModel2 extends Vue {
  @ModelSync("value1", "change", String) myValue!: string;
}
</script>

<style lang="less" scoped></style>
