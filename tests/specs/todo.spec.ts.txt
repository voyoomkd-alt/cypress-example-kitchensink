import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test.describe('Todo App', () => {
    let todoPage: TodoPage;

    test.beforeEach(async ({ page }) => {
        todoPage = new TodoPage(page);
        await todoPage.goto();
    });

    test('Add a new todo', async () => {
        await todoPage.addTodo('Buy milk');
        const todos = await todoPage.getTodos();
        expect(todos).toContain('Buy milk');
    });

    test('Mark a todo as completed', async () => {
        await todoPage.addTodo('Buy milk');
        await todoPage.toggleTodo('Buy milk');
        const completed = todoPage.todoItems.filter({ hasText: 'Buy milk' });
        await expect(completed).toHaveClass(/completed/);
    });

    test('Delete a todo', async () => {
        await todoPage.addTodo('Buy milk');
        await todoPage.deleteTodo('Buy milk');
        const todos = await todoPage.getTodos();
        expect(todos).not.toContain('Buy milk');
    });

    test.describe('Scenario Outline: Add multiple todos', () => {
        const tasks = ['Learn Playwright', 'Write test plan', 'Review PRs'];

        for (const task of tasks) {
            test(`Add todo: ${task}`, async () => {
                await todoPage.addTodo(task);
                const todos = await todoPage.getTodos();
                expect(todos).toContain(task);
            });
        }
    });
});
