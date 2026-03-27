# API Setup Instructions

## Getting a NewsAPI Key

1. Go to [https://newsapi.org/](https://newsapi.org/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Replace `YOUR_NEWS_API_KEY` in `src/App.jsx` (line 18) with your actual API key

## How the API Works (Beginner Friendly)

The API integration is now completely in `App.jsx` with simple, easy-to-explain code:

### State Variables
- `articles` - Stores the news articles from API
- `loading` - Shows loading spinner while fetching
- `error` - Shows error message if API fails
- `selectedCategory` - Current news category
- `articlesRead` - Counter for read articles

### API Function
The `fetchNews()` function:
1. Sets loading to true
2. Makes API request to NewsAPI
3. Transforms the data to our format
4. Stores articles in state
5. Handles errors gracefully

### useEffect Hook
Runs automatically when:
- App first loads
- User changes category

## Features

✅ **Top Headlines** by category  
✅ **Loading states** with spinner  
✅ **Error handling** with helpful messages  
✅ **Category filtering**  
✅ **Article tracking** (read/unread)  
✅ **Responsive grid layout**

## Usage

1. Add your API key to `App.jsx`
2. Run `npm run dev`
3. Select categories to filter news
4. Click articles to expand them
5. Mark articles as read

The code is written to be simple and easy to explain, with clear comments and straightforward logic.
