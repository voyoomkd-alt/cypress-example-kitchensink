import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

// Test suite
test.describe('Simple tests for my Todo app', () => {
  let todo: TodoPage;

  // Open the app before each test
  test.beforeEach(async ({ page }) => {
    todo = new TodoPage(page);
    await todo.goto();
  });

  // Test 1: Add a normal todo
  test('I can add a normal todo item', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'step', description: 'Add a normal todo item called "Buy milk"' });
    await todo.addTodo('Buy milk');
    expect(await todo.getTodosText()).toContain('Buy milk');
  });

  // Test 2: Complete a todo
  test('I can mark a todo as done', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'step', description: 'Mark the todo "Buy milk" as completed' });
    await todo.addTodo('Buy milk');
    await todo.completeTodo('Buy milk');
    expect(await todo.isTodoCompleted('Buy milk')).toBe(true);
  });

  // Test 3: Delete a todo
  test('I can delete a todo item', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'step', description: 'Delete the todo "Buy milk"' });
    await todo.addTodo('Buy milk');
    await todo.deleteTodo('Buy milk');
    expect(await todo.getTodosText()).not.toContain('Buy milk');
  });

  // Test 4: Long text todo (bug demonstration)
  test('A very long todo may break the layout', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'step', description: 'Add a very long todo to see if text wraps incorrectly' });
    
    const longText = 'This is a very long todo that may wrap in a bad way and break the layout in the app';
    await todo.addTodo(longText);

    const lineCount = await todo.getTodoLineCount(longText);

    // Fail if it wraps too many lines (screenshot will be taken automatically)
    expect(lineCount).toBeLessThan(5);
  });
});
