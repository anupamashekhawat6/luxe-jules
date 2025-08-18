from playwright.sync_api import sync_playwright, Page, expect

def test_add_gallery(page: Page):
    """
    This test verifies that a new gallery can be created.
    """
    # 1. Arrange: Set up authentication and go to the admin galleries page.
    page.goto("http://localhost:3001")
    page.evaluate("() => { localStorage.setItem('session_user_id', 'admin_user'); }")
    page.goto("http://localhost:3001/admin/galleries")

    # 2. Act: Click the "Add Gallery" button.
    add_gallery_button = page.get_by_role("button", name="Add Gallery")
    add_gallery_button.click()

    # 3. Fill out the form.
    page.get_by_label("Title").fill("Test Gallery")
    page.get_by_label("Description").fill("This is a test gallery.")
    page.get_by_label("Cover Image URL").fill("https://picsum.photos/1280/720?random=1")
    page.get_by_label("Gallery Images (comma-separated URLs)").fill("https://picsum.photos/800/1200?random=2,https://picsum.photos/800/1200?random=3")

    # Click the category dropdown
    page.locator("#category-trigger").click()
    page.get_by_role("option", name="Fashion").click()

    # 4. Submit the form.
    submit_button = page.get_by_role("button", name="Create Gallery")
    submit_button.click()

    # 5. Assert: Check that the new gallery is in the list.
    new_gallery = page.get_by_role("heading", name="Test Gallery")
    expect(new_gallery).to_be_visible()

    # 6. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/add_gallery.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        test_add_gallery(page)
        browser.close()

if __name__ == "__main__":
    main()
