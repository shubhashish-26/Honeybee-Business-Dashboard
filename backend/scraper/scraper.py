from playwright.sync_api import sync_playwright
import pandas as pd
import time
from utils import save_to_csv


def main():

    

    with sync_playwright() as p:

        browser = p.chromium.launch(headless=False)

        page = browser.new_page(
            viewport={"width": 1400, "height": 900}
        )

        page.goto(
            "https://www.justdial.com/Delhi/Hospitals",
            wait_until="domcontentloaded",
            timeout=120000
        )

        page.wait_for_timeout(5000)

        print("✅ Website Loaded Successfully!")

        # Scroll to load more businesses
        for i in range(15):
            page.mouse.wheel(0, 3000)
            print(f"Scrolling... {i+1}")
            page.wait_for_timeout(2000)

        print("✅ Scrolling Completed!")
        cards = page.locator("div.resultbox")

        print("Cards Found:", cards.count())

        print("\n==============================")
        print("FIRST CARD HTML")
        print("==============================")
        businesses = []

        for i in range(cards.count()):
            

            card = cards.nth(i)
 
            text = card.inner_text().split("\n")
            

            print("=" * 60)
            print(f"CARD {i+1}")
            print("=" * 60)
            hospital = ""
            

            rating = ""

            reviews = ""

            address = ""

            phone = ""
            for line in text:               
                line = line.strip()
                 # Rating
                # Phone (check first)
                if line.isdigit() and len(line) >= 10:                    
                    phone = line
# Rating
                elif line.replace(".", "", 1).isdigit():
                    rating = line
# Reviews
                elif "Ratings" in line:
                    reviews = line

    # Hospital Name
                elif (
                    
                    "Hospital" in line
                    or "Clinic" in line
                    or "Medical" in line
                    or "Medicity" in line
                    or "Health" in line
                    or "Care" in line
                ) and hospital == "":                                      
                    hospital = line

    # Address
                elif (
                    ("Road" in line or "Sector" in line or "Delhi" in line or "Gurgaon" in line)
                    and address == ""
                ):
                    address = line
            
            
            if hospital == "":
                 continue
             
            city = "Unknown"

            if "Delhi" in address: 
                
                         
                city = "Delhi"

            elif "Gurgaon" in address:
                
                city = "Gurgaon"
            elif "Faridabad" in address:
                city = "Faridabad"
            elif "Ghaziabad" in address:
                city = "Ghaziabad"

            elif "Noida" in address:
                city = "Noida"       
            businesses.append({
                "Business Name": hospital.strip(),
                 "Category": "Hospital",
                 "City": city.strip(),
                 "Address": address.strip(),
                 "Phone": phone.strip(),
                 "Rating": rating.strip(),
                 "Reviews": reviews.strip()                
            })
            print()

            print(f"Business Name : {hospital}")
            print(f"Category      : Hospital")
            print(f"City          : Delhi")
            print(f"Address       : {address}")
            print(f"Phone         : {phone}")
            print(f"Rating        : {rating}")
            print(f"Reviews       : {reviews}")
            
        unique_businesses = []
        seen = set()

        for business in businesses:

            name = business["Business Name"]

            if name not in seen:
                unique_businesses.append(business)
                seen.add(name)

        businesses = unique_businesses
        print("\n" + "=" * 60)
        print("TOTAL UNIQUE HOSPITALS :", len(businesses))
        print("=" * 60)
            
         
        save_to_csv(
            
            businesses,
         
              "../output/business_listings.csv"
        )
        print("\n✅ CSV Saved Successfully!")
        browser.close()

if __name__ == "__main__":
    main()