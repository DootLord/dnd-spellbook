import './card.scss'
import { animate, stagger } from 'animejs'
import { useRef, useState } from 'react'
import { spellsJSONDataType } from '../../App';

interface CardProps {
    spellData: spellsJSONDataType
}

function Card({ spellData }: CardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [showStats, setShowStats] = useState(false);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (showStats || !cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const rotateY = ((mouseX - centerX) / centerX) * 20; // Max 20 degrees
        const rotateX = ((mouseY - centerY) / centerY) * 10; // Max 10 degrees

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function handleMouseLeave() {
        if (showStats || !cardRef.current) return;
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }

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

    return (
        <div
            className="card"
            ref={cardRef}
            onMouseMove={handleMouseMove}
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

export default Card
