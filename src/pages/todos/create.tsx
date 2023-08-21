import { type NextPage } from "next";
import { useState } from "react";
import { api } from "~/utils/api";
import router from "next/router";

const TodoForm: NextPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const createTodosMutation = api.todosRouter.createTodo.useMutation();
  const handleCreate = () => {
    createTodosMutation.mutate(
      { name, description },
      {
        onError(error) {
          console.log(error);
        },
        onSuccess(data) {
          alert(`Todo ${data?.name || "default"} created`);
          void router.push("/todos/show");
        },
      }
    );
    // console.log(name, description);
  };
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="relative w-full bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
        >
          <label className="mb-2 block" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            required
            className="h-11 w-full rounded border-2"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="mb-2 mt-4 block" htmlFor="description">
            Description
          </label>
          <input
            required
            className="h-11 w-full rounded border-2"
            type="text"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="mt-6 h-10 w-full cursor-pointer rounded bg-green-600 text-white hover:bg-green-600"
            type="submit"
            value={"Create"}
          />
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
