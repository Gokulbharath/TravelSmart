/**
 * MongoDB Index Fix Script
 * 
 * Run this script to drop the userId_1 index causing duplicate key errors
 * 
 * Usage:
 * 1. Connect to MongoDB:
 *    mongosh "your-mongodb-connection-string"
 * 
 * 2. Or use MongoDB Compass shell
 * 
 * 3. Copy and paste the commands below
 */

// Step 1: Switch to your database (change 'test' to your actual database name)
// Common names: 'test', 'travelsmart', 'travelsmartdb'
use test;
// OR
// use travelsmart;

// Step 2: Drop the problematic userId_1 index
db.users.dropIndex("userId_1");

// Step 3: Verify the index is dropped
print("Current indexes on users collection:");
db.users.getIndexes();

// Step 4: Verify only correct indexes exist
// Should show:
// - _id_ (default MongoDB index)
// - email_1 (unique index on email)
// - NO userId_1 ✅

print("\n✅ Fix complete! The userId_1 index has been removed.");
print("You can now register users without the E11000 duplicate key error.");

