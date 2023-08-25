import { type NextPage } from "next";
import useProtectView from "~/hooks/useProtectView";
import { api } from "~/utils/api";
import router from "next/router";
import { Button } from "~/components/ui/button";
// import Home2 from "../todos/buttone";

const ShowTodo: NextPage = () => {
  const utils = api.useContext();
  const { data, error, isLoading } = api.todosRouter.getTodos.useQuery();
  const status = useProtectView("/");
  if (error) {
    console.log(error);
  }
  const deleteTodoMutation = api.todosRouter.deleteTodo.useMutation({
    onError(error) {
      console.log(error);
    },
    onSuccess(data) {
      void utils.todosRouter.getTodos.invalidate();
      alert(`Todo ${data?.name || "default"} deleted`);
    },
  });
  if (status === "loading" || isLoading) {
    return <h1>Is loading!</h1>;
  }

  const handleDelete = (id: string) => {
    deleteTodoMutation.mutate({ todoId: id });
  };
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <Button
              // className="ml-5 cursor-pointer rounded bg-green-600 px-4 py-2 text-white hover:bg-green-800"
              // type="button"
              // value={""}
              onClick={() => {
                void router.push("/todos/create");
              }}
            >
              Create
            </Button>
            {/* <Home2 /> */}
            {/* <Button>Click me</Button> */}
            <br />
            <br />
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((todo) => {
                  return (
                    <tr className="border-b" key={todo.id}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {todo.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                        {todo.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                        {todo.description}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                        <div className="inline-flex">
                          <input
                            className="cursor-pointer rounded-l bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-800"
                            type="button"
                            value={"Update"}
                            onClick={() => {
                              alert("Coming soon");
                            }}
                          />
                          <input
                            className="cursor-pointer rounded-r bg-red-600 px-4 py-2 text-white hover:bg-red-800"
                            type="button"
                            value={"Delete"}
                            onClick={() => {
                              handleDelete(todo.id);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowTodo;
