import { useState, useEffect } from 'react'

interface UrlItem {
  id: string
  original_url: string
  short_url: string
  created_at: string
  click_count: number
}

function Header() {
  return (
    <h1 
      style={{ 
        color: 'blue', 
        textAlign: 'center', 
        fontSize: '2.5em', 
        marginBottom: '30px' 
      }}
    >

    </h1>
  )
}

interface ButtonProps {
  texte: string
  couleur: string
  onClick?: () => void 
}

function Button({ texte, couleur, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '15px 30px',
        background: couleur,
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontSize: '16px',
        cursor: 'pointer',
        margin: '10px'
      }}
    >
      {texte}
    </button>
  )
}

interface CardProps {
  title: string
  description: string
}

function Card({ title, description }: CardProps) {
  return (
    <div 
      style={{
        border: '2px solid #ccc',
        borderRadius: '15px',
        padding: '25px',
        margin: '20px auto',
        maxWidth: '450px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}
    >
      <h2 style={{ color: 'purple', marginBottom: '15px' }}>{title}</h2>
      <p style={{ color: '#666', lineHeight: '1.6' }}>{description}</p>
    </div>
  )
}

function App() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [urls, setUrls] = useState<UrlItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchUrls = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/urls')
      if (!res.ok) throw new Error('Backend erreur')
      const data = await res.json()
      setUrls(data)
      setError('')
    } catch (err) {
      setError('Backend pas démarré ? (localhost:3000)')
    }
  }

  const createShortUrl = async () => {
    if (!originalUrl) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('http://localhost:3000/api/urls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl })
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Erreur création')
      }

      const newUrl = await res.json()
      setUrls([newUrl, ...urls])
      setOriginalUrl('')
    } catch (err: any) {
      setError(err.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchUrls()
  }, [])

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <Header />
      
      <Card 
        title="Backend Day4 PostgreSQL" 
        description="React ↔ Express ↔ PostgreSQL : URLs persistantes !" 
      />


      <div style={{ 
        margin: '30px auto', 
        maxWidth: '600px', 
        display: 'flex', 
        gap: '10px', 
        justifyContent: 'center' 
      }}>
        <input
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="https://www.google.com"
          style={{
            flex: 1,
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
          disabled={loading}
        />
        <Button
          texte={loading ? '...' : 'Raccourcir'}
          couleur="green"
          onClick={createShortUrl}
        />
      </div>

      {error && (
        <p style={{ 
          color: 'red', 
          background: '#ffe6e6', 
          padding: '10px', 
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          {error}
        </p>
      )}

      <Button
        texte="🔄 Recharger depuis PostgreSQL"
        couleur="#ff9500"
        onClick={fetchUrls}
      />

      <div style={{ 
        marginTop: '40px', 
        textAlign: 'left',
        maxWidth: '900px',
        marginInline: 'auto'
      }}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>
          📋 URLs stockées ({urls.length})
        </h2>
        
        {urls.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>
            Aucune URL. Crée la première !
          </p>
        ) : (
          urls.map((url) => (
            <div
              key={url.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '20px',
                marginBottom: '15px',
                background: '#f9f9f9'
              }}
            >
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div>
                  <p><strong>ID :</strong> {url.id}</p>
                  <p><strong>Clics :</strong> {url.click_count}</p>
                  <p><small>Créée : {new Date(url.created_at).toLocaleString()}</small></p>
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <p><strong>Short :</strong></p>
                  <a 
                    href={url.short_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#0066cc', 
                      textDecoration: 'none', 
                      fontFamily: 'monospace',
                      wordBreak: 'break-all'
                    }}
                  >
                    {url.short_url}
                  </a>
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <p><strong>Original :</strong></p>
                  <a 
                    href={url.original_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#0066cc', 
                      textDecoration: 'none',
                      fontSize: '14px',
                      wordBreak: 'break-all'
                    }}
                  >
                    {url.original_url.length > 50 
                      ? url.original_url.slice(0, 50) + '...' 
                      : url.original_url
                    }
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Card 
        title="Fullstack Complet " 
        description="React (Day2) + Express + PostgreSQL (Day4) = Application production-ready !" 
      />
    </div>
  )
}

export default App
