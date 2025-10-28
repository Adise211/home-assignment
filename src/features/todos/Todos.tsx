import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todosService } from "../../services/todos.service";
import { Button } from "@/components/ui/button";

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
      <Button
        variant="default"
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
      </Button>
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
