function Header() {
  return (<h1 style={{ color: 'blue', textAlign: 'center', fontSize: '2.5em', marginBottom: '30px' }}> Day 2 React - Step 1.2</h1>
  )
}
  
interface ButtonProps {
  texte: string
  couleur: string
}

function Button({ texte, couleur }: ButtonProps) {
  return (
    <button 
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

function App() {
  
  const nom = "Naim"  
  const age = 20
  
  return (
    
    <div style={{ padding: '50px', textAlign: 'center' }}>
      
      <Header />
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', margin: '30px 0' }}>
  <Button texte="Clique Vert" couleur="green" />
  <Button texte="Clique Rouge" couleur="red" />
</div>


      
      <p>Bonjour <strong>{nom}</strong> !</p>
      
      
      <p>Tu as <strong>{age}</strong> ans</p>
      
      
      <p>En 2030 tu auras <strong>{age + 4}</strong> ans</p>
      
      <p style={{ color: 'green', fontSize: '20px' }}>
         Step 1.1 TERMINÉ !
      </p>
    </div>
  )
}

export default App
