import sqlite3

connection = sqlite3.connect("hospitals.db")

cursor = connection.cursor()

cursor.execute("SELECT * FROM hospitals")

rows = cursor.fetchall()

print("=" * 100)
print("HOSPITALS IN DATABASE")
print("=" * 100)

for row in rows:
    print(row)

print("\nTotal Records :", len(rows))

connection.close()