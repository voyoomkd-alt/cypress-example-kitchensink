import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test.describe('Todo app - beginner friendly', () => {
  let todo: TodoPage;

  test.beforeEach(async ({ page }) => {
    todo = new TodoPage(page);
    await todo.goto();
  });

  test('Add a new todo', async () => {
    await todo.addTodo('Buy milk');
    expect(await todo.getTodosText()).toContain('Buy milk');
  });

  test('Complete a todo', async () => {
    await todo.addTodo('Walk dog');
    await todo.completeTodo('Walk dog');
    expect(await todo.isTodoCompleted('Walk dog')).toBe(true);
  });

  test('Delete a todo', async () => {
    await todo.addTodo('Read book');
    await todo.deleteTodo('Read book');
    expect(await todo.getTodosText()).not.toContain('Read book');
  });

  test('Long text todo', async () => {
    const longText = 'This is a very long todo text to check wrapping and layout behavior without any brackets';
    await todo.addTodo(longText);
    const lineCount = await todo.getTodoLineCount(longText);
    expect(lineCount).toBeLessThanOrEqual(5); // simplified assertion for beginners
  });
});
