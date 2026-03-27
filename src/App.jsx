
import { useEffect, useState } from 'react'
import './App.css'
import Categories from './components/Categories'
import NewsCard from './components/NewsCard'
import NavBar from './components/NavBar'
import axios from 'axios';

function App() {
  // State variables - these store our data
  const [articles, setArticles] = useState([])        // News articles
  const [loading, setLoading] = useState(true)       // Loading state
  const [error, setError] = useState(null)           // Error message
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem('selectedCategory') || 'general'
  })  // Current category
  const [articlesRead, setArticlesRead] = useState(() => {
    return parseInt(localStorage.getItem('articlesRead')) || 0
  })  // Read articles counter
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })    // Dark mode state
  const [readArticles, setReadArticles] = useState(() => {
    const saved = localStorage.getItem('readArticles')
    return saved ? JSON.parse(saved) : []
  })

  // API configuration
  const API_KEY = '875ad90a20ad4917b17e7ec640dbcbfc'  // Replace with your actual API key
  const BASE_URL = 'https://newsapi.org/v2'

  // Function to fetch news from API
  const fetchNews = async (category) => {
    try {
      setLoading(true)           // Show loading state
      setError(null)             // Clear any previous errors
      
      // Make API request
      const response = await axios.get(`${BASE_URL}/top-headlines`, {
        params: {
          apiKey: API_KEY,
          category: category,
          country: 'us',
          pageSize: 20
        }
      })
      
      // Transform and store the data
      const newsData = response.data.articles.map(article => ({
        id: article.url,
        title: article.title,
        description: article.description,
        source: article.source.name,
        publishedAt: new Date(article.publishedAt).toLocaleDateString(),
        url: article.url
      }))
      
      setArticles(newsData)      // Store articles in state
      
    } catch (err) {
      // Handle errors
      setError('Failed to load news. Please check your API key.')
      console.error('API Error:', err)
    } finally {
      setLoading(false)          // Hide loading state
    }
  }

  // useEffect runs when component mounts or when category changes
  useEffect(() => {
    fetchNews(selectedCategory)
    localStorage.setItem('selectedCategory', selectedCategory)
  }, [selectedCategory])

  // Apply dark mode class to body element and save to localStorage
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  // Event handlers
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  const handleMarkRead = (articleId) => {
    // Only increment counter if article hasn't been read yet
    if (articleId && !readArticles.includes(articleId)) {
      setArticlesRead(prev => {
        const newCount = prev + 1
        localStorage.setItem('articlesRead', newCount)
        return newCount
      })
      
      setReadArticles(prev => {
        const updated = [...prev, articleId]
        localStorage.setItem('readArticles', JSON.stringify(updated))
        return updated
      })
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  return (
    <>
    <NavBar 
      articlesRead={articlesRead}
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
    />
    <Categories 
      onCategoryChange={handleCategoryChange} 
      selectedCategory={selectedCategory}
    />
    <NewsCard 
      articles={articles} 
      loading={loading} 
      error={error}
      onMarkRead={handleMarkRead}
      readArticles={readArticles}
    />
    </>
  )
}

export default App
