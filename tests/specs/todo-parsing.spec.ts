import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test.describe('Todo app long text test', () => {
  let todoPage: TodoPage;

  // This runs before each test
  test.beforeEach(async ({ page }) => {
    // Create a new instance of the page object
    todoPage = new TodoPage(page);
    // Go to the Todo app
    await todoPage.goto();
  });

  test('Todo with very long text may break the layout', async ({ page }) => {
    // Long todo text (simple text, no brackets)
    const longTodo = `This is a very long todo item. 
It is written to test if the Todo app shows long text correctly. 
Sometimes long text may go to the next line too early or break the layout.`;

    // Add the long todo using the page object
    await todoPage.addTodo(longTodo);

    // Take a screenshot of the page showing the long todo
    await page.screenshot({ path: 'long-todo.png', fullPage: true });

    // Locate the last todo added
    const todoElement = page.locator('.todo-list li:last-child label');

    // Check that the todo text is exactly what we typed
    await expect(todoElement).toHaveText(longTodo);

    // Check if the text overflows its container
    const boundingBox = await todoElement.boundingBox(); // size of the todo text
    const containerBox = await page.locator('.todo-list').boundingBox(); // size of the list container

    if (boundingBox && containerBox) {
      // Fail the test if the todo is wider than the container
      expect(boundingBox.width).toBeLessThanOrEqual(containerBox.width);
    }

    // Optional: check how many lines the todo text occupies
    const lineCount = await todoElement.evaluate((el) => {
      const style = getComputedStyle(el);
      const lineHeight = parseFloat(style.lineHeight);
      return Math.round(el.scrollHeight / lineHeight);
    });

    // Fail if the text wraps too much
    expect(lineCount).toBeLessThan(5);
  });
});
