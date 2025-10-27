export type SpellCard = {
    name: string;
    level: number;
    classes: string[];
    range: string;
    duration: string;
    casting_time: string;
    components: string[];
    description: string;
    material: string | null;
    damage_at_slot_level: Record<string, string> | null;
};