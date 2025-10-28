import { createFileRoute } from "@tanstack/react-router";
import { Todos } from "../features/todos/Todos";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div>
      <div className="p-2">Hello from About!</div>
      <Todos />
    </div>
  );
}
