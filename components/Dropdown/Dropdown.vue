<template>
  <div class="relative">
    <slot name="DropdownButton" :onClick="onClick">
      <button @click="onClick" type="button" class="border-2 py-1 px-3 rounded-full">
        {{ buttonText }}
      </button>
    </slot>

    <div class="absolute top-1 left-1 " ref="ItemsArea">
      <transition name="fade">
        <ul v-if="open" class="z-10 border-2 bg-white w-52 rounded" :itemsClasses="itemsClasses">
          <li v-for="(item, key) in items" :key="item.key || key" @click="onSelected(item)">
            <slot name="DropdownItem" :item="item">
              <div class="p-2 hover:bg-gray-100 focus:border-2 active:border focus:border-slate-900 active:border-slate-900 border-b-[1px]">
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
import Vue, { PropOptions } from "vue"

export interface DropdownItem {
  key?: any;
  data: any;
}

export default Vue.extend({
  name: "Dropdown",
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
    }
  },
  data: () => ({
    open: false,
  }),
  methods: {
    onClick() {
      setTimeout(() => this.open = !this.open, 150)
    },
    onSelected(item: DropdownItem) {
      this.$emit('input', item)
    },
    clickListener(e: Event) {
      if (!this.$refs.ItemsArea?.contains(e.target) && this.open) {
        this.open = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.clickListener)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.clickListener)
  }
});
</script>

<style>
.fade-enter-active, .fade-leave-active {
  @apply transition-transform ease-in-out;
}
.fade-enter, .fade-leave-to {
  @apply translate-y-1;
}
</style>
