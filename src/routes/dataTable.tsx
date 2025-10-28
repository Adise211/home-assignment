import { createFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { todosService } from "@/services/todos.service";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute("/dataTable")({
  component: RouteComponent,
});

function RouteComponent() {
  const rows = useSelector((state: RootState) => state.tableConfig.rows);

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

  // Get the data to display based on the rows setting
  const displayData = query.data ? query.data.slice(0, rows) : [];

  const getStatusBadge = (completed: boolean) => {
    return completed ? (
      <Badge
        variant="default"
        className="bg-green-100 text-green-800 hover:bg-green-100"
      >
        Completed
      </Badge>
    ) : (
      <Badge
        variant="secondary"
        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      >
        Pending
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Table</h1>
        <p className="text-muted-foreground">
          Displaying {displayData.length} of {query.data?.length || 0} todos
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos List</CardTitle>
          <CardDescription>
            A comprehensive table showing todos with {rows} rows displayed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {query.isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Loading todos...
                  </TableCell>
                </TableRow>
              ) : query.isError ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-red-500"
                  >
                    Error loading todos
                  </TableCell>
                </TableRow>
              ) : (
                displayData.map(
                  (todo: {
                    id: number;
                    title: string;
                    userId: number;
                    completed: boolean;
                  }) => (
                    <TableRow key={todo.id}>
                      <TableCell className="font-medium">{todo.id}</TableCell>
                      <TableCell
                        className="max-w-xs truncate"
                        title={todo.title}
                      >
                        {todo.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">User {todo.userId}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(todo.completed)}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => {
                            mutation.mutate({
                              id: Date.now(),
                              title: "New Todo from Table",
                              userId: todo.userId,
                              completed: false,
                            });
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                          disabled={mutation.isPending}
                        >
                          {mutation.isPending ? "Adding..." : "Add Similar"}
                        </button>
                      </TableCell>
                    </TableRow>
                  )
                )
              )}
            </TableBody>
            <TableCaption>
              Showing {displayData.length} todos. Use the Table Config page to
              adjust the number of rows displayed.
            </TableCaption>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
