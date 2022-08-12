<template>
  <div>
    <base-dropdown :items="items">
      <template #DropdownButton="{ onClick }">
        <button
          type="button"
          class="rounded border-2 bg-red-500 py-2 px-4 font-bold text-white"
          @click="onClick"
        >
          dropdown button
        </button>
      </template>
    </base-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    items: [
      { data: "item 1" },
      { data: "item 1" },
      { data: "item 1" },
      { data: "item 1" },
      { data: "item 1" },
      { data: "item 1" },
    ],
  }),
});
</script>
