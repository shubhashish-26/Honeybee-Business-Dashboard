import sqlite3
import pandas as pd
from datetime import datetime

df = pd.read_csv("../output/business_listings.csv")

# Rename CSV columns
df.columns = [
    "business_name",
    "category",
    "city",
    "address",
    "phone",
    "rating",
    "reviews"
]

# Add required columns
df["source"] = "Justdial"
df["created_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

connection = sqlite3.connect("hospitals.db")

df.to_sql(
    "hospitals",
    connection,
    if_exists="append",
    index=False
)

connection.commit()
connection.close()

print("✅ Data Inserted Successfully!")