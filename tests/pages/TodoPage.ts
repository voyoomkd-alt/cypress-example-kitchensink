import { Page, Locator } from '@playwright/test';

export class TodoPage {
    readonly page: Page;
    readonly todoInput: Locator;
    readonly todoList: Locator;
    readonly todoItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.todoInput = page.locator('.new-todo');
        this.todoList = page.locator('.todo-list');
        this.todoItems = this.todoList.locator('li');
    }

    async goto() {
        await this.page.goto('http://localhost:8080/todo');
    }

    async addTodo(todo: string) {
        await this.todoInput.fill(todo);
        await this.todoInput.press('Enter');
    }

    async getTodos() {
        return this.todoItems.allTextContents();
    }

    async toggleTodo(todo: string) {
        const item = this.todoItems.filter({ hasText: todo });
        await item.locator('.toggle').click();
    }

    async deleteTodo(todo: string) {
        const item = this.todoItems.filter({ hasText: todo });
        await item.hover();
        await item.locator('.destroy').click({ force: true });
    }
}
