import "./CardSearch.scss"
import { TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

interface CardSearchProps {
    onSearchChange: (query: string) => void;
    // Returns the class names to lowercase strings!
    onClassFilterChange: (classes: string[]) => void;
    onSelectedLevelChange: (levels: number[]) => void;
}

// Just a basic wrapper for MUI's TextField component
function CardSearch({ onSearchChange, onClassFilterChange, onSelectedLevelChange }: CardSearchProps) {
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const [selectedLevels, setSelectedLevels] = useState<number[]>([]);

    const classes = [
        "Wizard",
        "Bard",
        "Cleric",
        "Druid",
        "Sorcerer",
        "Warlock",
        "Ranger",
        "Paladin"
    ]

    function handleClassFilterChange(
        event: React.MouseEvent<HTMLElement>,
        newClasses: string[],
    ) {
        setSelectedClasses(newClasses); // Update local state
        onClassFilterChange(newClasses); // Notify parent component
    }

    function handleLevelFilterChange(
        event: React.MouseEvent<HTMLElement>,
        newLevels: number[],
    ) {
        setSelectedLevels(newLevels); // Update local state
        onSelectedLevelChange(newLevels); // Notify parent component
    }

    return (
        <div id="card-search-container">
            <TextField
                id="spell-search"
                label="Search Spells ✨"
                type="search"
                variant="filled"
                onChange={onSearchChange ? (e) => onSearchChange(e.target.value) : undefined}
                sx={{
                    backgroundColor: 'white',
                    width: "60%",
                    borderRadius: "8px",
                    margin: "8px"
                }}
            />
            
            <ToggleButtonGroup
                className="class-filter-group"
                sx={{
                    backgroundColor: 'white',
                }}
                value={selectedClasses}
                onChange={handleClassFilterChange}

            >
                {
                    classes.map((className) => {
                        return <ToggleButton key={className} value={className.toLowerCase()} > {className} </ToggleButton>
                    })
                }

            </ToggleButtonGroup>
            
            <ToggleButtonGroup
                className="level-filter-group"
                sx={{
                    backgroundColor: 'white',
                }}
                value={selectedLevels}
                onChange={handleLevelFilterChange}
            >
                {
                    Array.from({ length: 9 }, (_, i) => i).map((level) => {
                        return <ToggleButton key={level} value={level} > Lv {level} </ToggleButton>
                    })
                }

            </ToggleButtonGroup>
        </div>

    )
}

export default CardSearch;