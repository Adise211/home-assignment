import { createFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { todosService } from "@/services/todos.service";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/dataTable")({
  component: RouteComponent,
});

function RouteComponent() {
  const rows = useSelector((state: RootState) => state.tableConfig.rows);
  const [currentPage, setCurrentPage] = useState(1);

  // Queries
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: todosService.getTodos,
  });

  // Calculate pagination
  const totalData = query.data || [];
  const totalPages = Math.ceil(totalData.length / rows);
  const startIndex = (currentPage - 1) * rows;
  const endIndex = startIndex + rows;
  const displayData = totalData.slice(startIndex, endIndex);

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Reset to first page when rows change
  useEffect(() => {
    setCurrentPage(1);
  }, [rows]);

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
          Displaying {displayData.length} of {totalData.length} todos
        </p>
        <p className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages} • {rows} rows per page
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
                      <TableCell>-</TableCell>
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

      {/* Pagination Controls */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, totalData.length)}{" "}
              of {totalData.length} todos
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
