import { useState, useEffect } from 'react'

function Home() {
  const [url, setUrl] = useState('')
  const [shortcode, setShortcode] = useState('')
  const [shortUrls, setShortUrls] = useState<{ [key: string]: string }>({})

  // Load saved URLs from localStorage on mount
  useEffect(() => {
    const storedUrls = localStorage.getItem('shortUrls')
    if (storedUrls) {
      setShortUrls(JSON.parse(storedUrls))
    }
  }, [])

  // Save URLs to localStorage when updated
  useEffect(() => {
    localStorage.setItem('shortUrls', JSON.stringify(shortUrls))
  }, [shortUrls])

  // Generate random shortcode
  const generateShortcode = () => {
    return Math.random().toString(36).substring(2, 8)
  }

  // Validate URL format
  const isValidUrl = (string: string) => {
    try {
      new URL(string)
      return true
    } catch {
      return false
    }
  }

  // Handle shortening URL
  const handleShorten = () => {
    if (!url) {
      alert('Please enter a URL')
      return
    }

    let formattedUrl = url.trim()

    // Add http:// if missing
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'http://' + formattedUrl
    }

    if (!isValidUrl(formattedUrl)) {
      alert('Please enter a valid URL')
      return
    }

    let code = generateShortcode()
    while (shortUrls[code]) {
      code = generateShortcode()
    }

    setShortUrls((prev) => ({ ...prev, [code]: formattedUrl }))
    setShortcode(code)
    setUrl('') // Clear input
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter a URL to shorten"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: 300, padding: 5 }}
      />
      <button onClick={handleShorten} style={{ marginLeft: 10 }}>
        Shorten
      </button>

      {shortcode && (
        <p>
          Short URL:{' '}
          <a href={`/${shortcode}`} target="_blank" rel="noopener noreferrer">
            {window.location.origin}/{shortcode}
          </a>
        </p>
      )}
    </div>
  )
}

export default Home
