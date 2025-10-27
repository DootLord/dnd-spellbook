import './App.css'
import Card from './components/card/card'

function App() {

  return (
    <>
      <Card title={'Acid Splash'} level={0} classes={["Wizard", "Sourcerer"]} range={60} duration={0} castingTime={1} img={'Acid Splash'}></Card>
    </>
  )
}

export default App
