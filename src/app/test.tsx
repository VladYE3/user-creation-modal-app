// import React from 'react';

// type Test = (typeof Item)[Object];

// type Item = [
//   {
//     id: number;
//   },
// ];

// const newsList: Item[] = [{ id: 1 }, { id: 2 }];

// type ListProviderProps = {
//   children: (item: Item) => React.ReactNode;
// };

// export const ListProvider: React.FC<ListProviderProps> = ({ children }) => (
//   <>
//     {newsList.map((item) => (
//       <React.Fragment key={item.id}>{children(item)}</React.Fragment>
//     ))}
//   </>
// );

// const myArr = [1, 2, 3, 4, 5] as const;

// type MyArrValue = (typeof myArr)[number];
