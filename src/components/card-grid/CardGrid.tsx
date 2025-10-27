import { spellsJSONDataType } from '../../App';
import Card from '../card/card';
import './CardGrid.scss';
import { useEffect, useRef } from 'react';
import { animate, stagger, random } from 'animejs';

interface CardGridProps {
    cards: spellsJSONDataType[];
    columns: number;
}

function CardGrid({ cards, columns }: CardGridProps) {
    const gridRef = useRef<HTMLDivElement>(null);
    const isFirstRender = useRef(true);
    
    useEffect(() => {
        if (gridRef.current) {
            const cardWrappers = gridRef.current.querySelectorAll('.card-wrapper');
            if (isFirstRender.current) {
                isFirstRender.current = false;
                // Dramatic entrance animation
                animate(cardWrappers, {
                    opacity: [0, 1],
                    scale: [0.5, 1],
                    translateX: [() => random(-200, 200), 0],
                    translateY: [() => random(-200, 200), 0],
                    rotate: [() => random(-45, 45), 0],
                    delay: stagger(50),
                    duration: 1000,
                    easing: 'easeOutElastic(1, .6)'
                });
            } else {
                // Subtle animation for additions/updates
                animate(cardWrappers, {
                    opacity: [0, 1],
                    scale: [0.8, 1],
                    delay: stagger(30),
                    duration: 500,
                    easing: 'easeOutQuad'
                });
            }
        }
    }, [cards]);

    const rows = Math.ceil(cards.length / columns);
    const totalSlots = rows * columns;
    const gridItems = Array.from({ length: totalSlots }, (_, i) => {
        const card = cards[i];
        return card ? (
            <div key={card.name} className="card-wrapper" style={{ opacity: 0 }}>
                <Card spellData={card} />
            </div>
        ) : <div key={`slot-${i}`} className="card-slot"></div>;
    });

    return (
        <div 
            className="card-grid" 
            ref={gridRef}
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