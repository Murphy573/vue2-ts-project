<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Test
      ref="compT"
      visible="123"
      :like1.sync="like"
      @on-change-child-like="handleChangeChildLike"
    >
      <h4>
        父组件like值：{{ like
        }}<button @click="changeParentLike">更改父组件like</button>

        <t-button>213</t-button>
      </h4>
    </Test>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref, Provide } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Test from "./test.vue";

@Component({
  components: {
    HelloWorld,
    Test,
  },
})
export default class Home extends Vue {
  like = "parentlike";

  @Ref("compT") testComp!: Test;

  @Provide()
  homeInstance() {
    return this;
  }

  // beforeRouteEnter(to: Route, from: Route, next) {
  //   console.log("beforeRouteEnter");
  //   next();
  // }

  changeParentLike() {
    this.like = "parent-like";
  }

  handleChangeChildLike(v: number, c: number) {
    console.log(v, c);
  }

  mounted() {
    // 可选链操作符
    console.log("parent", this.testComp?.h4ref);
  }
}
</script>
