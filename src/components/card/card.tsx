import './card.scss'
import { animate, stagger } from 'animejs'
import { useRef, useState } from 'react'
import { spellsJSONDataType } from '../../App';

interface CardProps {
    spellData: spellsJSONDataType
}

function App({ spellData }: CardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [showStats, setShowStats] = useState(false);

    function handleMouseLeave() {
        if (showStats) return;
        if (!cardRef.current) return;
        animate(cardRef.current, {
            scale: 1,
            duration: 300,
            easing: 'easeOutQuad'
        });
    };

    function handleRightClick(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
        const newShowStats = !showStats;
        setShowStats(newShowStats);
        if (!cardRef.current) return;
        const img = cardRef.current.querySelector('img') as HTMLImageElement;
        const stats = cardRef.current.querySelector('.stats') as HTMLDivElement;
        const statElements = stats.querySelectorAll('h3, p');
        if (newShowStats) {
            animate(img, { opacity: 0, duration: 300, easing: 'easeOutQuad' });
            animate(stats, { opacity: 1, duration: 300, easing: 'easeOutQuad' });
            animate(statElements, {
                translateY: [20, 0],
                opacity: [0, 1],
                delay: stagger(100),
                duration: 400,
                easing: 'easeOutQuad'
            });
        } else {
            animate(img, { opacity: 1, duration: 300, easing: 'easeOutQuad' });
        }
    };

    function handleMouseEnter() {
        if (!cardRef.current) return;
        const card = cardRef.current;
        animate(card, {
            scale: 1.05,
            duration: 800,
            ease: 'outElastic(1,0.3)',
        });
    }

    return (
        <div
            className="card"
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onContextMenu={handleRightClick}
            id={spellData.name}
        >
            <img 
                src={`/cards/${spellData.name}.png`} 
                alt={spellData.name}
                loading="lazy"
                decoding="async"
            />
            <div className="sheen"></div>
            <div className="stats" style={{ opacity: showStats ? 1 : 0 }}>
                <h3>{spellData.name}</h3>
                <p>Level: {spellData.level}</p>
                <p>Classes: {spellData.classes.join(', ')}</p>
                <p>Range: {spellData.range}</p>
                <p>Duration: {spellData.duration}</p>
                <p>Casting Time: {spellData.casting_time}</p>
            </div>
        </div>
    )
}

export default App
