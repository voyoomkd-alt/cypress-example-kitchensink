import { Page } from '@playwright/test';

export class TodoPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://localhost:8080/todo');
  }

  async addTodo(todoText: string) {
    await this.page.fill('.new-todo', todoText);
    await this.page.press('.new-todo', 'Enter');
  }

  async getTodosText(): Promise<string[]> {
    return this.page.locator('.todo-list li label').allTextContents();
  }

  async completeTodo(todoText: string) {
    const todo = this.page.locator(`.todo-list li:has-text("${todoText}") .toggle`);
    await todo.check();
  }

  async isTodoCompleted(todoText: string): Promise<boolean> {
    const todo = this.page.locator(`.todo-list li:has-text("${todoText}")`);
    return await todo.getAttribute('class').then(cls => cls?.includes('completed') ?? false);
  }

  async deleteTodo(todoText: string) {
    const todo = this.page.locator(`.todo-list li:has-text("${todoText}")`);
    await todo.hover();
    await todo.locator('.destroy').click();
  }

  async getTodoLineCount(todoText: string): Promise<number> {
    const element = this.page.locator(`.todo-list li:has-text("${todoText}") label`);
    const box = await element.boundingBox();
    if (!box) return 0;
    const lineHeight = 20; // approximate line height in pixels
    return Math.round(box.height / lineHeight);
  }
}
