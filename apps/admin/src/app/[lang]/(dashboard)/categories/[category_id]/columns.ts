'use client';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns = [
  {
    id: 1,
    name: 'Clothes',
    children: [
      {
        id: 2,
        name: 'Baby Clothes',
        children: [{ id: 3, name: 'Baby dress' }],
      },
    ],
  },
  {
    id: 4,
    name: 'Mouse',
    children: [
      {
        id: 5,
        name: 'Jerry',
      },
    ],
  },
  {
    id: 6,
    name: 'Cat',
    children: [
      {
        id: 7,
        name: 'Tom',
      },
    ],
  },
];
