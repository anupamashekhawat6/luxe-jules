from playwright.sync_api import sync_playwright, Page, expect

def test_add_model(page: Page):
    """
    This test verifies that a new model can be created.
    """
    # 1. Arrange: Set up authentication and go to the admin models page.
    page.goto("http://localhost:3001")
    page.evaluate("() => { localStorage.setItem('session_user_id', 'admin_user'); }")
    page.goto("http://localhost:3001/admin/models")

    # 2. Act: Click the "Add Model" button.
    # The button is inside a dialog, so we need to find the trigger first.
    # From my previous exploration, I know the "Add Model" button is in the main content area.
    add_model_button = page.get_by_role("button", name="Add Model")
    add_model_button.click()

    # 3. Fill out the form.
    page.get_by_label("Name").fill("Test Model")
    page.get_by_label("Bio").fill("This is a test model.")
    page.get_by_label("Profile Image URL").fill("https://picsum.photos/800/1200?random=4")

    # 4. Submit the form.
    submit_button = page.get_by_role("button", name="Create Model")
    submit_button.click()

    # 5. Assert: Check that the new model is in the list.
    new_model = page.get_by_role("heading", name="Test Model")
    expect(new_model).to_be_visible()

    # 6. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/add_model.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        test_add_model(page)
        browser.close()

if __name__ == "__main__":
    main()
