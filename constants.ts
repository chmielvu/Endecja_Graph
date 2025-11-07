import { GraphData } from './types';

export const GEMINI_FLASH = 'gemini-2.5-flash';
export const GEMINI_PRO = 'gemini-2.5-pro';

export const GRAPH_DATA: GraphData = {
    nodes: [
        // --- Core Ideologues (Endecja) --- (Level 1-2)
        { 
            id: 'dmowski', label: 'Roman Dmowski', group: 'ideologue', level: 2,
            start: '1864-08-16', end: '1939-01-02',
            title: 'Roman Dmowski (1864-1939)',
            description: 'Chief ideologue of "integral nationalism" and co-founder of the National Democracy movement. His vision, outlined in "Thoughts of a Modern Pole," was an ethnically and culturally homogenous "Poland for Poles." He was the primary political architect of the movement.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Roman_Dmowski_portret.jpg',
            link: 'https://cbmn.pl/roman-dmowski/'
        },
        { 
            id: 'balicki', label: 'Zygmunt Balicki', group: 'ideologue', level: 2,
            start: '1858-12-30', end: '1916-09-12',
            title: 'Zygmunt Balicki (1858-1916)',
            description: 'A key sociologist and publicist of the Endecja. He formulated the concept of "national egoism" (egoizm narodowy), arguing that the nation\'s interest is the supreme moral good. A co-founder of Liga Narodowa.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Zygmunt_Balicki_foto.jpg',
            link: 'https://cbmn.pl/zygmunt-balicki/'
        },
        { 
            id: 'poplawski', label: 'Jan Ludwik Popławski', group: 'ideologue', level: 2,
            start: '1854-01-17', end: '1908-03-12',
            title: 'Jan Ludwik Popławski (1854-1908)',
            description: 'Considered the "ideological father" of the National Democracy movement. A journalist and activist from Lwów who set the early groundwork, focusing on national solidarity, "all-Polish" thought, and the importance of the peasantry.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Jan_Ludwik_Pop%C5%82awski.jpg',
            link: 'https://cbmn.pl/jan-ludwik-poplawski/'
        },
        {
            id: 'milkowski', label: 'Zygmunt Miłkowski', group: 'ideologue', level: 1,
            start: '1824-03-23', end: '1915-01-11',
            title: 'Zygmunt Miłkowski (T.T. Jeż) (1824-1915)',
            description: 'An older independence activist and writer. He founded the "Liga Polska" in Switzerland, the direct predecessor to Dmowski\'s "Liga Narodowa," making him a key ideological forefather of the movement.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Zygmunt_Mi%C5%82kowski_T.T._Je%C5%BC.jpg',
            link: 'https://cbmn.pl/zygmunt-milkowski/'
        },

        // --- Key Thinkers & Politicians (Endecja) --- (Level 4)
        { id: 'seyda', label: 'Marian Seyda', group: 'thinker', level: 3, start: '1879-07-07', end: '1967-05-17', description: 'Key Endecja leader in Poznań, editor-in-chief of Kurier Poznański, and minister in the Polish Gov\'t-in-Exile.', image: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Marian_Seyda.jpg' },
        { 
            id: 'gorski', label: 'Artur Górski', group: 'thinker', level: 4,
            start: '1870-07-02', end: '1959-12-07',
            title: 'Artur Górski (1870-1959)',
            description: 'A publicist (coined "Młoda Polska") who became a key intellectual in the national camp. His relationship with Endecja was as a cultural and literary ideologue, bridging art with national thought.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Artur_Gorski.jpg',
            link: 'https://cbmn.pl/artur-gorski/'
        },
        { 
            id: 'glabinski', label: 'Stanisław Głąbiński', group: 'thinker', level: 4,
            start: '1862-02-25', end: '1941-08-14',
            title: 'Stanisław Głąbiński (1862-1941)',
            description: 'An economist and politician from Lwów. A leader of the National Democracy in Galicia, he was a prominent parliamentary representative and minister, closely aligned with Dmowski.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Stanis%C5%82aw_G%C5%82%C4%85bi%C5%84ski.jpg',
            link: 'https://cbmn.pl/stanislaw-glabinski/'
        },
        {
            id: 'grabski_s', label: 'Stanisław Grabski', group: 'thinker', level: 4,
            start: '1871-04-05', end: '1949-05-06',
            title: 'Stanisław Grabski (1871-1949)',
            description: 'Politician and economist, brother of Władysław. An early figure in the Polish Socialist Party who moved to the Endecja, becoming a key Endecja Sejm deputy and theorist on social and agrarian issues.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Stanis%C5%82aw_Grabski_portret.jpg',
            link: 'https://cbmn.pl/stanislaw-grabski/'
        },
        {
            id: 'rybarski', label: 'Roman Rybarski', group: 'thinker', level: 5,
            start: '1887-07-03', end: '1942-03-06',
            title: 'Roman Rybarski (1887-1942)',
            description: 'The chief economic ideologue of the Endecja in the 1930s. He formulated the economic program for the National Party (SN), blending nationalism with liberal economic principles ("national liberalism").',
            image: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Roman_Rybarski_portret.jpg',
            link: 'https://cbmn.pl/roman-rybarski/'
        },
        {
            id: 'giertych', label: 'Jędrzej Giertych', group: 'thinker', level: 5,
            start: '1903-05-27', end: '1992-10-09',
            title: 'Jędrzej Giertych (1903-1992)',
            description: 'A prominent, more radical voice in the post-Dmowski generation of Endecja. His relationship with the main movement was complex; he was a leader in the National Party (SN) but represented a more stridently nationalist and traditionalist wing.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/5/52/J%C4%99drzej_Giertych.jpg',
            link: 'https://cbmn.pl/jedrzej-giertych/'
        },
        {
            id: 'piasecki', label: 'Bolesław Piasecki', group: 'thinker', level: 6,
            start: '1915-02-18', end: '1979-01-01',
            title: 'Bolesław Piasecki (1915-1979)',
            description: 'A radical nationalist politician. He was a leader in the OWP, but split to co-found the more radical, antisemitic, and fascist-inspired ONR, leading its "Falanga" faction. He was a primary rival to the "old guard" of the SN.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Boles%C5%82aw_Piasecki_1936.jpg'
        },
        {
            id: 'rossman', label: 'Henryk Rossman', group: 'thinker', level: 6,
            start: '1903-01-08', end: '1937-05-27',
            title: 'Henryk Rossman (1903-1937)',
            description: 'A lawyer and one of the main ideologues of the "young" Endecja. He co-founded the ONR and led its more "mainstream" faction, ONR-ABC, before being imprisoned by the Sanacja in Bereza Kartuska.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Henryk_Rossman.jpg'
        },
        {
            id: 'szymanski', label: 'Fr. Antoni Szymański', group: 'thinker', level: 4,
            start: '1881-11-13', end: '1942-01-26',
            title: 'Antoni Szymański (1881-1942)',
            description: 'A Catholic priest, social scientist, and professor at the Catholic University of Lublin. He was a key figure in developing the doctrine of "National Catholicism," attempting to harmonize Endecja\'s nationalism with Catholic social teaching. He wrote extensively for publications like "Myśl Narodowa".',
            image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Antoni_Szyma%C5%84ski_%281881-1942%29.jpg'
        },

        // --- Modern ND Thinkers/Leaders --- (Level 7-8)
        {
            id: 'roman_giertych', label: 'Roman Giertych', group: 'modern_nd', level: 8,
            start: '1971-02-27',
            title: 'Roman Giertych (b. 1971)',
            description: 'Politician, lawyer, and grandson of Jędrzej Giertych. He was a founder of the All-Polish Youth (1989) and leader of the League of Polish Families (LPR), a party drawing heavily on Endecja traditions.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Roman_Giertych_2023.jpg/800px-Roman_Giertych_2023.jpg'
        },
        {
            id: 'bosak', label: 'Krzysztof Bosak', group: 'modern_nd', level: 8,
            start: '1982-06-13',
            title: 'Krzysztof Bosak (b. 1982)',
            description: 'Politician, co-founder of Ruch Narodowy and Konfederacja. He began his political career in the All-Polish Youth and LPR, representing a continuation of the nationalist movement\'s modern iteration.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Krzysztof_Bosak_2020.jpg/800px-Krzysztof_Bosak_2020.jpg'
        },

        // --- Related Historical Leaders (Allies/Rivals/Clergy) --- (Level 3-4)
        { 
            id: 'pilsudski', label: 'Józef Piłsudski', group: 'leader', level: 4,
            start: '1867-12-05', end: '1935-05-12',
            title: 'Józef Piłsudski (1867-1935)',
            description: 'Dmowski\'s primary political rival. His federalist, multi-ethnic vision ("Prometheism") and sanacja government were the main opposition to Endecja\'s "national" state concept, defining the central political conflict of the 2nd Republic.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/J%C3%B3zef_Pi%C5%82sudski_removebg_lowres-improve.png/800px-J%C3%B3zef_Pi%C5%82sudski_removebg_lowres-improve.png'
        },
        { 
            id: 'paderewski', label: 'Ignacy J. Paderewski', group: 'leader', level: 3,
            start: '1860-11-18', end: '1941-06-29',
            title: 'Ignacy Jan Paderewski (1860-1941)',
            description: 'World-renowned pianist and statesman. His relationship with National Democracy was one of pragmatic alliance. He allied with Dmowski at the Paris Peace Conference to lobby for Polish independence, serving as Prime Minister in a government supported by Endecja.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Ignacy_Jan_Paderewski_-_grayscale.jpg'
        },
        {
            id: 'grabski_w', label: 'Władysław Grabski', group: 'leader', level: 4,
            start: '1874-07-07', end: '1938-03-01',
            title: 'Władysław Grabski (1874-1938)',
            description: 'Prime Minister and economist famous for his monetary reforms. Though not an Endek himself, his "non-parliamentary" expert government was supported by the Endecja, who saw his economic stabilization as a national priority.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Wladyslaw_Grabski.jpg'
        },
        {
            id: 'korfanty', label: 'Wojciech Korfanty', group: 'leader', level: 4,
            start: '1873-04-20', end: '1939-08-17',
            title: 'Wojciech Korfanty (1873-1939)',
            description: 'Leader of the Silesian Uprisings. His relationship with Endecja was as a key ally. A Christian Democrat, he frequently collaborated with the National Democrats, sharing a common nationalist and anti-German orientation.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Wojciech_Korfanty_1.jpg',
            link: 'https://cbmn.pl/wojciech-korfanty/'
        },
        {
            id: 'hlond', label: 'Cardinal August Hlond', group: 'clergy', level: 4,
            start: '1881-07-05', end: '1948-10-22',
            title: 'August Hlond (1881-1948)',
            description: 'Primate of Poland. His relationship with the Endecja was complex. While sharing anti-communist and traditionalist views, he was often critical of the movement\'s radicalism and intense political partisanship, seeking to keep the Church above factional conflict.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Hlond.jpg'
        },
        // --- NEW NODE ---
        {
          "id": "haller", "label": "Józef Haller", "group": "leader", "level": 3,
          "start": "1873-08-13", "end": "1960-06-04",
          "title": "Józef Haller (1873-1960)",
          "description": "General of the Polish Army, commander of the 'Blue Army.' After WWI, his political views aligned closely with the Endecja. He ran for President of Poland in 1922 with the support of the ZLN and was a prominent figure in the 'national camp,' opposing Piłsudski.",
          "image": "https://upload.wikimedia.org/wikipedia/commons/a/a2/J%C3%B3zef_Haller_de_Hallenburg_1920.jpg",
          "link": "https://cbmn.pl/jozef-haller/"
        },
        // --- NEW NODE ---
        {
          "id": "doboszynski", "label": "Adam Doboszyński", "group": "thinker", "level": 6,
          "start": "1904-01-11", "end": "1949-08-29",
          "title": "Adam Doboszyński (1904-1949)",
          "description": "A radical nationalist writer and politician, part of the 'young' generation. He was a member of the SN but increasingly critical of its leadership, advocating for more direct, extra-parliamentary action, culminating in his famous 1936 'Myślenice Raid.'",
          "image": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Adam_Doboszynski.jpg",
          "link": "https://cbmn.pl/adam-doboszynski/"
        },

        // --- Antagonists --- (Level 5-6)
        {
            id: 'sanacja', label: 'Sanacja Movement', group: 'antagonist', level: 5,
            start: '1926-05-12', end: '1939-09-18',
            title: 'Sanacja (Sanation) (1926-1939)',
            description: 'The authoritarian political movement led by Józef Piłsudski after the 1926 May Coup. It was the primary political enemy of the Endecja, delegalizing the OWP and ONR, and imprisoning its opponents.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Odznaka_Zwi%C4%85zku_Legionist%C3%B3w_Polskich.jpg'
        },

        // --- Organizations, Publications & Events --- (Level 1-7)
        {
            id: 'liga_polska', label: 'Liga Polska', group: 'organization', level: 1,
            start: '1887',
            title: 'Liga Polska (Polish League) (1887)',
            description: 'Founded by Zygmunt Miłkowski, this was the predecessor organization to Liga Narodowa. Dmowski and Balicki later transformed it from this older, romantic-insurrectionist body into a modern political machine.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Herb_Polskiej_Litewskiej_Ruskiej_Rzeczypospolitej.svg/800px-Herb_Polskiej_Litewskiej_Ruskiej_Rzeczypospolitej.svg.png'
        },
        { 
            id: 'liga_narodowa', label: 'Liga Narodowa', group: 'organization', level: 2,
            start: '1893',
            title: 'Liga Narodowa (National League) (1893)',
            description: 'The secret, elite "cadre" organization of the National Democracy movement, founded by Dmowski, Balicki, and Popławski. It set the ideology and strategy for the entire camp.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Mieczyk_Chrobrego_shaded.svg/800px-Mieczyk_Chrobrego_shaded.svg.png'
        },
        { 
            id: 'zln', label: 'ZLN', group: 'organization', level: 4,
            start: '1919',
            title: 'Związek Ludowo-Narodowy (ZLN) (1919)',
            description: 'The "Popular National Union," the main political party of the Endecja in the early Second Polish Republic. It was the dominant force in the first Polish parliament (Sejm Ustawodawczy).',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Mieczyk_Chrobrego_shaded.svg/800px-Mieczyk_Chrobrego_shaded.svg.png'
        },
        {
            id: 'owp', label: 'OWP', group: 'organization', level: 5,
            start: '1926-12-04',
            title: 'Obóz Wielkiej Polski (OWP) (1926)',
            description: '"Camp of Great Poland." A mass-movement organization founded by Dmowski after Piłsudski\'s coup. It was designed to unite the "national camp" outside of parliamentary politics and had a more radical, extra-parliamentary, and antisemitic character.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Szczerbiec_cleaned.png/613px-Szczerbiec_cleaned.png'
        },
        {
            id: 'sn', label: 'Stronnictwo Narodowe (SN)', group: 'organization', level: 5,
            start: '1928-10-07',
            title: 'Stronnictwo Narodowe (SN) (1928)',
            description: 'The "National Party." The final political party form of the Endecja in the Second Polish Republic, succeeding the ZLN. It was the main parliamentary and political vehicle for the movement until 1939.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Mieczyk_Chrobrego_shaded.svg/800px-Mieczyk_Chrobrego_shaded.svg.png'
        },
        {
            id: 'mw', label: 'Młodzież Wszechpolska (MW)', group: 'organization', level: 5,
            start: '1922',
            title: 'Młodzież Wszechpolska (All-Polish Youth) (1922)',
            description: 'The official youth wing of the Endecja. It was a powerful, autonomous, and often radical student organization, known for its antisemitic agitation (e.g., "ghetto benches"), that became a key recruitment base for the national movement.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/M%C5%82odzie%C5%BC_Wszechpolska_logo.svg/800px-M%C5%82odzie%C5%BC_Wszechpolska_logo.svg.png'
        },
        {
            id: 'onr', label: 'ONR', group: 'organization', level: 6,
            start: '1934-04-14',
            title: 'Obóz Narodowo-Radykalny (ONR) (1934)',
            description: '"National Radical Camp." A radical, fascist-inspired organization that split from the OWP in 1934, led by the "young" generation (Piasecki, Rossman). It was more extreme than Dmowski\'s SN and was quickly delegalized by the Sanacja.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Falanga.svg/800px-Falanga.svg.png'
        },
        {
            id: 'onr_falanga', label: 'ONR-Falanga', group: 'organization', level: 7,
            start: '1935',
            title: 'Ruch Narodowo-Radykalny (ONR-Falanga) (1935)',
            description: 'A faction of the ONR, led by Bolesław Piasecki. It was one of the most extreme, openly fascist and totalitarian movements in Poland, blending radical nationalism with Catholicism.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Falanga.svg/800px-Falanga.svg.png'
        },
        {
            id: 'onr_abc', label: 'ONR-ABC', group: 'organization', level: 7,
            start: '1935',
            title: 'Obóz Narodowo-Radykalny (ONR-ABC) (1935)',
            description: 'A faction of the ONR, grouped around the "ABC" journal and led by Henryk Rossman. While still radical, it was considered slightly more "traditional" than Piasecki\'s Falanga.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Falanga.svg/800px-Falanga.svg.png'
        },
        {
            id: 'gov_in_exile', label: 'Polish Gov\'t-in-Exile', group: 'organization', level: 4, 
            start: '1939-09',
            description: 'The government of Poland in exile during World War II.', 
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Herb_RP_na_uchod%C5%BAstwie_1956-1990.svg/800px-Herb_RP_na_uchod%C5%BAstwie_1956-1990.svg.png' 
        },
        
        // --- Modern ND Organizations --- (Level 8-9)
        {
            id: 'lpr', label: 'LPR', group: 'modern_nd', level: 9,
            start: '2001-04-10',
            title: 'Liga Polskich Rodzin (LPR) (2001-2010s)',
            description: 'League of Polish Families. A political party founded by Roman Giertych, which served as the main political vehicle for the modern Endecja-inspired movement in the early 2000s, often drawing from the Młodzież Wszechpolska.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Logo_LPR.svg/800px-Logo_LPR.svg.png'
        },
        {
            id: 'ruch_narodowy', label: 'Ruch Narodowy', group: 'modern_nd', level: 9,
            start: '2012-11-11',
            title: 'Ruch Narodowy (National Movement) (2012-Present)',
            description: 'A political party and movement formed from a coalition of nationalist groups, including the Młodzież Wszechpolska. It directly claims the heritage of the Endecja and SN. Co-founded by Krzysztof Bosak.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Ruch_Narodowy_logo_2023.svg/800px-Ruch_Narodowy_logo_2023.svg.png'
        },
        
        { 
            id: 'versailles', label: 'Treaty of Versailles', group: 'event', level: 3,
            start: '1919-06-28',
            title: 'Treaty of Versailles (1919)',
            description: 'The peace treaty that ended WWI. A major diplomatic victory for the Endecja, as Dmowski (and his ally Paderewski) were the key Polish delegates who successfully argued for Polish borders, particularly in the west.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Treaty_of_Versailles%2C_English_copy.jpg/800px-Treaty_of_Versailles%2C_English_copy.jpg'
        },

        // --- Internment Camp --- (Level 6)
        {
            id: 'bereza_kartuska', label: 'Bereza Kartuska', group: 'antagonist', level: 6,
            start: '1934-06-17', end: '1939-09-18',
            title: 'Bereza Kartuska (1934-1939)',
            description: 'An internment camp established by the Sanacja government to imprison its political opponents without trial. While primarily targeting Ukrainian nationalists and communists, many members of the radical Endecja-splinter (ONR) were also imprisoned there.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Bereza_Kartuska_prison_main_gate.jpg'
        },
        { id: 'kurier_poznanski', label: 'Kurier Poznański', group: 'publication', level: 2, start: '1872', end: '1939', description: 'The largest non-Warsaw daily paper associated with the Endecja, serving as its factual press organ in Poznań.', image: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Kurier_Pozna%C5%84ski_1920.jpg' },
        {
            id: 'mysl_narodowa', label: 'Myśl Narodowa', group: 'publication', level: 3,
            start: '1921', end: '1939',
            title: 'Myśl Narodowa (National Thought)',
            description: 'A leading intellectual weekly journal of the Endecja. It was a primary platform for the movement\'s ideologues, including Dmowski, Rybarski, and Catholic thinkers like Fr. Szymański, to articulate their political, social, and cultural views.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/4/48/My%C5%9Bl_Narodowa_1935.jpg'
        },

        // --- City Nodes --- (Level 0 - Base)
        {
            id: 'warszawa', label: 'Warszawa', group: 'city', level: 0,
            title: 'Warszawa (Warsaw)',
            description: 'The capital of the Second Polish Republic and the central stage for the political battle between Dmowski\'s SN and Piłsudski\'s Sanacja. Dmowski himself lived and operated here for long periods.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Herb_Warszawy.svg/800px-Herb_Warszawy.svg.png'
        },
        {
            id: 'lwow', label: 'Lwów', group: 'city', level: 0,
            title: 'Lwów (Lviv)',
            description: 'A critical "ideological cradle" of the Endecja. It was the home base for founders like Popławski and Balicki, and the center of the Galician branch of the movement led by Stanisław Głąbiński.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Herb_Lwowa_z_XIX_w..jpg/633px-Herb_Lwowa_z_XIX_w..jpg'
        },
        {
            id: 'poznan', label: 'Poznań', group: 'city', level: 0,
            title: 'Poznań (Posen)',
            description: 'A major stronghold of the National Democracy. The "Prussian" partition\'s experience with Germanization made the region highly receptive to Endecja\'s message. It was a center for the OWP and had a strong organizational base.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/POL_Pozna%C5%84_COA.svg/800px-POL_Pozna%C5%84_COA.svg.png'
        }
    ],
    edges: [
        // --- Organizational Evolution ---
        { from: 'milkowski', to: 'liga_polska', label: 'FOUNDED' },
        { from: 'liga_polska', to: 'liga_narodowa', label: 'PREDECESSOR_OF' },
        { from: 'dmowski', to: 'liga_narodowa', label: 'CO-FOUNDED' },
        { from: 'balicki', to: 'liga_narodowa', label: 'CO-FOUNDED' },
        { from: 'poplawski', to: 'liga_narodowa', label: 'CO-FOUNDED' },
        { from: 'liga_narodowa', to: 'zln', label: 'EVOLVED_INTO' },
        { from: 'zln', to: 'owp', label: 'EVOLVED_INTO' },
        { from: 'zln', to: 'sn', label: 'EVOLVED_INTO' },
        { from: 'owp', to: 'sn', label: 'PARENT_ORG_OF' }, 
        { from: 'mw', to: 'sn', label: 'YOUTH_WING_OF' },

        // --- The ONR Split ---
        { from: 'owp', to: 'onr', label: 'SPLIT_FROM', color: { color: '#ef4444' } },
        { from: 'mw', to: 'onr', label: 'MEMBERS_JOINED' },
        { from: 'onr', to: 'onr_falanga', label: 'SPLIT_INTO', color: { color: '#ef4444' } },
        { from: 'onr', to: 'onr_abc', label: 'SPLIT_INTO', color: { color: '#ef4444' } },
        { from: 'piasecki', to: 'owp', label: 'MEMBER_OF' },
        { from: 'piasecki', to: 'onr_falanga', label: 'FOUNDED_&_LED' },
        { from: 'rossman', to: 'owp', label: 'MEMBER_OF' },
        { from: 'rossman', to: 'onr_abc', label: 'CO-FOUNDED' },

        // --- Ideological Links ---
        { from: 'poplawski', to: 'dmowski', label: 'INFLUENCED' },
        { from: 'balicki', to: 'dmowski', label: 'COLLABORATED_WITH' },
        { from: 'gorski', to: 'dmowski', label: 'ALLIED_WITH' },
        { from: 'glabinski', to: 'dmowski', label: 'ALLIED_WITH' },
        { from: 'grabski_s', to: 'dmowski', label: 'ALLIED_WITH' },
        { from: 'rybarski', to: 'sn', label: 'THEORIST_FOR' },
        { from: 'giertych', to: 'sn', label: 'MEMBER_OF' },
        { from: 'szymanski', to: 'mysl_narodowa', label: 'WROTE_FOR' },
        { from: 'szymanski', to: 'sn', label: 'IDEOLOGICALLY_ALIGNED' },
        { from: 'dmowski', to: 'mysl_narodowa', label: 'CONTRIBUTED_TO' },
        { from: 'hlond', to: 'sn', label: 'COMPLEX_RELATION' },

        // --- Modern ND Links ---
        { from: 'roman_giertych', to: 'giertych', label: 'GRANDSON_OF' },
        { from: 'roman_giertych', to: 'lpr', label: 'FOUNDED_&_LED' },
        { from: 'lpr', to: 'mw', label: 'DREW_FROM' },
        { from: 'lpr', to: 'sn', label: 'IDEOLOGICAL_SUCCESSOR' },
        { from: 'bosak', to: 'lpr', label: 'FORMER_MEMBER' },
        { from: 'bosak', to: 'ruch_narodowy', label: 'CO-FOUNDED' },
        { from: 'ruch_narodowy', to: 'sn', label: 'IDEOLOGICAL_SUCCESSOR' },
        { from: 'ruch_narodowy', to: 'owp', label: 'IDEOLOGICAL_SUCCESSOR' },
        { from: 'ruch_narodowy', to: 'mw', label: 'DREW_FROM' },

        // --- Political Links (Allies/Rivals) ---
        { from: 'dmowski', to: 'pilsudski', label: 'POLITICAL_RIVAL', color: { color: '#ef4444' }, dashes: true },
        { from: 'dmowski', to: 'versailles', label: 'DELEGATE_AT' },
        { from: 'paderewski', to: 'versailles', label: 'DELEGATE_AT' },
        { from: 'dmowski', to: 'paderewski', label: 'ALLIED_AT_VERSAILLES' },
        { from: 'dmowski', to: 'owp', label: 'FOUNDED' },
        { from: 'zln', to: 'grabski_w', label: 'SUPPORTED_GOV\'T' },
        { from: 'zln', to: 'korfanty', label: 'POLITICAL_ALLY' },
        { from: 'sn', to: 'korfanty', label: 'POLITICAL_ALLY' },

        // --- Sanacja & Repression Links ---
        { from: 'pilsudski', to: 'sanacja', label: 'LEADER_OF' },
        { from: 'sanacja', to: 'dmowski', label: 'POLITICAL_RIVAL', color: { color: '#ef4444' }, dashes: true },
        { from: 'sanacja', to: 'owp', label: 'DELEGALIZED', color: { color: '#ef4444' }, dashes: true },
        { from: 'sanacja', to: 'sn', label: 'REPRESSED', color: { color: '#ef4444' }, dashes: true },
        { from: 'sanacja', to: 'onr', label: 'DELEGALIZED', color: { color: '#ef4444' }, dashes: true }, 
        { from: 'sanacja', to: 'bereza_kartuska', label: 'OPERATED' },
        { from: 'sn', to: 'bereza_kartuska', label: 'MEMBERS_IMPRISONED' },
        { from: 'owp', to: 'bereza_kartuska', label: 'MEMBERS_IMPRISONED' },
        { from: 'onr', to: 'bereza_kartuska', label: 'MEMBERS_IMPRISONED' }, 
        { from: 'rossman', to: 'bereza_kartuska', label: 'IMPRISONED_IN' }, 

        // --- City & Publication Links ---
        { from: 'poplawski', to: 'lwow', label: 'BASED_IN' },
        { from: 'balicki', to: 'lwow', label: 'BASED_IN' },
        { from: 'glabinski', to: 'lwow', label: 'BASED_IN' },
        { from: 'dmowski', to: 'warszawa', label: 'BASED_IN' },
        { from: 'pilsudski', to: 'warszawa', label: 'BASED_IN' },
        { from: 'sn', to: 'warszawa', label: 'HQ_IN' },
        { from: 'owp', to: 'poznan', label: 'STRONGHOLD_IN' },
        { from: 'poznan', to: 'sn', label: 'STRONGHOLD_FOR' },
        { from: 'seyda', to: 'kurier_poznanski', label: 'EDITOR_IN_CHIEF' },
        { from: 'seyda', to: 'liga_narodowa', label: 'MEMBER_OF' },
        { from: 'kurier_poznanski', to: 'liga_narodowa', label: 'PRESS_ORGAN_OF' },
        { from: 'seyda', to: 'dmowski', label: 'COLLABORATED_WITH' },
        { from: 'seyda', to: 'gov_in_exile', label: 'MINISTER_IN' },
        { from: 'seyda', to: 'poznan', label: 'BASED_IN' },
        { from: 'kurier_poznanski', to: 'poznan', label: 'BASED_IN' },
        
        // --- NEW EDGES ---
        { "from": "haller", "to": "zln", "label": "SUPPORTED_BY" },
        { "from": "haller", "to": "pilsudski", "label": "POLITICAL_RIVAL", "color": { "color": "#ef4444" }, "dashes": true },
        { "from": "doboszynski", "to": "sn", "label": "MEMBER_OF" },
        { "from": "doboszynski", "to": "giertych", "label": "CONTEMPORARY" }
    ]
};