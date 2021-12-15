import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, locatCategory, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

interface IForm {
  addCategory: string;
}

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [render, setRender] = useState(true);
  const { register, handleSubmit, setValue } = useForm();
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const onSubmit = ({ addCategory }: IForm) => {
    const newCategoryArr = locatCategory;
    newCategoryArr.push(addCategory);
    localStorage.setItem("localCat", JSON.stringify(newCategoryArr));
    setValue("addCategory", "");
    setRender(!render);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        {locatCategory.map((cat: any) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("addCategory", {
            required: "Please write a new category",
          })}
          placeholder="Write a new category"
        />
        <button>ADD</button>
      </form>
      <hr />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
