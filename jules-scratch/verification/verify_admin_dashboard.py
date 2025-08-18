from playwright.sync_api import sync_playwright, Page, expect

def test_admin_dashboard(page: Page):
    """
    This test verifies that the admin dashboard page loads correctly.
    """
    # 1. Arrange: Set up authentication and go to the admin dashboard page.
    page.goto("http://localhost:3001")
    page.evaluate("() => { localStorage.setItem('session_user_id', 'admin_user'); }")
    page.goto("http://localhost:3001/admin")

    # 2. Wait for the page to be fully loaded
    page.wait_for_load_state("networkidle")

    # 3. Assert: Check that the heading is visible.
    heading = page.get_by_role("heading", name="Dashboard")
    expect(heading).to_be_visible()

    # 4. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/admin_dashboard.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        test_admin_dashboard(page)
        browser.close()

if __name__ == "__main__":
    main()
