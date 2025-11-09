### ⚡ Data Caching ('use cache' & cacheLife())

This project uses **Next.js App Router caching** to optimize server data fetching.

```ts
'use cache';
cacheLife('hours');

const res = await fetch(`${BASE_URL}/api/events`);
const { events } = await res.json();
```

**How it works:**
- 'use cache' enables caching for the component.
- `cacheLife('hours')` sets the cache duration to 1 hour.
- Cached data is reused across requests for faster load times.
- After expiration, Next.js refetches and refreshes automatically.

**When to use:**
-  Static or semi-static data (events, blog posts, etc.)
-  Avoid for user-specific or real-time data

**Bypass cache:**
```ts
fetch(url, { cache: 'no-store' });
```

**Benefits:**  
- Faster load times  
- Reduced API calls  
- Auto revalidation  
