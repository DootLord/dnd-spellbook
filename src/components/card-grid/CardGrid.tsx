import { spellsJSONDataType } from '../../App';
import Card from '../card/card';
import './CardGrid.scss';

interface CardGridProps {
    cards: spellsJSONDataType[];
    columns: number;
}

function CardGrid({ cards, columns }: CardGridProps) {
    const rows = Math.ceil(cards.length / columns);
    const totalSlots = rows * columns;
    const gridItems = Array.from({ length: totalSlots }, (_, i) => {
        const card = cards[i];
        return card ? <Card key={i} spellData={card} /> : <div key={i} className="card-slot"></div>;
    });

    return (
        <div 
            className="card-grid" 
            style={{ 
                display: 'grid', 
                gridTemplateColumns: `repeat(${columns}, 1fr)`, 
                gap: '10px' 
            }}
        >
            {gridItems}
        </div>
    );
}

export default CardGrid;