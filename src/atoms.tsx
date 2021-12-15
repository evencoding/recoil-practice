import { atom, selector } from "recoil";

// export enum Categories {
//   "TO_DO" = "TO_DO",
//   "DOING" = "DOING",
//   "DONE" = "DONE",
// }

export interface IToDo {
  text: string;
  id: number;
  category: string;
}
let cat = localStorage.getItem("localCat");
let localCat = JSON.parse(cat as any);
const categoryArr = ["TO DO", "DOING", "DONE"];

export const locatCategory = localCat?.length > 0 ? localCat : categoryArr;

export const categoryState = atom<string>({
  key: "category",
  default: locatCategory[0],
});

let output = localStorage.getItem("toDos");
let localData = JSON.parse(output as any);

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: localData?.length > 0 ? localData : [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
