from playwright.sync_api import sync_playwright, Page, expect

def test_model_page(page: Page):
    """
    This test verifies that a model page loads correctly.
    """
    # 1. Arrange: Go to the model page.
    page.goto("http://localhost:3001/models/model_1")

    # 2. Wait for the page to be fully loaded
    page.wait_for_load_state("networkidle")

    # 3. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/model_page.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        test_model_page(page)
        browser.close()

if __name__ == "__main__":
    main()
