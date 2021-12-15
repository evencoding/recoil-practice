import React from "react";
import { useRecoilState } from "recoil";
import { IToDo, locatCategory, toDoState } from "../atoms";

function ToDo({ text, id, category }: IToDo) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const deleteTodo = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  localStorage.setItem("toDos", JSON.stringify(toDos));
  return (
    <li>
      <span>{text}</span>
      {locatCategory.map(
        (cat: any) =>
          category !== cat && (
            <button onClick={() => onClick(cat)}>{cat}</button>
          )
      )}
      <button onClick={deleteTodo}>Delete</button>
    </li>
  );
}

export default ToDo;
