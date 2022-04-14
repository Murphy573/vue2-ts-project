<template>
  <div class="virtual-scroll-list-wrapper">
    <slot></slot>
    <!-- 占位元素 -->
    <div ref="placeholder" class="placeholder" />
    <template v-if="innerLoading && !finished">
      <slot name="loading"></slot>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator";

@Component
export default class VirtualScrollList extends Vue {
  // 外部v-model控制是否在加载中
  @Model("input", { type: Boolean, default: false, required: true })
  loading!: boolean;
  // 距离下方多少PX开始加载
  @Prop({ type: Number, default: 200 }) offset!: number;
  // 是否所有列表加载结束了
  @Prop({ type: Boolean, required: false }) finished!: boolean;
  // 是否mounted立即检测
  @Prop({ type: Boolean, default: true }) immediateCheck!: boolean;
  // 是否是定高item
  @Prop({ type: Boolean, default: true }) isFixedHeight!: boolean;
  // 定高高度或者不定高预估高度，一般是所有item中的最小高度，如果item间有margin，需要自己计算后传入
  @Prop({ type: Number, default: 1, validator: (v) => v >= 0, required: true })
  estimateHeight!: number;
  // 缓冲数量：在滚动容器可视区域外上下额外渲染的数量
  @Prop({ type: Number, default: 5, validator: (v) => v >= 0 })
  bufferNumber!: number;

  scroller: HTMLElement | null = null;

  startIndex = 0;
  endIndex = 0;

  get innerLoading() {
    return this.loading;
  }

  set innerLoading(val: boolean) {
    this.$emit("input", val);
  }

  mounted() {
    this.scroller = this.getScroller(this.$el as HTMLElement);
    this.scroller?.addEventListener("scroll", this.check);

    if (this.immediateCheck) {
      this.check();
    }
  }

  beforeDestroy() {
    this.scroller?.removeEventListener("scroll", this.check);
  }

  @Watch("loading")
  @Watch("finished")
  check() {
    this.$nextTick(() => {
      if (this.innerLoading || this.finished) return;

      const { $el: el, scroller, offset } = this;

      if (!scroller) return;

      let scrollerRect = scroller.getBoundingClientRect();

      const scrollerHeight = scrollerRect.bottom - scrollerRect.top;

      if (!scrollerHeight || this.isHidden(el as HTMLElement)) return;

      const placeholderRect = (
        this.$refs.placeholder as HTMLElement
      ).getBoundingClientRect();

      const isReachEdge =
        placeholderRect.bottom - scrollerRect.bottom <= offset;

      if (isReachEdge) {
        this.innerLoading = true;
        this.$emit("load");
      }
    });
  }

  // 从当前元素网上查找，获取最近的可滚动的父元素
  getScroller(el: HTMLElement) {
    let node = el;

    while (
      node &&
      node.tagName !== "HTML" &&
      node.tagName !== "BODY" &&
      node.nodeType === 1
    ) {
      const { overflowY } = window.getComputedStyle(node);
      if (/scroll|auto|overlay/i.test(overflowY)) {
        return node;
      }
      node = node.parentNode as HTMLElement;
    }

    return null;
  }

  // 检测元素是否隐藏
  isHidden(el: HTMLElement): boolean {
    const style = window.getComputedStyle(el);
    const hidden = style.display === "none";

    const parentHidden = el.offsetParent === null && style.position !== "fixed";

    return hidden || parentHidden;
  }
}
</script>

<style lang="less" scoped>
.virtual-scroll-list-wrapper {
  .placeholder {
    height: 0;
    pointer-events: none;
  }
}
</style>
