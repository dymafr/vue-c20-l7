import { Todo } from '../interfaces/todo.interface';

const BASE_URL = 'https://restapi.fr/api/vue3todos';

export async function fetchTodo(): Promise<Todo[]> {
  return await (await fetch(BASE_URL)).json();
}

export async function deleteTodo(todoId: string): Promise<string> {
  await (await fetch(`${BASE_URL}/${todoId}`, { method: 'DELETE' })).json();
  return todoId;
}

export async function addTodo(todo: Todo): Promise<Todo> {
  return await (
    await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();
}

export async function updateTodo(
  todoId: string,
  update: Partial<Todo>
): Promise<Todo> {
  return await (
    await fetch(`${BASE_URL}/${todoId}`, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();
}
