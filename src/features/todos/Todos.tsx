import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todosService } from "../../services/todos.service";

export function Todos() {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: todosService.getTodos,
  });

  // Mutations
  const mutation = useMutation({
    mutationFn: todosService.postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div>
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: "Do Laundry!!!!",
            userId: 1,
            completed: false,
          });
        }}
      >
        Add Todo
      </button>
      <ul>
        {query.data?.map(
          (todo: {
            id: number;
            title: string;
            userId: number;
            completed: boolean;
          }) => (
            <li key={todo.id}>{todo.title}</li>
          )
        )}
      </ul>
    </div>
  );
}
