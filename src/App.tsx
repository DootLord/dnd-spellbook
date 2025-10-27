import './App.css'
import spellsJSON from '../spells.json'
import CardGrid from './components/card-grid/CardGrid'

export type spellsJSONDataType = typeof spellsJSON[keyof typeof spellsJSON];

function App() {
  const spellsJSONKeys = Object.keys(spellsJSON);

  // Get ALL of the spell data using spellsJSONKeys
  let cardData = [
    ...spellsJSONKeys.map((key) => (spellsJSON as any)[key])
  ]

  return (
    <>
      <CardGrid columns={4} cards={cardData}></CardGrid>
    </>
  )
}

export default App
