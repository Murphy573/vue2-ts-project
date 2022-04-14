<template>
  <div v-change-color>
    {{ cmp_geter | ft_count }}

    <h4 ref="h4El">
      父子组件sync通信：{{ mySyncedLike }}
      <button @click="changeChildLike(1)">更改子组件like</button>
    </h4>
    <slot></slot>
    <div>
      <h4>Model===父组件modelValue: {{ modelValue }}</h4>
      <VModel1 v-model="modelValue" />
    </div>
    <div>
      <h4>ModelSync===父组件modelValue: {{ modelValue }}</h4>
      <VModel2 v-model="modelValue" />
    </div>
    <div>
      <h4>VModel===父组件modelValue: {{ modelValue }}</h4>
      <VModel3 v-model="modelValue" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  PropSync,
  Emit,
  Ref,
  Inject,
  Mixins,
} from "vue-property-decorator";
import { Hello } from "../mixins/hello.mixin";
import { World } from "../mixins/world.mixin";
import VModel1 from "./VModel1.vue";
import VModel2 from "./VModel2.vue";
import VModel3 from "./VModel3.vue";

@Component<Test>({
  components: { VModel1, VModel2, VModel3 },
  filters: {
    ft_count(v: string | number) {
      return v + "____" + 1;
    },
  },
  directives: {
    changeColor: {
      bind(el) {
        // el.style.color = "red";
        el.style.setProperty("color", "blue");
      },
    },
  },
  computed: {
    cmp_geter() {
      return this.visible + "--computed-add";
    },
  },
})
export default class Test extends Mixins(Hello, World) {
  @Prop({ default: false }) visible!: boolean;
  // .sync操作符，第一个参数代表父组件传递过来的属性名称，第二个参数与Prop参数相同，属性的相关配置
  @PropSync("like1", { type: String, default: "child-like" })
  mySyncedLike!: string;

  // @Ref 装饰器接收一个可选参数，用来指向元素或子组件的引用信息。如果没有提供这个参数，会使用装饰器后面的属性名充当参数
  @Ref("h4El") readonly h4ref!: HTMLElement;

  @Inject() homeInstance!: Record<string, unknown>;

  private myVisible!: boolean;

  modelValue = "123";

  get gt_visible(): string {
    return this.myVisible + "--computed-add";
  }

  /**
   * @Emit 装饰器接收一个可选参数，该参数是$Emit的第一个参数，充当事件名。如果没有提供这个参数，$Emit会将回调函数名的camelCase转为kebab-case，并将其作为事件名；
    @Emit会将回调函数的返回值作为第二个参数，如果返回值是一个Promise对象，$emit会在Promise对象被标记为resolved之后触发；
    @Emit的回调函数的参数，会放在其返回值之后，一起被$emit当做参数使用。
   */
  @Emit("on-change-child-like")
  changeChildLike(count: number): string {
    this.mySyncedLike = "child-like" + "_" + Math.random();

    return this.mySyncedLike + "__" + count;
  }

  created(): void {
    this.myVisible = this.visible;
  }

  mounted(): void {
    this.h4ref.style.setProperty("color", "red");
    console.log(this.h4ref);
    // console.log(this.homeInstance());
    // 打印hello world等mixin中的字段
    console.log("mixins values:", this.hello, this.world);
  }
}
</script>

<style lang="less" scoped></style>
