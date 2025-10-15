# Testing Guide - React Query Demo

## 📋 Complete Testing Checklist

Follow these steps to thoroughly test all features of the React Query implementation.

---

## ✅ Step 1: Initial Load Testing

### What to Test:
Verify that the application loads correctly and fetches data from the API.

### Steps:
1. Open the application at `http://localhost:5173/`
2. **Expected Behavior:**
   - You should see "Loading posts..." message briefly
   - After loading, 100 posts should be displayed in a grid
   - Header should show "Posts from JSONPlaceholder API"
   - Status indicator should show "✅ Data Loaded"
   - Total posts count should display "100"

### Browser DevTools Check:
- Open DevTools (F12) → Network Tab
- Refresh the page
- Look for a request to `https://jsonplaceholder.typicode.com/posts`
- Verify: Response Status = 200, Response contains 100 posts

✔️ **Pass Criteria**: Posts load successfully with no errors

---

## ✅ Step 2: Caching Behavior Testing

### What to Test:
Verify that React Query caches data and doesn't make unnecessary API calls.

### Test 2A: Navigate Away and Return
1. After posts load, open a new tab or navigate to another page
2. Return to the React Query demo tab
3. **Expected Behavior:**
   - Data should appear **instantly** (no loading state)
   - No new network request should be made

### Verification:
- **Network Tab**: Should show NO new request to the API
- **React Query DevTools**: Query should show as "fresh" or "stale" (depending on time)

### Test 2B: Cache Expiration
1. Wait for more than 1 minute (staleTime = 60 seconds)
2. Switch tabs and come back
3. **Expected Behavior:**
   - Data still loads from cache instantly
   - React Query may fetch fresh data in the background

### Test 2C: Full Cache Expiration
1. Leave the page idle for more than 5 minutes (cacheTime = 300 seconds)
2. Return to the page
3. **Expected Behavior:**
   - Loading state appears again
   - New API request is made
   - Fresh data is loaded

✔️ **Pass Criteria**: Cache prevents unnecessary API calls within the configured time

---

## ✅ Step 3: Manual Refetch Testing

### What to Test:
Verify that the refetch button works correctly.

### Steps:
1. Once posts are loaded, click the "Refetch Posts" button
2. **Expected Behavior:**
   - Button text changes to "Refetching..."
   - Button becomes disabled
   - Status indicator shows "🔄 Fetching..."
   - A new API request is made (check Network tab)
   - Data updates if there are any changes
   - After completion, button returns to "Refetch Posts"
   - Status shows "✅ Data Loaded"

### Verification:
- **Network Tab**: Should show a new GET request to the API
- **UI**: Smooth transition between states with no flickering

✔️ **Pass Criteria**: Refetch button triggers new data fetch successfully

---

## ✅ Step 4: Error Handling Testing

### What to Test:
Verify that error states are handled gracefully.

### Steps:
1. **Simulate Network Error:**
   - Open DevTools → Network Tab
   - Enable "Offline" mode (or throttle to "Offline")
   - Click "Refetch Posts" button

2. **Expected Behavior:**
   - Error message appears: "Error fetching posts"
   - Error details are displayed
   - "Try Again" button is shown

3. **Recovery Test:**
   - Re-enable network in DevTools
   - Click "Try Again" button
   - Data should load successfully

✔️ **Pass Criteria**: Errors display properly with recovery options

---

## ✅ Step 5: React Query DevTools Testing

### What to Test:
Verify that DevTools provide proper insights into query state.

### Steps:
1. Look for the React Query DevTools icon (floating flower icon) in the bottom-right corner
2. Click to open the DevTools
3. **What to Observe:**
   - Query Key: `['posts']`
   - Query Status: fresh → fetching → stale
   - Cache data: View the actual cached posts
   - Observers: Number of components using this query
   - Last Updated timestamp

4. **Interactive Testing:**
   - Click "Refetch" in DevTools
   - Observe query status changes in real-time
   - View cache entries
   - Check query lifecycle timestamps

✔️ **Pass Criteria**: DevTools accurately reflect query state and cache data

---

## ✅ Step 6: Loading State Testing

### What to Test:
Verify loading states are displayed correctly.

### Steps:
1. **Initial Load:**
   - Refresh the page
   - Observe "Loading posts..." message
   - Should be centered with blue color

2. **Refetch Loading:**
   - Click "Refetch Posts"
   - Button should show "Refetching..."
   - Status indicator should show "🔄 Fetching..."

✔️ **Pass Criteria**: Loading states are clear and user-friendly

---

## ✅ Step 7: UI/UX Testing

### What to Test:
Verify the user interface is responsive and interactive.

### Steps:
1. **Responsive Layout:**
   - Resize browser window
   - Cards should reorganize in grid (1, 2, 3, or 4 columns)

2. **Hover Effects:**
   - Hover over post cards → should lift slightly
   - Hover over button → should change color and scale

3. **Content Display:**
   - Each post card shows: ID badge, title, and body text
   - Titles are capitalized
   - IDs are in blue badges

✔️ **Pass Criteria**: UI is responsive and interactive

---

## ✅ Step 8: Performance Testing

### What to Test:
Verify that caching improves performance.

### Test Setup:
1. Clear browser cache (Ctrl + Shift + Delete)
2. Open Network Tab in DevTools
3. Enable "Disable cache" in Network settings

### Performance Test:
1. **First Load:**
   - Refresh page
   - Note the time to fetch data (check Network tab)
   - Should take 200-500ms depending on connection

2. **Second Load (from cache):**
   - Navigate away and back (or use React Router if implemented)
   - Data should load in < 10ms (instant)
   - No network request

3. **Network Impact:**
   - Count total API requests over 5 minutes
   - With cache: 1-2 requests
   - Without cache: Many more requests

✔️ **Pass Criteria**: Caching significantly reduces API calls and improves load times

---

## ✅ Step 9: Console Error Testing

### What to Test:
Ensure no console errors or warnings appear.

### Steps:
1. Open Console tab in DevTools
2. Perform all the above tests
3. **Expected Behavior:**
   - No errors in console
   - No warnings about React Query configuration
   - No warnings about deprecated APIs

✔️ **Pass Criteria**: Clean console with no errors

---

## ✅ Step 10: Integration Testing Summary

### Final Checklist:

- [ ] Application loads without errors
- [ ] Posts fetch successfully from API
- [ ] Loading states display correctly
- [ ] Error states handle failures gracefully
- [ ] Caching prevents unnecessary API calls
- [ ] Refetch button works as expected
- [ ] React Query DevTools show accurate information
- [ ] UI is responsive and interactive
- [ ] No console errors or warnings
- [ ] Performance improves with caching

---

## 🎯 Expected Results Summary

| Feature | Expected Behavior | Verification Method |
|---------|------------------|-------------------|
| Initial Load | Shows loading then displays 100 posts | Visual + Network Tab |
| Caching | No API call on return visit within 5 min | Network Tab |
| Refetch | New API call on button click | Network Tab |
| Error Handling | Error message with retry option | Offline mode test |
| DevTools | Shows query state and cache | React Query DevTools |
| Loading States | Clear feedback during fetch | Visual observation |
| UI Responsiveness | Grid adjusts to screen size | Browser resize |
| Performance | Faster load times with cache | Network Tab timing |

---

## 🐛 Common Issues and Solutions

### Issue: "React Query is not installed"
**Solution**: Run `npm install @tanstack/react-query`

### Issue: Posts don't load
**Solution**: Check network connection and API endpoint

### Issue: Cache not working
**Solution**: Verify QueryClient configuration and cacheTime settings

### Issue: DevTools not visible
**Solution**: Ensure `@tanstack/react-query-devtools` is installed

### Issue: Network request on every visit
**Solution**: Check that `refetchOnWindowFocus` is set to false

---

## 📊 Testing Report Template

Use this template to document your testing results:

```
TESTING REPORT - React Query Demo
Date: [Date]
Tester: [Your Name]

✅ Initial Load: PASS / FAIL
✅ Caching: PASS / FAIL
✅ Refetch: PASS / FAIL
✅ Error Handling: PASS / FAIL
✅ DevTools: PASS / FAIL
✅ Loading States: PASS / FAIL
✅ UI/UX: PASS / FAIL
✅ Performance: PASS / FAIL
✅ Console Clean: PASS / FAIL

Notes:
[Any observations or issues]

Overall Status: PASS / FAIL
```

---

## 🎓 Learning Verification

After testing, you should be able to answer:

1. What is the difference between `staleTime` and `cacheTime`?
2. When does React Query make a new API request?
3. How does caching improve application performance?
4. What information can you see in React Query DevTools?
5. How does React Query handle errors?

---

**Good Luck with Testing! 🚀**
