import { Item } from './item';

const colors: Item[] = [
    { id: 1, name: "Red", fields: { things: [1,2,3], categories: [1,2,3] } },
    { id: 2, name: "White", fields: { things: [4,5], categories: [3] } },
    { id: 3, name: "Green", fields: { things: [6,7], categories: [1,2] } },
  ];

const things: Item[] = [
    { id: 1, name: "Blood", fields: { colors: [1], categories: [2] } },
    { id: 2, name: "Fire", fields: { colors: [1], categories: [3] } },
    { id: 3, name: "Cherries", fields: { colors: [1], categories: [1] } },
    { id: 4, name: "Sun", fields: { colors: [2], categories: [3] } },
    { id: 5, name: "Snow", fields: { colors: [2], categories: [3] } },
    { id: 6, name: "Grass", fields: { colors: [3], categories: [2] } },
    { id: 7, name: "Avocado", fields: { colors: [3], categories: [1,2] } },
  ];

const categories: Item[] = [
    { id: 1, name: "Fruits", fields: { colors: [1,3], things: [3,7] } },
    { id: 2, name: "Organic", fields: { colors: [1,3], things: [1,3,6,7] } },
    { id: 3, name: "Physics", fields: { colors: [1,2], things: [2,4,5] } },
  ];

export {
    colors,
    things,
    categories
};