#!/usr/bin/env python3
"""
Migration script to add photo column to hospitals table
Run this if your database doesn't have the photo column yet
"""

import sqlite3
import sys

def migrate_database(db_path):
    """Add photo column to hospitals table if it doesn't exist"""
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Check if photo column already exists
        cursor.execute("PRAGMA table_info(hospitals)")
        columns = [column[1] for column in cursor.fetchall()]
        
        if 'photo' in columns:
            print("✓ Photo column already exists in hospitals table")
            conn.close()
            return True
        
        # Add photo column
        cursor.execute("ALTER TABLE hospitals ADD COLUMN photo TEXT")
        conn.commit()
        
        print("✓ Successfully added 'photo' column to hospitals table")
        conn.close()
        return True
        
    except sqlite3.Error as e:
        print(f"✗ Database error: {e}")
        return False
    except Exception as e:
        print(f"✗ Error: {e}")
        return False


if __name__ == '__main__':
    db_path = 'instance/sehat_setu.db'
    
    if len(sys.argv) > 1:
        db_path = sys.argv[1]
    
    print(f"Running migration on: {db_path}")
    
    if migrate_database(db_path):
        print("\n✓ Migration completed successfully!")
        sys.exit(0)
    else:
        print("\n✗ Migration failed!")
        sys.exit(1)
