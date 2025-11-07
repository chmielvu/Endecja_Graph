
import { GraphData } from './types';

export const GEMINI_FLASH = 'gemini-2.5-flash';
export const GEMINI_PRO = 'gemini-2.5-pro';

export const GRAPH_DATA: GraphData = {
  nodes: [
    // Core Ideologues
    { id: 'dmowski', label: 'Roman Dmowski', group: 'ideologue', level: 2, description: 'Chief ideologue of "integral nationalism" and co-founder of the National Democracy movement.', image: 'https://picsum.photos/seed/dmowski/100/100' },
    { id: 'balicki', label: 'Zygmunt Balicki', group: 'ideologue', level: 2, description: 'A key sociologist and publicist of the Endecja, formulating the concept of "national egoism".', image: 'https://picsum.photos/seed/balicki/100/100' },
    { id: 'poplawski', label: 'Jan L. Popławski', group: 'ideologue', level: 2, description: 'Considered the "ideological father" of the National Democracy movement, setting its early groundwork.', image: 'https://picsum.photos/seed/poplawski/100/100' },
    
    // Thinkers & Politicians
    { id: 'seyda', label: 'Marian Seyda', group: 'thinker', level: 3, description: 'Key Endecja leader in Poznań, editor-in-chief of Kurier Poznański, and minister in the Polish Gov\'t-in-Exile.', image: 'https://picsum.photos/seed/seyda/100/100' },

    // Leaders (Allies/Rivals)
    { id: 'pilsudski', label: 'Józef Piłsudski', group: 'leader', level: 3, description: 'Dmowski\'s primary political rival, advocating for a multi-ethnic Polish-Lithuanian Commonwealth.', image: 'https://picsum.photos/seed/pilsudski/100/100' },
    
    // Organizations
    { id: 'liga_narodowa', label: 'Liga Narodowa', group: 'organization', level: 1, description: 'The secret, elite "cadre" organization of the National Democracy movement, founded by Dmowski.', image: 'https://picsum.photos/seed/liga_narodowa/100/100' },
    { id: 'owp', label: 'OWP', group: 'organization', level: 4, description: 'Obóz Wielkiej Polski (Camp of Great Poland), a mass-movement organization founded by Dmowski after Piłsudski\'s coup.', image: 'https://picsum.photos/seed/owp/100/100' },
    { id: 'sn', label: 'Stronnictwo Narodowe (SN)', group: 'organization', level: 4, description: 'The "National Party," the final political party form of the Endecja in the Second Polish Republic.', image: 'https://picsum.photos/seed/sn/100/100' },
    { id: 'onr', label: 'ONR', group: 'organization', level: 5, description: 'Obóz Narodowo-Radykalny (National Radical Camp), a radical, fascist-inspired organization that split from the OWP.', image: 'https://picsum.photos/seed/onr/100/100' },
    { id: 'gov_in_exile', label: 'Polish Gov\'t-in-Exile', group: 'organization', level: 4, description: 'The government of Poland in exile during World War II.', image: 'https://picsum.photos/seed/gov_in_exile/100/100' },

    // Publications
    { id: 'kurier_poznanski', label: 'Kurier Poznański', group: 'publication', level: 2, description: 'The largest non-Warsaw daily paper associated with the Endecja, serving as its factual press organ in Poznań.', image: 'https://picsum.photos/seed/kurier/100/100' },

    // Modern Figures
    { id: 'roman_giertych', label: 'Roman Giertych', group: 'modern_nd', level: 6, description: 'Politician, lawyer, and grandson of Jędrzej Giertych. Founder of the All-Polish Youth (1989) and leader of the League of Polish Families (LPR).', image: 'https://picsum.photos/seed/rgiertych/100/100' },
    
    // Cities
    { id: 'poznan', label: 'Poznań', group: 'city', level: 0, description: 'A major stronghold of the National Democracy in the former Prussian partition.', image: 'https://picsum.photos/seed/poznan/100/100' }
  ],
  edges: [
    { from: 'poplawski', to: 'liga_narodowa', label: 'CO-FOUNDED' },
    { from: 'balicki', to: 'liga_narodowa', label: 'CO-FOUNDED' },
    { from: 'dmowski', to: 'liga_narodowa', label: 'CO-FOUNDED' },
    { from: 'dmowski', to: 'pilsudski', label: 'POLITICAL_RIVAL', color: { color: '#ef4444' } },
    { from: 'liga_narodowa', to: 'sn', label: 'EVOLVED_INTO' },
    { from: 'dmowski', to: 'owp', label: 'FOUNDED' },
    { from: 'owp', to: 'sn', label: 'PARENT_ORG_OF' },
    { from: 'owp', to: 'onr', label: 'SPLIT_FROM', color: { color: '#ef4444' } },
    { from: 'liga_narodowa', to: 'poznan', label: 'STRONGHOLD_IN' },
    { from: 'seyda', to: 'kurier_poznanski', label: 'EDITOR_IN_CHIEF' },
    { from: 'seyda', to: 'liga_narodowa', label: 'MEMBER_OF' },
    { from: 'kurier_poznanski', to: 'liga_narodowa', label: 'PRESS_ORGAN_OF' },
    { from: 'seyda', to: 'dmowski', label: 'COLLABORATED_WITH' },
    { from: 'seyda', to: 'gov_in_exile', label: 'MINISTER_IN' },
    { from: 'seyda', to: 'poznan', label: 'BASED_IN' },
    { from: 'kurier_poznanski', to: 'poznan', label: 'BASED_IN' }
  ]
};
