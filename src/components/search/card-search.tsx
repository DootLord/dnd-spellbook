import { TextField } from "@mui/material";

interface CardSearchProps {
    onSearchChange: (query: string) => void;
}

// Just a basic wrapper for MUI's TextField component
function CardSearch({ onSearchChange }: CardSearchProps) {


    return (
        <TextField
            id="filled-search"
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
    )
}

export default CardSearch;