import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dataTable")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dataTable"!</div>;
}
