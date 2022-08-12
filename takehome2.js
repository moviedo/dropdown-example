// Assignment 2 (est. time: 10m)
// The goal of this assignment is to filter, sort, and map an array. Use ES6 syntax wherever possible. Given the following array of objects, write a function that
// 1. Returns an array of the IDs of the objects where hide is set to false
// 2. Sorts them ascending based on the value of the order property.

const data = [
  {
    id: 1014,
    order: 2,
    hide: false,
  },
  {
    id: 4352,
    order: 3,
    hide: true,
  },
  {
    id: 23,
    order: 1,
    hide: false,
  },
  {
    id: 144,
    order: 4,
    hide: false,
  },
  {
    id: 543,
    order: 6,
    hide: false,
  },
  {
    id: 5719,
    order: 5,
    hide: true,
  },
];

console.log(
  "IDs of the objects where hide is set to false: ",
  data.filter((d) => d.hide === false).map((d) => d.id)
);

console.log(
  "IDs of the objects where hide is set to false using reduce(FASTER): ",
  data.reduce((prev, curr) => {
    if (curr.hide === false) {
      prev.push(curr.id);
    }

    return prev;
  }, [])
);

console.log(
  "Sorted ascending based on the value of the order property: ",
  data.sort((a, b) => {
    if (a.order < b.order) {
      return -1;
    } else if (a.order === b.order) {
      return 0;
    } else return 1;
  })
);
