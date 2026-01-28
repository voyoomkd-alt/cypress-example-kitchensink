import { Page, Locator } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly todoInput: Locator;
  readonly todoList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.todoInput = page.locator('.new-todo'); // input box to add new todos
    this.todoList = page.locator('.todo-list li'); // list of todo items
  }

  // Open the Todo app
  async goto() {
    await this.page.goto('http://localhost:8080/todo');
  }

  // Add a new todo item
  async addTodo(text: string) {
    await this.todoInput.fill(text);
    await this.todoInput.press('Enter');
  }

  // Get all todo text as an array
  async getTodosText(): Promise<string[]> {
    return await this.todoList.allTextContents();
  }

  // Mark a todo as completed
  async completeTodo(text: string) {
    const todo = this.todoList.filter({ hasText: text });
    await todo.locator('.toggle').check();
  }

  // Check if a todo is completed
  async isTodoCompleted(text: string): Promise<boolean> {
    const todo = this.todoList.filter({ hasText: text });
    return await todo.locator('input.toggle').isChecked();
  }

  // Delete a todo
  async deleteTodo(text: string) {
    const todo = this.todoList.filter({ hasText: text });
    await todo.hover();
    await todo.locator('.destroy').click();
  }

  // Count how many lines the todo text takes 
  async getTodoLineCount(text: string): Promise<number> {
    const todo = this.todoList.filter({ hasText: text });
    const height = await todo.evaluate(el => el.clientHeight);
    const lineHeight = await todo.evaluate(el => parseInt(window.getComputedStyle(el).lineHeight));
    return Math.round(height / lineHeight);
  }
}
