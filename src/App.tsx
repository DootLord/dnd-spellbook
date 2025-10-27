import './App.css'
import { useEffect, useMemo, useState } from 'react'
import spellsJSON from '../spells.json'
import CardGrid from './components/card-grid/CardGrid'
import CardSearch from './components/search/card-search';

export type spellsJSONDataType = typeof spellsJSON[keyof typeof spellsJSON];

function App() {
  const spellsJSONKeys = Object.keys(spellsJSON);
  const allSpells = [
    ...spellsJSONKeys.map((key) => (spellsJSON as any)[key])
  ];
  const [searchText, setSearchText] = useState("");
  const [currentSpells, setCurrentSpells] = useState<spellsJSONDataType[]>([]);

  useEffect(() => {
    if (searchText.trim() === "") {
      setCurrentSpells(allSpells);
      return;
    }

    const filteredSpells = [ //? Learning note: useMemo means we're only using it once!
      ...spellsJSONKeys.map((key) => (spellsJSON as any)[key])
    ].filter((spell) => {
      return spell.name.toLowerCase().includes(searchText.toLowerCase())
    });

    setCurrentSpells(filteredSpells);
  }, [searchText]);


  return (
    <>
      <CardSearch onSearchChange={setSearchText} />
      <CardGrid columns={4} cards={currentSpells}></CardGrid>
    </>
  )
}

export default App
