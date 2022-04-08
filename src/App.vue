<template>
  <div class="p-20 d-flex justify-content-center">
    <div class="card container">
      <h1 class="mb-20">Todo List</h1>
      <div class="d-flex align-items-center">
        <input v-model="input" type="text" class="flex-fill mr-20" />
        <button class="btn btn-primary mr-20" @click="addTodo">Ajouter</button>
      </div>
      <ul>
        <li v-for="(todo, index) in todos" class="card" :key="todo.content">
          <div
            class="d-flex align-items-center"
            v-if="!todo.editMode"
            @click="toggleTodo(index)"
          >
            <input class="mr-20" :checked="todo.done" type="checkbox" />
            <span class="flex-fill">{{ todo.content }}</span>
            <button
              @click.stop="updateTodo(index, { editMode: true })"
              class="btn btn-primary mr-20"
            >
              Editer
            </button>
            <button @click.stop="deleteTodo(index)" class="btn btn-danger">
              Supprimer
            </button>
          </div>
          <div class="d-flex align-items-center" v-else>
            <TodoForm
              :content="todo.content"
              @cancel="updateTodo(index, { editMode: false })"
              @update="updateTodo(index, { editMode: false, content: $event })"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTodos } from './stores/todoStore';
import { Todo } from '../interfaces/todo.interface';
import TodoForm from './TodoForm.vue';

const input = ref<string>('');

const todoStore = useTodos();
const todos = todoStore.todoList;

function addTodo() {
  todoStore.addTodo(input.value);
  input.value = '';
}

function deleteTodo(index: number) {
  todoStore.deleteTodo(index);
}

function toggleTodo(index: number) {
  todoStore.toggleTodo(index);
}

function updateTodo(index: number, update: Partial<Todo>) {
  todoStore.updateTodo(index, update);
}
</script>

<style lang="scss">
@import './assets/scss/base.scss';

.container {
  width: 600px;
}

li {
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
