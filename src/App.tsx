import './App.css'

import { useMemo, useState } from 'react'
import spellsJSON from '../spells.json'
import CardGrid from './components/card-grid/CardGrid'
import CardSearch from './components/search/CardSearch';

export type spellsJSONDataType = typeof spellsJSON[keyof typeof spellsJSON];

const spellsJSONKeys = Object.keys(spellsJSON) as (keyof typeof spellsJSON)[];
const allSpells = [
  ...spellsJSONKeys.map((key) => (spellsJSON)[key])
];

function App() {
  const [searchText, setSearchText] = useState("");
  const [classFilters, setClassFilters] = useState<string[]>([]);
  const [levelFilters, setLevelFilters] = useState<number[]>([]);

  //? Learning note! useMemo is for derived values, useState is for values that can change indepenedantly
  const currentSpells = useMemo(() => {
    // Search Filter
    const searchFilteredSpells = allSpells.filter((spell) => spell.name.toLowerCase().includes(searchText.toLowerCase()));

    let classFilteredSpells = searchFilteredSpells;
    // Class Filter
    if (classFilters.length > 0) {
      classFilteredSpells = searchFilteredSpells.filter((spell) => {
        return spell.classes.some((spellsClass) => {
          return classFilters.includes(spellsClass.toLowerCase());
        })
      });
    }

    let levelFilteredSpells = classFilteredSpells;
    // Level Filter
    if (levelFilters.length > 0) {
      levelFilteredSpells = classFilteredSpells.filter((spell) => {
        return levelFilters.includes(spell.level);
      });
    }

    return levelFilteredSpells;
  }, [searchText, classFilters, levelFilters]);

  return (
    <>
      <CardSearch onSearchChange={setSearchText} onClassFilterChange={setClassFilters} onSelectedLevelChange={setLevelFilters} />
      <CardGrid columns={4} cards={currentSpells}></CardGrid>
    </>
  )
}

export default App
