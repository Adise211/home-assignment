import { createFileRoute } from "@tanstack/react-router";
import { Counter } from "../features/counter/Counter";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2 text-center">
      <h3>Welcome Home!</h3>
      <p>This is the home page of the application.</p>
      <Counter />
    </div>
  );
}
