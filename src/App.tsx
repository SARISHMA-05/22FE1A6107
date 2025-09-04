import { useState } from 'react'

function App() {
  const [url, setUrl] = useState('')
  const [shortUrls, setShortUrls] = useState<{ [key: string]: string }>({})
  const [shortcode, setShortcode] = useState('')

  // Simple function to generate a random shortcode (you can improve this later)
  const generateShortcode = () => {
    return Math.random().toString(36).substring(2, 8)
  }

  const handleShorten = () => {
    let code = generateShortcode()
    // Ensure shortcode is unique in shortUrls
    while (shortUrls[code]) {
      code = generateShortcode()
    }

    // Save shortcode and url mapping
    setShortUrls((prev) => ({ ...prev, [code]: url }))
    setShortcode(code)
  }

  return (
    <div>
      <h1>URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter a URL to shorten"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleShorten}>Shorten</button>

      {shortcode && (
        <p>
          Short URL: <a href={`/${shortcode}`}>{window.location.origin}/{shortcode}</a>
        </p>
      )}
    </div>
  )
}

export default App
