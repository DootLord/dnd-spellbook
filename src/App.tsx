import './App.css'
import { useMemo, useState } from 'react'
import spellsJSON from '../spells.json'
import CardGrid from './components/card-grid/CardGrid'
import CardSearch from './components/search/card-search';

export type spellsJSONDataType = typeof spellsJSON[keyof typeof spellsJSON];

const spellsJSONKeys = Object.keys(spellsJSON);
const allSpells = [
  ...spellsJSONKeys.map((key) => (spellsJSON as any)[key])
];
function App() {

  const [searchText, setSearchText] = useState("");

  //? Learning note! useMemo is for derived values, useState is for values that can change indepenedantly
  const currentSpells = useMemo(() => {
    if (searchText.trim() === "") {
      return allSpells;
    }

    return allSpells.filter((spell) => {
      return spell.name.toLowerCase().includes(searchText.toLowerCase())
    });
  }, [searchText]);


  return (
    <>
      <CardSearch onSearchChange={setSearchText} />
      <CardGrid columns={4} cards={currentSpells}></CardGrid>
    </>
  )
}

export default App
