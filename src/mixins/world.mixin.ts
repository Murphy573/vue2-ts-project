// mixins.js
import Vue from "vue";
import Component from "vue-class-component";

// You can declare mixins as the same style as components.
@Component
export class World extends Vue {
  world = "World";
}
