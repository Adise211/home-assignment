import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/adminPanel")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/adminPanel"!</div>;
}
