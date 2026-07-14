import sqlite3

connection = sqlite3.connect("hospitals.db")
cursor = connection.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS hospitals (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    business_name TEXT,

    category TEXT,

    city TEXT,

    address TEXT,

    phone TEXT,

    rating REAL,

    reviews TEXT,

    source TEXT,

    created_at TEXT
)
""")

connection.commit()

print("✅ Database Created Successfully!")

connection.close()