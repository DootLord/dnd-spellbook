import './App.css'
import Card from './components/card/card'
import spellsJSON from '../spells.json'

function App() {
  const card = spellsJSON['acid-splash'];

  return (
    <>
      <Card title={card.name} level={card.level} classes={card.classes} range={card.range} duration={card.duration} castingTime={card.casting_time} img={card.name}></Card>
    </>
  )
}

export default App
