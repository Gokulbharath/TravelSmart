# Fix: E11000 Duplicate Key Error on userId

## Problem
```
E11000 duplicate key error collection: test.users index: userId_1 dup key: { userId: null }
```

## Root Cause
MongoDB has a stale unique index `userId_1` that was created previously. The current User schema does NOT have a userId field, but the index still exists in the database.

## Solution

### Step 1: Drop the Bad Index

**Option A: Using MongoDB Shell**
```bash
# Connect to your MongoDB database
mongosh "your-mongodb-connection-string"

# Or if using MongoDB Compass, open the MongoDB shell
```

```javascript
// Switch to your database (replace 'test' or 'travelsmart' with your actual database name)
use test
// OR
use travelsmart

// Drop the userId_1 index
db.users.dropIndex("userId_1")

// Verify index is dropped
db.users.getIndexes()
```

**Option B: Using MongoDB Compass**
1. Open MongoDB Compass
2. Connect to your database
3. Navigate to `test` or `travelsmart` database
4. Click on `users` collection
5. Go to "Indexes" tab
6. Find `userId_1` index
7. Click the "Drop Index" button next to it

**Option C: Using MongoDB Atlas Web UI**
1. Go to MongoDB Atlas
2. Click on "Browse Collections"
3. Select your database → `users` collection
4. Click on "Indexes" tab
5. Find `userId_1` index
6. Click "Drop Index"

### Step 2: Verify Schema (Already Correct)

The User schema is already correct - it does NOT have a userId field:

```javascript
// server/models/User.js - CORRECT ✅
const userSchema = new mongoose.Schema({
  name: { ... },
  email: { unique: true, ... },  // Only email is unique ✅
  password: { ... },
  phone: { ... },
  preferences: { ... }
  // NO userId field ✅
});
```

### Step 3: Verify Controller (Already Correct)

The controller correctly uses `_id`:

```javascript
// server/controllers/authController.js - CORRECT ✅
user: {
  id: user._id,  // Uses MongoDB's _id ✅
  // ...
}
```

## Verification

After dropping the index, verify:

1. **Check Indexes:**
```javascript
db.users.getIndexes()
// Should show:
// - _id_ (default MongoDB index)
// - email_1 (unique index on email)
// - NO userId_1 index ✅
```

2. **Test Registration:**
- Register a new user → Should succeed
- Register with same email → Should get duplicate email error (not userId error)
- Register multiple different emails → Should all succeed

3. **Check Collection Structure:**
```javascript
db.users.findOne()
// Should NOT have userId field
// Should have: _id, name, email, password, phone, preferences, createdAt, updatedAt
```

## Expected Indexes After Fix

```javascript
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { email: 1 }, name: 'email_1', unique: true }
]
// NO userId_1 index ✅
```

## Quick Fix Command (Copy-Paste Ready)

```javascript
// MongoDB Shell - Copy and paste this:
use test;  // or use travelsmart (your actual database name)
db.users.dropIndex("userId_1");
db.users.getIndexes();  // Verify it's gone
```

## After Fix

- ✅ Registration should work without E11000 error
- ✅ Multiple users can register
- ✅ Only email has unique constraint
- ✅ No userId field exists in schema or database

