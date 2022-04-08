import { defineStore } from 'pinia';
import { Todo } from '../interfaces/todo.interface';

interface TodoState {
  todos: Todo[];
}

export const useTodos = defineStore('todos', {
  state: (): TodoState => ({
    todos: [],
  }),
  getters: {
    todoList(state: TodoState) {
      return state.todos;
    },
  },
  actions: {
    addTodo(content: string) {
      this.todos.push({
        content,
        done: false,
        editMode: false,
      });
    },
    deleteTodo(index: number) {
      this.todos.splice(index, 1);
    },
    toggleTodo(index: number) {
      this.todos[index].done = !this.todos[index].done;
    },
    updateTodo(index: number, update: Partial<Todo>) {
      this.todos[index] = {
        ...this.todos[index],
        ...update,
      };
    },
  },
});
