from flask import Flask, jsonify,request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)


# ----------------------------
# Database Connection
# ----------------------------
def get_connection():
    conn = sqlite3.connect("../database/hospitals.db")
    conn.row_factory = sqlite3.Row
    return conn


# ----------------------------
# Home
# ----------------------------
@app.route("/")
def home():
    return {
        "message": "Honeybee Business Dashboard API Running"
    }


# ----------------------------
# Get All Hospitals
# ----------------------------
@app.route("/hospitals")
def hospitals():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM hospitals
    """)

    rows = cursor.fetchall()

    conn.close()

    return jsonify([dict(row) for row in rows])


# ----------------------------
# Top Rated Hospitals
# ----------------------------
@app.route("/top-rated")
def top_rated():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM hospitals
        ORDER BY rating DESC
        LIMIT 10
    """)

    rows = cursor.fetchall()

    conn.close()

    return jsonify([dict(row) for row in rows])


# ----------------------------
# Dashboard Statistics
# ----------------------------
@app.route("/stats")
def stats():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM hospitals")
    total = cursor.fetchone()[0]

    cursor.execute("SELECT ROUND(AVG(rating),2) FROM hospitals")
    avg_rating = cursor.fetchone()[0]

    cursor.execute("SELECT MAX(rating) FROM hospitals")
    highest = cursor.fetchone()[0]

    conn.close()

    return jsonify({

        "total_hospitals": total,

        "average_rating": avg_rating,

        "highest_rating": highest

    })



@app.route("/search")
def search():

    keyword = request.args.get("name", "")

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT *
        FROM hospitals
        WHERE business_name LIKE ?
        """,
        (f"%{keyword}%",)
    )
@app.route("/city/<city_name>")
def city_filter(city_name):

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT *
        FROM hospitals
        WHERE city = ?
        """,
        (city_name,)
    )

    rows = cursor.fetchall()

    conn.close()

    return jsonify([dict(row) for row in rows])
    rows = cursor.fetchall()

    conn.close()

    return jsonify([dict(row) for row in rows])
@app.route("/city-count")
def city_count():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT city, COUNT(*) AS total
        FROM hospitals
        GROUP BY city
    """)

    rows = cursor.fetchall()
    conn.close()

    return jsonify([dict(row) for row in rows])
@app.route("/category-count")
def category_count():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT category, COUNT(*) AS total
        FROM hospitals
        GROUP BY category
    """)

    rows = cursor.fetchall()
    conn.close()

    return jsonify([dict(row) for row in rows])
@app.route("/source-count")
def source_count():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT source, COUNT(*) AS total
        FROM hospitals
        GROUP BY source
    """)

    rows = cursor.fetchall()
    conn.close()

    return jsonify([dict(row) for row in rows])
if __name__ == "__main__":
    app.run(debug=True)
    
@app.route("/stats")
def stats():

    conn = get_connection()
    cursor = conn.cursor()

    # Total Hospitals
    cursor.execute("SELECT COUNT(*) FROM hospitals")
    total = cursor.fetchone()[0]

    # Average Rating
    cursor.execute("SELECT ROUND(AVG(rating),1) FROM hospitals")
    avg_rating = cursor.fetchone()[0]

    # Total Cities
    cursor.execute("SELECT COUNT(DISTINCT city) FROM hospitals")
    cities = cursor.fetchone()[0]

    # Total Sources
    cursor.execute("SELECT COUNT(DISTINCT source) FROM hospitals")
    sources = cursor.fetchone()[0]

    conn.close()

    return jsonify({
        "total": total,
        "avg_rating": avg_rating,
        "cities": cities,
        "sources": sources
    })