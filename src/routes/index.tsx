import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2 text-center space-y-4">
      <h3>Welcome Home!</h3>
      <p>This is the home page of the application.</p>
      <Link to="/adminPanel">
        <Button>View Admin Panel</Button>
      </Link>
    </div>
  );
}
