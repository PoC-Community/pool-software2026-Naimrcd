function Header() {
  return (<h1 style={{ color: 'blue', textAlign: 'center', fontSize: '2.5em', marginBottom: '30px' }}> Day 2 React - Step 1.2</h1>
  )
}
  

function App() {
  
  const nom = "Naim"  
  const age = 20
  
  return (
    
    <div style={{ padding: '50px', textAlign: 'center' }}>
      
      <Header /> 

      
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
