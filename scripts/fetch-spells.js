import fs from 'fs/promises';

async function fetchAllSpells() {
  try {
    const response = await fetch('https://www.dnd5eapi.co/api/spells');
    const data = await response.json();
    const spells = {};

    for (const spell of data.results) {
      const detailResponse = await fetch(`https://www.dnd5eapi.co${spell.url}`);
      const detail = await detailResponse.json();
      spells[spell.index] = {
        name: spell.name,
        level: detail.level,
        classes: detail.classes.map(c => c.name),
        range: rangeToInt(detail.range),
        duration: detail.duration,
        casting_time: detail.casting_time,
        components: detail.components,
        description: detail.desc.join(' '),
        material: detail.material || null,
        damage_at_slot_level: detail.damage?.damage_at_slot_level || null,
        // add other fields as needed
      };
      console.log(`Fetched ${spell.name}`);
    }

    await fs.writeFile('spells.json', JSON.stringify(spells, null, 2));
    console.log('Saved spells.json');
  } catch (error) {
    console.error(error);
  }
}

function rangeToInt(range) {
  const rangeSplit = range.split(' ');
  return parseInt(rangeSplit[0]);
}

fetchAllSpells();