/* LANTERNFALL - game data */
const CL = {
  warden: { name: 'WARDEN', role: 'TANK', hp: 270, dmg: 15, atk: 1.3, range: 1.9, speed: 3.3, armor: 0.28, ranged: false, slot: [1.9, 0.2], blurb: 'Draws the gloam onto a scarred shield.',
    skills: [{ id: 'bash', name: 'SHIELD BASH', cd: 7, d: 'staggers a target' }, { id: 'hold', name: 'HOLD THE LINE', cd: 16, d: 'taunts, takes less harm' }, { id: 'riposte', name: 'RIPOSTE', cd: 4, d: 'counter-cut after a blow', passive: true }] },
  reaver: { name: 'REAVER', role: 'HEAVY MELEE', hp: 195, dmg: 33, atk: 1.75, range: 2.2, speed: 3.2, armor: 0.12, ranged: false, slot: [1.1, -1.5], blurb: 'A greatsword and the weight to use it.',
    skills: [{ id: 'cleave', name: 'CLEAVE', cd: 6, d: 'a wide arc' }, { id: 'sunder', name: 'SUNDER', cd: 12, d: 'shakes the ground in a line' }, { id: 'wind', name: 'SECOND WIND', cd: 1, d: 'hits harder when hurt', passive: true }] },
  fletcher: { name: 'FLETCHER', role: 'RANGED', hp: 125, dmg: 21, atk: 1.35, range: 13, speed: 3.4, armor: 0.05, ranged: true, proj: 'arrow', slot: [-1.5, 1.2], blurb: 'A longbow as tall as the archer.',
    skills: [{ id: 'aimed', name: 'AIMED SHOT', cd: 6.5, d: 'one heavy arrow' }, { id: 'volley', name: 'VOLLEY', cd: 11, d: 'arrows fall on a group' }, { id: 'pin', name: 'PINNING SHOT', cd: 9, d: 'slows a target' }] },
  lamplighter: { name: 'LAMPLIGHTER', role: 'FIRE CASTER', hp: 130, dmg: 19, atk: 1.6, range: 11, speed: 3.2, armor: 0.06, ranged: true, proj: 'ember', slot: [-1.7, -1.1], blurb: 'Carries the last lit lantern.',
    skills: [{ id: 'flare', name: 'FLARE', cd: 7, d: 'a bolt that bursts' }, { id: 'kindle', name: 'KINDLE', cd: 14, d: 'warm light mends the party' }, { id: 'cinder', name: 'CINDERFALL', cd: 16, d: 'embers rain on an area' }] },
  apothecary: { name: 'APOTHECARY', role: 'SUPPORT', hp: 135, dmg: 13, atk: 1.8, range: 9, speed: 3.2, armor: 0.06, ranged: true, proj: 'flask', slot: [-2.6, 0.1], blurb: 'Tonics, firepots and quick hands.',
    skills: [{ id: 'tonic', name: 'TONIC', cd: 5, d: 'heals the most hurt' }, { id: 'firepot', name: 'FIREPOT', cd: 9, d: 'leaves a burning patch' }, { id: 'quick', name: 'QUICKSILVER', cd: 20, d: 'speeds the party' }] },
  rimebinder: { name: 'RIMEBINDER', role: 'FROST CASTER', hp: 118, dmg: 18, atk: 1.7, range: 11, speed: 3.2, armor: 0.05, ranged: true, proj: 'lance', slot: [-1.8, 1.5], blurb: 'Binds the cold of the moor to a pale shard.',
    skills: [{ id: 'lance', name: 'FROST LANCE', cd: 6, d: 'pierces a line' }, { id: 'hoar', name: 'HOARFROST', cd: 12, d: 'ground that slows' }, { id: 'shatter', name: 'SHATTER', cd: 14, d: 'chilled foes burst' }] }
};
const MON = {
  thornling: { name: 'Thornling', hp: 34, dmg: 5, atk: 1.15, range: 1.3, speed: 3.4, armor: 0, xp: 4, cost: 3, wind: 0.42, from: 1, mat: 'wood' },
  peatwight: { name: 'Peatwight', hp: 115, dmg: 13, atk: 2.0, range: 1.7, speed: 1.5, armor: 0.05, xp: 10, cost: 7, wind: 0.5, from: 1, mat: 'peat' },
  gloamhound: { name: 'Gloamhound', hp: 72, dmg: 10, atk: 1.3, range: 1.6, speed: 4.8, armor: 0, xp: 9, cost: 7, wind: 0.45, from: 2, flank: true, mat: 'wood' },
  gloamwisp: { name: 'Gloamwisp', hp: 50, dmg: 11, atk: 2.4, range: 9, speed: 1.9, armor: 0, xp: 9, cost: 7, wind: 0.5, from: 3, ranged: true, mat: 'cloth' },
  rustbound: { name: 'Rustbound', hp: 240, dmg: 22, atk: 2.1, range: 2.1, speed: 1.75, armor: 0.3, xp: 24, cost: 16, wind: 0.5, from: 3, elite: true, mat: 'metal' },
  cairnback: { name: 'Cairnback', hp: 430, dmg: 34, atk: 2.9, range: 2.6, speed: 1.3, armor: 0.2, xp: 40, cost: 26, wind: 0.52, from: 6, elite: true, mat: 'stone' },
  barrowking: { name: "THE BARROW KING", hp: 1500, dmg: 30, atk: 2.3, range: 3.6, speed: 1.6, armor: 0.25, xp: 60, boss: true, wind: 0.5, mat: 'metal', spec: 'sweep' },
  mossjaw: { name: 'OLD MOSSJAW', hp: 1900, dmg: 34, atk: 2.9, range: 3.9, speed: 1.2, armor: 0.2, xp: 60, boss: true, wind: 0.5, mat: 'stone', spec: 'slam' },
  hollowstag: { name: 'THE HOLLOW STAG', hp: 1350, dmg: 27, atk: 1.9, range: 3.4, speed: 2.4, armor: 0.1, xp: 60, boss: true, wind: 0.5, mat: 'wood', spec: 'charge' }
};
const BOSS_ORDER = ['barrowking', 'mossjaw', 'hollowstag'];
const BOSS_TITLES = { barrowking: ['THE BARROW KING', 'THE KING UNDER RUST', 'THE CROWNLESS', 'LORD OF THE LONG DARK'], mossjaw: ['OLD MOSSJAW', 'THE WALKING CAIRN', 'GRANDFATHER STONE', 'THE TOR THAT WOKE'], hollowstag: ['THE HOLLOW STAG', 'THE ANTLERED GLOAM', 'WINTER\u2019S HART', 'THE WHITE RUN'] };
const GRADES = [{ n: 'WORN', c: '#a8a290', m: 1 }, { n: 'TEMPERED', c: '#7fb4d6', m: 1.45 }, { n: 'GILDED', c: '#e0a33c', m: 2.0 }, { n: 'RELIC', c: '#ff7a3a', m: 2.9 }];
const ITEM_NAMES = {
  weapon: { warden: 'Arming Sword', reaver: 'Greatsword', fletcher: 'Longbow', lamplighter: 'Lantern Pole', apothecary: 'Flask Belt', rimebinder: 'Shard Staff' },
  armour: { warden: 'Hauberk', reaver: 'Mail Shirt', fletcher: 'Padded Jack', lamplighter: 'Waxed Coat', apothecary: 'Apron Coat', rimebinder: 'Winter Robe' },
  trinket: ['Wayfarer\u2019s Token', 'Iron Ring', 'Tin Whistle', 'Knucklebone', 'Sprig of Heather', 'Flint and Steel', 'Lead Charm']
};
const RELIC_NAMES = ['Wickfall', 'Gloamrend', 'Barrowkeeper', 'Ashen Vow', 'Moorwarden', 'Last Light', 'Peatborn', 'Stormcrow', 'Emberwake', 'Longnight', 'Cairnsong', 'Hearthward'];
const RELIC_SPECIALS = [{ k: 'haste', t: '+12% attack speed' }, { k: 'cdr', t: 'skills return 12% sooner' }, { k: 'leech', t: 'mends 3% of damage dealt' }, { k: 'ward', t: 'takes 10% less harm' }, { k: 'silver', t: '+20% silver found' }, { k: 'crit', t: '+10% heavy blows' }];
const CARDS = [
  { id: 'w_hp', who: 'warden', name: 'OAKEN HEART', d: 'Warden: +25% life' }, { id: 'w_hold', who: 'warden', name: 'WALL OF IRON', d: 'Hold the Line lasts 2s longer and blocks more' },
  { id: 'w_bash', who: 'warden', name: 'BROAD BOSS', d: 'Shield Bash strikes every foe in reach, +25% damage' }, { id: 'w_rip', who: 'warden', name: 'OLD SOLDIER', d: 'Riposte strikes more often and harder' },
  { id: 'r_cleave', who: 'reaver', name: 'WIDE ARC', d: 'Cleave: +30% damage and reach' }, { id: 'r_sunder', who: 'reaver', name: 'EARTHSHAKER', d: 'Sunder returns 20% sooner and runs further' },
  { id: 'r_wind', who: 'reaver', name: 'BLOOD UP', d: 'Second Wind wakes sooner and bites deeper' }, { id: 'r_dmg', who: 'reaver', name: 'WHETTED EDGE', d: 'Reaver: +18% damage' },
  { id: 'f_volley', who: 'fletcher', name: 'FULL QUIVER', d: 'Volley: +3 arrows' }, { id: 'f_aimed', who: 'fletcher', name: 'HAWK EYE', d: 'Aimed Shot: +40% damage' },
  { id: 'f_pin', who: 'fletcher', name: 'BARBED HEADS', d: 'Pinned foes stay slowed longer and take +15% harm' }, { id: 'f_haste', who: 'fletcher', name: 'STEADY HANDS', d: 'Fletcher: +15% attack speed' },
  { id: 'l_flare', who: 'lamplighter', name: 'LINGERING FLAME', d: 'Flare leaves burning ground' }, { id: 'l_kindle', who: 'lamplighter', name: 'WARM HEARTH', d: 'Kindle mends 30% more' },
  { id: 'l_cinder', who: 'lamplighter', name: 'EMBER STORM', d: 'Cinderfall: wider and 25% hotter' }, { id: 'l_dmg', who: 'lamplighter', name: 'TRIMMED WICK', d: 'Lamplighter: +18% damage' },
  { id: 'a_tonic', who: 'apothecary', name: 'STRONG TONIC', d: 'Tonic mends 30% more and splashes nearby allies' }, { id: 'a_fire', who: 'apothecary', name: 'WILDFIRE', d: 'Firepot burns 2s longer and 25% hotter' },
  { id: 'a_quick', who: 'apothecary', name: 'DOUBLE DOSE', d: 'Quicksilver lasts 2s longer' }, { id: 'a_kit', who: 'apothecary', name: 'FIELD KIT', d: 'Fallen heroes rise 25% sooner' },
  { id: 'b_lance', who: 'rimebinder', name: 'SPLINTER', d: 'Frost Lance: +25% damage, chills longer' }, { id: 'b_hoar', who: 'rimebinder', name: 'DEEP COLD', d: 'Hoarfrost: wider and slows more' },
  { id: 'b_shatter', who: 'rimebinder', name: 'BRITTLE', d: 'Shatter: +35% damage' }, { id: 'b_rime', who: 'rimebinder', name: 'NUMBING RIME', d: 'Chilled foes deal 10% less harm' },
  { id: 'p_dmg', who: 'party', name: 'KEEN EDGES', d: 'Whole party: +10% damage' }, { id: 'p_hp', who: 'party', name: 'HARDENED', d: 'Whole party: +12% life' },
  { id: 'p_light', who: 'party', name: 'BRIGHT LANTERN', d: 'Lantern radius +15%' }, { id: 'p_haste', who: 'party', name: 'QUICK MARCH', d: 'Whole party: +7% attack speed' },
  { id: 'p_silver', who: 'party', name: 'SCAVENGERS', d: '+25% silver found' }, { id: 'p_flare', who: 'party', name: 'FULL RESERVOIR', d: 'Lantern Flare fills 30% faster and burns 30% hotter' }, { id: 'p_xp', who: 'party', name: 'HARD LESSONS', d: '+15% experience' }
];
const CAMP = [
  { id: 'whet', name: 'WHETSTONE', d: 'party damage', per: 8, unit: '%', base: 45 }, { id: 'dress', name: 'FIELD DRESSING', d: 'party life, healing between packs', per: 8, unit: '%', base: 45 },
  { id: 'oil', name: 'LAMP OIL', d: 'lantern radius, mending in the light', per: 6, unit: '%', base: 60 }, { id: 'tonic', name: 'TONICS', d: 'tonics carried and their strength', per: 1, unit: '', base: 70 }
];
const BOONS = [
  { id: 'dmg', name: 'EMBER OF WRATH', d: '+6% damage, every run', cost: 2, max: 20 }, { id: 'hp', name: 'EMBER OF ENDURANCE', d: '+6% life, every run', cost: 2, max: 20 },
  { id: 'silver', name: 'EMBER OF PLENTY', d: '+10% silver, every run', cost: 2, max: 10 }, { id: 'xp', name: 'EMBER OF MEMORY', d: '+8% experience, every run', cost: 2, max: 10 },
  { id: 'start', name: 'EMBER OF THE ROAD', d: 'begin one stage further on', cost: 4, max: 12 },
  { id: 'apothecary', name: 'CALL THE APOTHECARY', d: 'unlocks the Apothecary now', cost: 5, max: 1, unlock: true }, { id: 'rimebinder', name: 'CALL THE RIMEBINDER', d: 'unlocks the Rimebinder now', cost: 9, max: 1, unlock: true }
];
const UNLOCK_AT = { apothecary: 4, rimebinder: 7 };
