from playwright.sync_api import sync_playwright, Page, expect

def test_gallery_page(page: Page):
    """
    This test verifies that a gallery page loads correctly.
    """
    # 1. Arrange: Go to the gallery page.
    page.goto("http://localhost:3001/galleries/gallery_1")

    # 2. Wait for the page to be fully loaded
    page.wait_for_load_state("networkidle")

    # 3. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/debug_gallery_page.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        test_gallery_page(page)
        browser.close()

if __name__ == "__main__":
    main()
