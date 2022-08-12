<template>
  <div class="relative">
    <slot name="DropdownButton" :on-click="onClick">
      <button
        type="button"
        class="rounded-full border-2 py-1 px-3"
        @click="onClick"
      >
        {{ buttonText }}
      </button>
    </slot>

    <div ref="ItemsArea" class="absolute top-1 left-1">
      <transition name="fade">
        <ul
          v-if="open"
          class="z-10 w-52 rounded border-2 bg-white"
          :itemsClasses="itemsClasses"
        >
          <li
            v-for="(item, key) in items"
            :key="item.key || key"
            @click="onSelected(item)"
          >
            <slot name="DropdownItem" :item="item">
              <div
                class="border-b-[1px] p-2 hover:bg-gray-100 focus:border-2 focus:border-slate-900 active:border active:border-slate-900"
              >
                {{ item.data }}
              </div>
            </slot>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";

export interface DropdownItem {
  key?: any;
  data: any;
}

export default Vue.extend({
  name: "BaseDropdown",
  props: {
    buttonText: {
      type: String,
      default: "dropdown",
    },
    items: {
      type: Array,
      required: true,
    } as PropOptions<DropdownItem[]>,
    itemsClasses: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    open: false,
  }),
  mounted() {
    document.addEventListener("click", this.clickListener);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.clickListener);
  },
  methods: {
    onClick() {
      setTimeout(() => (this.open = !this.open), 150);
    },
    onSelected(item: DropdownItem) {
      this.$emit("input", item);
    },
    clickListener(e: Event) {
      if (!this.$refs.ItemsArea?.contains(e.target) && this.open) {
        this.open = false;
      }
    },
  },
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  @apply transition-transform ease-in-out;
}
.fade-enter,
.fade-leave-to {
  @apply translate-y-1;
}
</style>
