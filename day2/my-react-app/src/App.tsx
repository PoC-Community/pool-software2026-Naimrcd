function Header() {
  return (<h1 style={{ color: 'blue', textAlign: 'center', fontSize: '2.5em', marginBottom: '30px' }}> Day 2 React - Step 1.2</h1>
  )
}
  
interface ButtonProps {
  texte: string
  couleur: string
  onClick: Function

}

function Button({ texte, couleur, onClick }: ButtonProps) {
  return (
    <button
    onClick= {onClick} 
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
    <div style={{
      border: '2px solid #ccc',
      borderRadius: '15px',
      padding: '25px',
      margin: '20px auto',
      maxWidth: '450px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: 'purple', marginBottom: '15px' }}>{title}</h2>
      <p style={{ color: '#666', lineHeight: '1.6' }}>{description}</p>
    </div>
  )
}

function App() {
  
  
  return (
    
    <div style={{ padding: '50px', textAlign: 'center' }}>
      
      <Header />
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', margin: '30px 0' }}>
  <Button onClick={function(){alert("ok")}} texte="Clique 1" couleur="green" />
  <Button texte="Clique 2" couleur="red" />
</div>

<Card 
  title=" Bomboclat Step 1.2 " 
  description="Header + Button(props) + Card(props) = Putain de bien fait !" 
/>

      <p style={{ color: 'green', fontSize: '20px' }}>Composition ok </p>
    </div>
  )
}

export default App
