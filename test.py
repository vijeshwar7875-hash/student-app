
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()

driver.get("http://127.0.0.1:8000/index.html")

driver.find_element(By.LINK_TEXT, "Manage Students").click()

time.sleep(3)

rows = driver.find_elements(
    By.XPATH, "//table/tr[position()>1]/td[2]"
)

names = [row.text for row in rows if row.text.strip()]
expected = sorted(names, key=str.lower)

if names == expected:
    print("PASS: Names are sorted A-Z")
else:
    print("FAIL: Names are not sorted A-Z")
    print("Actual:", names)
    print("Expected:", expected)

driver.quit()
