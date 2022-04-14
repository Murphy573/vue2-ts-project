<template>
  <div>vmodel3：<input v-model="myValue" /></div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";

@Component<VModel3>({})
export default class VModel3 extends Vue {
  @VModel() myValue!: string;
}
</script>

<style lang="less" scoped></style>
