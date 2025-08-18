from playwright.sync_api import sync_playwright, Page, expect

def test_main_page(page: Page):
    """
    This test verifies that the main page loads correctly.
    """
    # 1. Arrange: Go to the main page.
    page.goto("http://localhost:3001")

    # 2. Wait for the page to be fully loaded
    page.wait_for_load_state("networkidle")

    # 3. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/main_page.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        test_main_page(page)
        browser.close()

if __name__ == "__main__":
    main()
