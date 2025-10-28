import { createFileRoute } from "@tanstack/react-router";
import { Counter } from "../features/counter/Counter";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Counter />
    </div>
  );
}
