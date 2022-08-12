export default {
  title: "dropdown",
  argTypes: {
    items: {
      control: "object",
      defaultValue: [{data: "item 1"}, {data:"item 2"}, ],
    },
    buttonText: { control: "text" },
    buttonSlot: { control: "text" },
    itemSlot: { control: "text" },
  },
};

const Template = (args, { argTypes }) => ({
  data: () => ({ selected: null }),
  props: Object.keys(argTypes).filter((a) => !["buttonSlot", "itemsSlot", "itemSlot"].includes(a)),
  template: `
    <div>
      <p >Selected item: {{ selected ?? 'none' }}</p>

      <dropdown v-model="selected" v-bind="$props">
        <template v-if="${"buttonSlot" in args}" v-slot:DropdownButton="{onClick}">
          ${args.buttonSlot}
        </template>

        <template v-if="${"itemSlot" in args}" v-slot:DropdownItem="{item}">
          ${args.itemSlot}
        </template>
      </dropdown>
    </div>
    `,
});

export const Default = Template.bind({})

export const CustomButton = Template.bind({})
CustomButton.args = {
  buttonSlot: `
  <button @click="onClick" type="button" class="border-2 py-2 px-4 rounded bg-red-500 text-white font-bold">
    dropdown button
  </button>
  `
}

export const CustomItems = Template.bind({})
CustomItems.args = {
  items: [
    {
      data: 'not html item',
    },
    {
      data: '<i>has html</i>',
      hasHtml: true,
    },
  ],
  itemSlot: `
  <div
    v-if="item.hasHtml"
    v-html="item.data"
    class="p-4 bg-slate-100 hover:bg-orange-100 border-b-[1px]">
  </div>

  <div v-else class="p-4 bg-slate-100 hover:bg-red-100 border-b-[1px]">
    {{ item.data }}
  </div>
  `
}
