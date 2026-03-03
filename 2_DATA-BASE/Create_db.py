import sqlite3
import csv
import os  # Re-included to check if files exist

DB_NAME = "sehat_setu.db"

def create_connection():
    """Create a database connection to the SQLite database."""
    return sqlite3.connect(DB_NAME)

def create_tables(cur):
    """Create the necessary tables if they don't exist."""
    cur.execute("""
    CREATE TABLE IF NOT EXISTS hospitals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hospital_name TEXT UNIQUE
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS insurance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        insurance_name TEXT,
        coverage TEXT,
        notes TEXT
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS treatments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hospital_name TEXT,
        treatment_name TEXT,
        cost_min INTEGER,
        cost_max INTEGER,
        notes TEXT
    )
    """)

def safe_int(value):
    """Safely converts a string to an integer, handling empty strings and commas."""
    try:
        if not value:
            return 0
        # Remove commas (e.g., '1,200') and spaces just in case
        clean_val = value.replace(",", "").strip()
        return int(clean_val)
    except ValueError:
        return 0

def import_hospitals(cur):
    filename = "Hospital_master_sheet.csv"
    if os.path.exists(filename):
        # utf-8-sig handles BOM characters if CSV was made in Excel
        with open(filename, encoding="utf-8-sig") as f:
            reader = csv.DictReader(f)
            count = 0
            for row in reader:
                if row.get("Hospital Name"):
                    cur.execute(
                        "INSERT OR IGNORE INTO hospitals (hospital_name) VALUES (?)",
                        (row["Hospital Name"].strip(),)
                    )
                    count += 1
            print(f"✅ Imported {count} hospitals.")
    else:
        print(f"❌ Warning: '{filename}' not found. Skipping hospital import.")

def import_insurance(cur):
    filename = "Insurance_sheet.csv"
    if os.path.exists(filename):
        with open(filename, encoding="utf-8-sig") as f:
            reader = csv.DictReader(f)
            count = 0
            for row in reader:
                cur.execute(
                    "INSERT INTO insurance (insurance_name, coverage, notes) VALUES (?, ?, ?)",
                    (
                        row.get("Insurance Name", "").strip(),
                        row.get("Coverage", "").strip(),
                        row.get("Notes", "").strip()
                    )
                )
                count += 1
            print(f"✅ Imported {count} insurance records.")
    else:
        print(f"❌ Warning: '{filename}' not found. Skipping insurance import.")

def import_treatments(cur):
    filename = "Treatment_cost_sheet.csv"
    if os.path.exists(filename):
        with open(filename, encoding="utf-8-sig") as f:
            reader = csv.DictReader(f)
            count = 0
            for row in reader:
                # Use safe_int to prevent crashes on empty cost fields or commas
                min_cost = safe_int(row.get("Cost Minimum", "0"))
                max_cost = safe_int(row.get("Cost Maximum", "0"))

                cur.execute(
                    """INSERT INTO treatments
                       (hospital_name, treatment_name, cost_min, cost_max, notes)
                       VALUES (?, ?, ?, ?, ?)""",
                    (
                        row.get("Hospital Name", "").strip(),
                        row.get("Treatment name", "").strip(),
                        min_cost,
                        max_cost,
                        row.get("Notes", "").strip()
                    )
                )
                count += 1
            print(f"✅ Imported {count} treatment records.")
    else:
        print(f"❌ Warning: '{filename}' not found. Skipping treatment import.")

def main():
    print("--- Starting Sehat Setu Database Setup ---")
    
    conn = create_connection()
    cur = conn.cursor()

    create_tables(cur)
    
    # Import functions now verify file existence using os.path.exists
    import_hospitals(cur)
    import_insurance(cur)
    import_treatments(cur)

    conn.commit()
    conn.close()

    print("\n✅ Operation Completed: 'sehat_setu.db' is ready.")

if __name__ == "__main__":
    main()