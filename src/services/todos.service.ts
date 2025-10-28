const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const todosService = {
  getTodos: async () => {
    const response = await fetch(`${API_BASE_URL}/todos`);
    return response.json();
  },
  postTodo: async (todo: {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
  }) => {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    console.log("Posted todo:", todo);
    return response.json();
  },
};
