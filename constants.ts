import { GraphData } from './types';

export const GEMINI_FLASH = 'gemini-2.5-flash';
export const GEMINI_PRO = 'gemini-2.5-pro';

// --- PASTE THIS ENTIRE OBJECT INTO constants.ts ---

export const GRAPH_DATA: GraphData = {
    nodes: [
        // --- Era 0: Geographical Context (Base Layer) ---
        { id: 'warszawa', label: 'Warszawa', group: 'city', level: 0, description: 'Capital of the Second Polish Republic and central stage for the political battle between Endecja and Sanacja.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'lwow', label: 'Lwów', group: 'city', level: 0, description: 'A critical "ideological cradle" of the Endecja, home to Popławski, Balicki, and the journal "Przegląd Wszechpolski".', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },
        { id: 'poznan', label: 'Poznań', group: 'city', level: 0, description: 'A major stronghold of National Democracy in the "Prussian partition," a center for the OWP.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },

        // --- Era 1: Ideological Precursors (late 1880s) ---
        { id: 'milkowski', label: 'Zygmunt Miłkowski', group: 'ideologue', level: 1, start: '1824-03-23', end: '1915-01-11', description: 'Writer and independence activist. He founded "Liga Polska," the direct predecessor to Dmowski\'s Liga Narodowa.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },
        { id: 'liga_polska', label: 'Liga Polska', group: 'organization', level: 1, start: '1887-01-01', description: 'A secret organization founded by Miłkowski in Switzerland, representing an older, romantic-insurrectionist nationalism.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'glos', label: 'Głos (Journal)', group: 'publication', level: 1, start: '1886-01-01', end: '1905-12-31', description: 'A Warsaw-based journal edited by Jan Ludwik Popławski that became a key organ for the "Głos" circle, which formulated the initial ideas of "All-Polish" thought.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },

        // --- Era 2: Core Formation (1890s) ---
        { id: 'dmowski', label: 'Roman Dmowski', group: 'ideologue', level: 2, start: '1864-08-16', end: '1939-01-02', description: 'Chief ideologue of "integral nationalism" and co-founder of the National Democracy movement. Author of "Myśli nowoczesnego Polaka".', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'balicki', label: 'Zygmunt Balicki', group: 'ideologue', level: 2, start: '1858-12-30', end: '1916-09-12', description: 'Key sociologist of the Endecja. He formulated the concept of "national egoism" (egoizm narodowy) and co-founded Liga Narodowa.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },
        { id: 'poplawski', label: 'Jan Ludwik Popławski', group: 'ideologue', level: 2, start: '1854-01-17', end: '1908-03-12', description: 'Considered the "ideological father" of the movement. A journalist from Lwów who set the early groundwork, focusing on "all-Polish" thought.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'liga_narodowa', label: 'Liga Narodowa', group: 'organization', level: 2, start: '1893-01-01', description: 'The secret, elite "cadre" organization of the National Democracy movement, founded by Dmowski, Balicki, and Popławski.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },
        { id: 'przeglad', label: 'Przegląd Wszechpolski', group: 'publication', level: 2, start: '1895-01-01', end: '1905-12-31', description: 'The first major ideological journal of the Endecja, co-founded by Dmowski, Popławski, and Balicki in Lwów.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'zmp_zet', label: 'Zet (ZMP)', group: 'organization', level: 2, start: '1887-01-01', end: '1922-12-31', description: 'A secret student organization ("Związek Młodzieży Polskiej") and the "youth wing" of Liga Narodowa. A critical recruiting ground.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },
        { id: 'mysl_wszechpolska', label: 'Myśl Wszechpolska', group: 'event', level: 2, start: '1890-01-01', description: 'The core "All-Polish" ideology. A concept node representing the idea of a modern, ethnically-defined Polish nation unified above the partitions.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'egoizm_narodowy', label: 'Egoizm Narodowy', group: 'event', level: 2, start: '1902-01-01', description: 'The core sociological doctrine, "National Egoism," formulated by Zygmunt Balicki. It argued that the nation\'s interest is the supreme moral good.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },
        
        // --- Era 3: WWI & Diplomatic Victory (1910s) ---
        { id: 'paderewski', label: 'Ignacy J. Paderewski', group: 'leader', level: 3, start: '1860-11-18', end: '1941-06-29', description: 'Pianist and statesman. Dmowski\'s key ally at the Paris Peace Conference, lobbying for Polish independence.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'haller', label: 'Józef Haller', group: 'leader', level: 3, start: '1873-08-13', end: '1960-06-04', description: 'General of the "Blue Army." Politically aligned with Endecja, he ran for President in 1922 with ZLN support, opposing Piłsudski.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },
        { id: 'versailles', label: 'Treaty of Versailles', group: 'event', level: 3, start: '1919-06-28', description: 'The peace treaty that ended WWI. A major diplomatic victory for Dmowski and Paderewski, who were the key Polish delegates.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'kurier_poznanski', label: 'Kurier Poznański', group: 'publication', level: 3, start: '1872-01-01', end: '1939-09-01', description: 'The main Endecja daily paper in Poznań (Prussian partition), edited for a time by Marian Seyda.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },
        { id: 'gazeta_warszawska', label: 'Gazeta Warszawska', group: 'publication', level: 3, start: '1918-01-01', end: '1939-09-01', description: 'The central, daily press organ of the National Democracy in Warsaw. It was one of the movement\'s most important and influential newspapers.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },

        // --- Era 4: Early 2nd Republic & Political Power (1919-1923) ---
        { id: 'zln', label: 'ZLN', group: 'organization', level: 4, start: '1919-01-01', description: 'The "Popular National Union" (Związek Ludowo-Narodowy), the main political party of the Endecja in the early 2nd Republic.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },
        { id: 'grabski_w', label: 'Władysław Grabski', group: 'leader', level: 4, start: '1874-07-07', end: '1938-03-01', description: 'Prime Minister and economist. His expert government was supported by the Endecja to stabilize the economy.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'korfanty', label: 'Wojciech Korfanty', group: 'leader', level: 4, start: '1873-04-20', end: '1939-08-17', description: 'Leader of the Silesian Uprisings. A Christian Democrat, he was a key political ally of the Endecja.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },
        { id: 'seyda', label: 'Marian Seyda', group: 'thinker', level: 4, start: '1879-07-07', end: '1967-05-17', description: 'Key Endecja leader in Poznań, editor-in-chief of Kurier Poznański, and minister in the Polish Gov\'t-in-Exile.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'glabinski', label: 'Stanisław Głąbiński', group: 'thinker', level: 4, start: '1862-02-25', end: '1941-08-14', description: 'An economist and politician from Lwów. A leader of the National Democracy in Galicia and a prominent minister.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },
        { id: 'grabski_s', label: 'Stanisław Grabski', group: 'thinker', level: 4, start: '1871-04-05', end: '1949-05-06', description: 'Politician and economist, brother of Władysław. A key Endecja Sejm deputy and theorist on social issues.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'szymanski', label: 'Fr. Antoni Szymański', group: 'thinker', level: 4, start: '1881-11-13', end: '1942-01-26', description: 'A Catholic priest and professor who developed the doctrine of "National Catholicism," harmonizing Endecja\'s nationalism with Catholic social teaching.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },
        { id: 'hlond', label: 'Cardinal August Hlond', group: 'clergy', level: 4, start: '1881-07-05', end: '1948-10-22', description: 'Primate of Poland. He had a complex relationship with the Endecja, sharing anti-communist views but critical of the movement\'s radicalism.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'gorski', label: 'Artur Górski', group: 'thinker', level: 4, start: '1870-07-02', end: '1959-12-07', description: 'A publicist who became a cultural and literary ideologue for the national camp.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },
        { id: 'nok', label: 'Narodowa Org. Kobiet', group: 'organization', level: 4, start: '1919-01-01', end: '1939-09-01', description: 'The "National Organization of Women," the official women\'s wing of the ZLN, mobilizing women for the national-conservative cause.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMYwAANgABIZUv3gAAAABJRU5ErkJggg==' },
        { id: 'balicka_g', label: 'Gabriela Balicka', group: 'thinker', level: 4, start: '1867-01-01', end: '1962-01-01', description: 'A botanist, politician, and key figure in the NOK. As Zygmunt Balicki\'s wife, she was a prominent Endecja Senator for the ZLN.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMYwAANgABIZUv3gAAAABJRU5ErkJggg==' },
        { id: 'narutowicz_assassination', label: 'Zabójstwo Narutowicza', group: 'event', level: 4, start: '1922-12-16', description: 'The assassination of President Gabriel Narutowicz by a nationalist sympathizer, following a vicious propaganda campaign by the ZLN.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMYwAANgABIZUv3gAAAABJRU5ErkJggg==' },

        // --- Era 5: The "Piłsudski" Rivalry (1926-1930s) ---
        { id: 'pilsudski', label: 'Józef Piłsudski', group: 'leader', level: 5, start: '1867-12-05', end: '1935-05-12', description: 'Dmowski\'s primary political rival. His federalist vision and Sanacja government were the main opposition to Endecja\'s "national" state concept.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'sanacja', label: 'Sanacja Movement', group: 'antagonist', level: 5, start: '1926-05-12', end: '1939-09-18', description: 'The authoritarian political movement led by Piłsudski after the 1926 May Coup. It was the primary political enemy of the Endecja.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },
        
        // --- Era 6: Mass-Movement & Opposition (1926-1930) ---
        { id: 'owp', label: 'OWP', group: 'organization', level: 6, start: '1926-12-04', description: '"Camp of Great Poland." A mass-movement organization founded by Dmowski after Piłsudski\'s coup to unite the "national camp" outside of parliament.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'sn', label: 'Stronnictwo Narodowe', group: 'organization', level: 6, start: '1928-10-07', description: 'The "National Party." The final political party form of the Endecja, succeeding the ZLN and OWP as the main political vehicle.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },
        { id: 'mw', label: 'Młodzież Wszechpolska', group: 'organization', level: 6, start: '1922-01-01', description: 'The "All-Polish Youth." The powerful, autonomous, and often radical student wing of the Endecja, known for antisemitic agitation.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'rybarski', label: 'Roman Rybarski', group: 'thinker', level: 6, start: '1887-07-03', end: '1942-03-06', description: 'The chief economic ideologue of the Endecja in the 1930s. He formulated the economic program for the National Party (SN).', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },
        { id: 'mysl_narodowa', label: 'Myśl Narodowa', group: 'publication', level: 6, start: '1921-01-01', end: '1939-09-01', description: 'A leading intellectual weekly journal of the Endecja. A primary platform for Dmowski, Rybarski, and Fr. Szymański.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'gov_in_exile', label: 'Polish Gov\'t-in-Exile', group: 'organization', level: 6, start: '1939-09-01', description: 'The government of Poland in exile during WWII. The National Party (SN) was a key component of its early political coalition.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },

        // --- Era 7: The Radical Split (1930-1934) ---
        { id: 'giertych', label: 'Jędrzej Giertych', group: 'thinker', level: 7, start: '1903-05-27', end: '1992-10-09', description: 'A prominent, more radical voice in the post-Dmowski generation. A leader in the SN but represented a more stridently nationalist wing.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'piasecki', label: 'Bolesław Piasecki', group: 'thinker', level: 7, start: '1915-02-18', end: '1979-01-01', description: 'A radical nationalist. He split from the OWP to co-found the fascist-inspired ONR, leading its "Falanga" faction.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },
        { id: 'rossman', label: 'Henryk Rossman', group: 'thinker', level: 7, start: '1903-01-08', end: '1937-05-27', description: 'A lawyer and main ideologue of the "young" Endecja. He co-founded the ONR and led its "mainstream" faction, ONR-ABC.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'doboszynski', label: 'Adam Doboszyński', group: 'thinker', level: 7, start: '1904-01-11', end: '1949-08-29', description: 'A radical nationalist writer in the SN. He advocated for direct action, culminating in his famous 1936 "Myślenice Raid." A rival to the "old guard".', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },
        { id: 'onr', label: 'ONR', group: 'organization', level: 7, start: '1934-04-14', description: '"National Radical Camp." A radical, fascist-inspired organization that split from the OWP in 1934, led by the "young" generation.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'jan_mosdorf', label: 'Jan Mosdorf', group: 'thinker', level: 7, start: '1904-05-17', end: '1943-10-11', description: 'A key "young" ideologue, leader of the MW, and a co-founder and leader of the ONR. He was later imprisoned in Auschwitz, where he broke with antisemitism and helped Jews, and was executed.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },

        // --- Era 8: Factions & State Repression (1934-1939) ---
        { id: 'onr_falanga', label: 'ONR-Falanga', group: 'organization', level: 8, start: '1935-01-01', description: 'A faction of the ONR, led by Bolesław Piasecki. It was one of the most extreme, openly fascist and totalitarian movements in Poland.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'onr_abc', label: 'ONR-ABC', group: 'organization', level: 8, start: '1935-01-01', description: 'A faction of the ONR, grouped around the "ABC" journal and led by Henryk Rossman. While still radical, it was more "traditional" than Piasecki\'s Falanga.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },
        { id: 'bereza_kartuska', label: 'Bereza Kartuska', group: 'antagonist', level: 8, start: '1934-06-17', end: '1939-09-18', description: 'An internment camp established by the Sanacja government to imprison its political opponents, including many members of the ONR.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'numerus_clausus', label: 'Numerus Clausus', group: 'event', level: 8, start: '1937-01-01', description: '("Ghetto Benches"). A form of segregation and "closed numbers" antisemitic policy at Polish universities, strongly advocated for by the MW and ONR.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },

        // --- Era 9: Modern Legacy (1970s - Now) ---
        { id: 'roman_giertych', label: 'Roman Giertych', group: 'modern_nd', level: 9, start: '1971-02-27', description: 'Politician, lawyer, and grandson of Jędrzej Giertych. He was a founder of the All-Polish Youth (1989) and leader of the League of Polish Families (LPR).', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'bosak', label: 'Krzysztof Bosak', group: 'modern_nd', level: 9, start: '1982-06-13', description: 'Politician, co-founder of Ruch Narodowy and Konfederacja. He began his political career in the All-Polish Youth and LPR.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' },
        { id: 'lpr', label: 'LPR', group: 'modern_nd', level: 9, start: '2001-04-10', description: 'League of Polish Families. A political party founded by Roman Giertych, which served as the main political vehicle for the modern Endecja-inspired movement.', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
        { id: 'ruch_narodowy', label: 'Ruch Narodowy', group: 'modern_nd', level: 9, start: '2012-11-11', description: 'A political party formed from a coalition of nationalist groups. It directly claims the heritage of the Endecja and SN. Co-founded by Krzysztof Bosak.', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AN//Z' }
    ],
    edges: [
        // --- Era 1: Precursors ---
        { from: 'milkowski', to: 'liga_polska', label: 'FOUNDED' },
        { from: 'poplawski', to: 'glos', label: 'EDITOR_OF' },
        { from: 'glos', to: 'mysl_wszechpolska', label: 'FORMULATED' },
        { from: 'poplawski', to: 'lwow', label: 'BASED_IN' },
        { from: 'poplawski', to: 'liga_polska', label: 'MEMBER_OF' },

        // --- Era 2: Core Formation ---
        { from: 'liga_polska', to: 'liga_narodowa', label: 'PREDECESSOR_OF' },
        { from: 'dmowski', to: 'liga_narodowa', label: 'CO-FOUNDED' },
        { from: 'balicki', to: 'liga_narodowa', label: 'CO-FOUNDED' },
        { from: 'poplawski', to: 'liga_narodowa', label: 'CO-FOUNDED' },
        { from: 'dmowski', to: 'mysl_wszechpolska', label: 'DEVELOPED' },
        { from: 'poplawski', to: 'mysl_wszechpolska', label: 'DEVELOPED' },
        { from: 'balicki', to: 'egoizm_narodowy', label: 'FORMULATED' },
        { from: 'balicki', to: 'lwow', label: 'BASED_IN' },
        { from: 'dmowski', to: 'przeglad', label: 'CO-FOUNDED' },
        { from: 'poplawski', to: 'przeglad', label: 'CO-FOUNDED' },
        { from: 'balicki', to: 'przeglad', label: 'CO-FOUNDED' },
        { from: 'przeglad', to: 'mysl_wszechpolska', label: 'PUBLISHED' },
        { from: 'przeglad', to: 'egoizm_narodowy', label: 'PUBLISHED' },
        { from: 'liga_narodowa', to: 'zmp_zet', label: 'PARENT_ORG_OF' },
        { from: 'dmowski', to: 'warszawa', label: 'BASED_IN' },

        // --- Era 3: WWI & Diplomatic Victory ---
        { from: 'dmowski', to: 'versailles', label: 'DELEGATE_AT' },
        { from: 'paderewski', to: 'versailles', label: 'DELEGATE_AT' },
        { from: 'dmowski', to: 'paderewski', label: 'ALLIED_AT_VERSAILLES' },
        { from: 'dmowski', to: 'haller', label: 'SUPPORTED' },
        { from: 'kurier_poznanski', to: 'poznan', label: 'BASED_IN' },
        { from: 'liga_narodowa', to: 'kurier_poznanski', label: 'INFLUENCED' },
        { from: 'liga_narodowa', to: 'gazeta_warszawska', label: 'INFLUENCED' },
        { from: 'gazeta_warszawska', to: 'warszawa', label: 'BASED_IN' },
        
        // --- Era 4: Early 2nd Republic & Political Power ---
        { from: 'liga_narodowa', to: 'zln', label: 'EVOLVED_INTO' },
        { from: 'zln', to: 'korfanty', label: 'POLITICAL_ALLY' },
        { from: 'zln', to: 'grabski_w', label: 'SUPPORTED_GOV\'T' },
        { from: 'haller', to: 'zln', label: 'SUPPORTED_BY' },
        { from: 'seyda', to: 'zln', label: 'LEADER_IN' },
        { from: 'seyda', to: 'kurier_poznanski', label: 'EDITOR_IN_CHIEF' },
        { from: 'seyda', to: 'poznan', label: 'BASED_IN' },
        { from: 'glabinski', to: 'zln', label: 'LEADER_IN' },
        { from: 'glabinski', to: 'lwow', label: 'BASED_IN' },
        { from: 'grabski_s', to: 'zln', label: 'LEADER_IN' },
        { from: 'gorski', to: 'zln', label: 'ALLIED_WITH' },
        { from: 'szymanski', to: 'zln', label: 'IDEOLOGICALLY_ALIGNED' },
        { from: 'hlond', to: 'zln', label: 'COMPLEX_RELATION' },
        { from: 'zln', to: 'nok', label: 'PARENT_ORG_OF' },
        { from: 'balicka_g', to: 'nok', label: 'LEADER_IN' },
        { from: 'balicka_g', to: 'zln', label: 'SENATOR_FOR' },
        { from: 'balicka_g', to: 'balicki', label: 'MARRIED_TO' },
        { from: 'narutowicz_assassination', to: 'zln', label: 'PROPAGANDA_BLAMED' },

        // --- Era 5: The "Piłsudski" Rivalry ---
        { from: 'pilsudski', to: 'sanacja', label: 'LEADER_OF' },
        { from: 'dmowski', to: 'pilsudski', label: 'POLITICAL_RIVAL', color: { color: '#ef4444' }, dashes: true },
        { from: 'haller', to: 'pilsudski', label: 'POLITICAL_RIVAL', color: { color: '#ef4444' }, dashes: true },
        { from: 'zln', to: 'pilsudski', label: 'POLITICAL_RIVAL', color: { color: '#ef4444' }, dashes: true },
        { from: 'narutowicz_assassination', to: 'pilsudski', label: 'DEEPENED_RIVALRY' },

        // --- Era 6: Mass-Movement & Opposition ---
        { from: 'dmowski', to: 'owp', label: 'FOUNDED' },
        { from: 'zln', to: 'owp', label: 'PREDECESSOR_OF' },
        { from: 'zln', to: 'sn', label: 'EVOLVED_INTO' },
        { from: 'owp', to: 'sn', label: 'EVOLVED_INTO' },
        { from: 'zmp_zet', to: 'mw', label: 'PREDECESSOR_OF' },
        { from: 'mw', to: 'sn', label: 'YOUTH_WING_OF' },
        { from: 'rybarski', to: 'sn', label: 'ECONOMIC_THEORIST' },
        { from: 'szymanski', to: 'mysl_narodowa', label: 'WROTE_FOR' },
        { from: 'dmowski', to: 'mysl_narodowa', label: 'WROTE_FOR' },
        { from: 'rybarski', to: 'mysl_narodowa', label: 'WROTE_FOR' },
        { from: 'seyda', to: 'gov_in_exile', label: 'MINISTER_IN' },
        { from: 'sn', to: 'gov_in_exile', label: 'MEMBER_OF' },
        
        // --- Era 7: The Radical Split ---
        { from: 'owp', to: 'onr', label: 'SPLIT_FROM', color: { color: '#ef4444' } },
        { from: 'mw', to: 'onr', label: 'MEMBERS_JOINED' },
        { from: 'jan_mosdorf', to: 'mw', label: 'LEADER_OF' },
        { from: 'jan_mosdorf', to: 'onr', label: 'CO-FOUNDED' },
        { from: 'piasecki', to: 'owp', label: 'MEMBER_OF' },
        { from: 'piasecki', to: 'onr', label: 'CO-FOUNDED' },
        { from: 'rossman', to: 'owp', label: 'MEMBER_OF' },
        { from: 'rossman', to: 'onr', label: 'CO-FOUNDED' },
        { from: 'giertych', to: 'sn', label: 'RADICAL_WING_OF' },
        { from: 'doboszynski', to: 'sn', label: 'RADICAL_WING_OF' },
        
        // --- Era 8: Factions & State Repression ---
        { from: 'onr', to: 'onr_falanga', label: 'SPLIT_INTO', color: { color: '#ef4444' } },
        { from: 'onr', to: 'onr_abc', label: 'SPLIT_INTO', color: { color: '#ef4444' } },
        { from: 'piasecki', to: 'onr_falanga', label: 'FOUNDED_&_LED' },
        { from: 'rossman', to: 'onr_abc', label: 'FOUNDED_&_LED' },
        { from: 'jan_mosdorf', to: 'onr_abc', label: 'LEADER_OF' },
        { from: 'sanacja', to: 'onr', label: 'DELEGALIZED', color: { color: '#ef4444' }, dashes: true },
        { from: 'sanacja', to: 'bereza_kartuska', label: 'OPERATED' },
        { from: 'onr', to: 'bereza_kartuska', label: 'MEMBERS_IMPRISONED' },
        { from: 'rossman', to: 'bereza_kartuska', label: 'IMPRISONED_IN' },
        { from: 'mw', to: 'numerus_clausus', label: 'ADVOCATED_FOR' },
        { from: 'onr', to: 'numerus_clausus', label: 'ADVOCATED_FOR' },
        { from: 'numerus_clausus', to: 'warszawa', label: 'IMPLEMENTED_AT_UNIV.' },

        // --- Era 9: Modern Legacy ---
        { from: 'giertych', to: 'roman_giertych', label: 'GRANDFATHER_OF' },
        { from: 'roman_giertych', to: 'lpr', label: 'FOUNDED_&_LED' },
        { from: 'lpr', to: 'mw', label: 'DREW_FROM' },
        { from: 'lpr', to: 'sn', label: 'IDEOLOGICAL_SUCCESSOR' },
        { from: 'bosak', to: 'lpr', label: 'FORMER_MEMBER' },
        { from: 'bosak', to: 'ruch_narodowy', label: 'CO-FOUNDED' },
        { from: 'ruch_narodowy', to: 'sn', label: 'IDEOLOGICAL_SUCCESSOR' },
        { from: 'ruch_narodowy', to: 'mw', label: 'DREW_FROM' }
    ]
};