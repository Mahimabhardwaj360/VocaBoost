// ===== VOCABOOST VOCABULARY DATA =====

const CATEGORIES = [
  { id: 'academic',   name: 'Academic',    icon: '🎓' },
  { id: 'business',   name: 'Business',    icon: '💼' },
  { id: 'science',    name: 'Science',     icon: '🔬' },
  { id: 'literary',   name: 'Literary',    icon: '📖' },
  { id: 'everyday',   name: 'Everyday',    icon: '💬' },
  { id: 'advanced',   name: 'Advanced',    icon: '🚀' },
];

const WORDS = [
  // ── ACADEMIC ──
  {
    id: 1, category: 'academic', word: 'Ephemeral',
    phonetic: '/ɪˈfem.ər.əl/', pos: 'adjective',
    definition: 'Lasting for a very short time; transitory.',
    example: 'The ephemeral beauty of cherry blossoms makes them more precious.',
  },
  {
    id: 2, category: 'academic', word: 'Ubiquitous',
    phonetic: '/juːˈbɪk.wɪ.təs/', pos: 'adjective',
    definition: 'Present, appearing, or found everywhere at the same time.',
    example: 'Smartphones have become ubiquitous in modern life.',
  },
  {
    id: 3, category: 'academic', word: 'Paradigm',
    phonetic: '/ˈpær.ə.daɪm/', pos: 'noun',
    definition: 'A typical example or pattern; a model or framework.',
    example: 'Einstein\'s theory represented a paradigm shift in physics.',
  },
  {
    id: 4, category: 'academic', word: 'Juxtapose',
    phonetic: '/ˈdʒʌk.stə.poʊz/', pos: 'verb',
    definition: 'To place two things side by side for contrasting effect.',
    example: 'The artist juxtaposed dark and light to create tension.',
  },
  {
    id: 5, category: 'academic', word: 'Empirical',
    phonetic: '/ɪmˈpɪr.ɪ.kəl/', pos: 'adjective',
    definition: 'Based on observation and experiment rather than theory.',
    example: 'We need empirical evidence before drawing conclusions.',
  },
  {
    id: 6, category: 'academic', word: 'Nuance',
    phonetic: '/ˈnjuː.ɑːns/', pos: 'noun',
    definition: 'A subtle distinction or variation in expression or meaning.',
    example: 'The translator struggled to convey every nuance of the poem.',
  },
  {
    id: 7, category: 'academic', word: 'Axiom',
    phonetic: '/ˈæk.si.əm/', pos: 'noun',
    definition: 'A statement regarded as self-evidently true; a universal principle.',
    example: 'It is an axiom that all humans are mortal.',
  },
  {
    id: 8, category: 'academic', word: 'Cogent',
    phonetic: '/ˈkoʊ.dʒənt/', pos: 'adjective',
    definition: 'Clear, logical, and convincing in argument.',
    example: 'She made a cogent case for reforming the tax code.',
  },

  // ── BUSINESS ──
  {
    id: 9, category: 'business', word: 'Leverage',
    phonetic: '/ˈlev.ər.ɪdʒ/', pos: 'verb / noun',
    definition: 'To use something to its maximum advantage; the power to influence.',
    example: 'They leveraged their brand recognition to enter new markets.',
  },
  {
    id: 10, category: 'business', word: 'Synergy',
    phonetic: '/ˈsɪn.ər.dʒi/', pos: 'noun',
    definition: 'The cooperation of two entities producing a combined effect greater than the sum of their parts.',
    example: 'The merger created synergy that boosted both companies\' profits.',
  },
  {
    id: 11, category: 'business', word: 'Scalable',
    phonetic: '/ˈskeɪ.lə.bəl/', pos: 'adjective',
    definition: 'Able to be expanded or upgraded without losing performance or value.',
    example: 'Their SaaS platform is highly scalable and supports millions of users.',
  },
  {
    id: 12, category: 'business', word: 'Iterate',
    phonetic: '/ˈɪt.ə.reɪt/', pos: 'verb',
    definition: 'To repeat a process, making incremental improvements each time.',
    example: 'The startup iterated on its product based on customer feedback.',
  },
  {
    id: 13, category: 'business', word: 'Disruptive',
    phonetic: '/dɪsˈrʌp.tɪv/', pos: 'adjective',
    definition: 'Causing fundamental changes to a market or industry.',
    example: 'Uber was a disruptive force in the taxi industry.',
  },
  {
    id: 14, category: 'business', word: 'Pivot',
    phonetic: '/ˈpɪv.ət/', pos: 'verb / noun',
    definition: 'To make a significant change in strategy while retaining core elements.',
    example: 'After poor sales, the company pivoted to a subscription model.',
  },

  // ── SCIENCE ──
  {
    id: 15, category: 'science', word: 'Entropy',
    phonetic: '/ˈen.trə.pi/', pos: 'noun',
    definition: 'A measure of disorder or randomness in a system; the tendency toward chaos.',
    example: 'Entropy increases naturally in any isolated system over time.',
  },
  {
    id: 16, category: 'science', word: 'Osmosis',
    phonetic: '/ɒzˈmoʊ.sɪs/', pos: 'noun',
    definition: 'The passage of a solvent through a semipermeable membrane from a less concentrated to a more concentrated solution.',
    example: 'Plants absorb water from soil through osmosis.',
  },
  {
    id: 17, category: 'science', word: 'Catalyst',
    phonetic: '/ˈkæt.ə.lɪst/', pos: 'noun',
    definition: 'A substance that increases the rate of a reaction without being consumed; a person or event that triggers change.',
    example: 'The discovery of penicillin was a catalyst for modern medicine.',
  },
  {
    id: 18, category: 'science', word: 'Homeostasis',
    phonetic: '/ˌhoʊ.mi.əˈsteɪ.sɪs/', pos: 'noun',
    definition: 'The tendency of a system to maintain stable internal conditions despite external changes.',
    example: 'Sweating is the body\'s way of maintaining homeostasis.',
  },
  {
    id: 19, category: 'science', word: 'Quantum',
    phonetic: '/ˈkwɒn.təm/', pos: 'noun / adjective',
    definition: 'The minimum discrete amount of any physical quantity; related to quantum mechanics.',
    example: 'Quantum computing could revolutionize data processing.',
  },
  {
    id: 20, category: 'science', word: 'Mitosis',
    phonetic: '/maɪˈtoʊ.sɪs/', pos: 'noun',
    definition: 'The process by which a cell divides to produce two identical daughter cells.',
    example: 'Mitosis is essential for growth and tissue repair in organisms.',
  },

  // ── LITERARY ──
  {
    id: 21, category: 'literary', word: 'Soliloquy',
    phonetic: '/səˈlɪl.ə.kwi/', pos: 'noun',
    definition: 'An act of speaking one\'s thoughts aloud, especially in a play.',
    example: 'Hamlet\'s "To be or not to be" is the most famous soliloquy in English literature.',
  },
  {
    id: 22, category: 'literary', word: 'Allegory',
    phonetic: '/ˈæl.ɪ.ɡɔː.ri/', pos: 'noun',
    definition: 'A story or poem in which characters and events represent deeper moral or political meanings.',
    example: 'Orwell\'s Animal Farm is an allegory of the Russian Revolution.',
  },
  {
    id: 23, category: 'literary', word: 'Catharsis',
    phonetic: '/kəˈθɑːr.sɪs/', pos: 'noun',
    definition: 'The process of releasing strong emotions, especially through art or tragedy.',
    example: 'Watching the film provided catharsis for audiences who had experienced loss.',
  },
  {
    id: 24, category: 'literary', word: 'Denouement',
    phonetic: '/ˌdeɪ.nuːˈmɑːn/', pos: 'noun',
    definition: 'The final part of a narrative where conflicts are resolved.',
    example: 'The surprise denouement left readers shocked and satisfied.',
  },
  {
    id: 25, category: 'literary', word: 'Hubris',
    phonetic: '/ˈhjuː.brɪs/', pos: 'noun',
    definition: 'Excessive pride or self-confidence, often leading to downfall.',
    example: 'The CEO\'s hubris led him to ignore all warnings before the company collapsed.',
  },

  // ── EVERYDAY ──
  {
    id: 26, category: 'everyday', word: 'Candid',
    phonetic: '/ˈkæn.dɪd/', pos: 'adjective',
    definition: 'Truthful and straightforward; not hiding thoughts or feelings.',
    example: 'She gave a candid assessment of the situation.',
  },
  {
    id: 27, category: 'everyday', word: 'Reciprocate',
    phonetic: '/rɪˈsɪp.rə.keɪt/', pos: 'verb',
    definition: 'To respond to a gesture by making a corresponding one.',
    example: 'He helped her move, and she reciprocated by cooking dinner.',
  },
  {
    id: 28, category: 'everyday', word: 'Resilient',
    phonetic: '/rɪˈzɪl.i.ənt/', pos: 'adjective',
    definition: 'Able to recover quickly from difficulties; tough and adaptable.',
    example: 'The resilient community rebuilt after the flood.',
  },
  {
    id: 29, category: 'everyday', word: 'Ambiguous',
    phonetic: '/æmˈbɪɡ.ju.əs/', pos: 'adjective',
    definition: 'Open to more than one interpretation; not clear or decided.',
    example: 'His ambiguous response left everyone uncertain.',
  },
  {
    id: 30, category: 'everyday', word: 'Frugal',
    phonetic: '/ˈfruː.ɡəl/', pos: 'adjective',
    definition: 'Sparing or economical in the use of money or food.',
    example: 'Her frugal habits allowed her to save a large sum over the years.',
  },

  // ── ADVANCED ──
  {
    id: 31, category: 'advanced', word: 'Sycophant',
    phonetic: '/ˈsɪk.ə.fænt/', pos: 'noun',
    definition: 'A person who uses flattery to gain favor; a fawning flatterer.',
    example: 'The politician was surrounded by sycophants who told him only what he wanted to hear.',
  },
  {
    id: 32, category: 'advanced', word: 'Perfidious',
    phonetic: '/pəˈfɪd.i.əs/', pos: 'adjective',
    definition: 'Deceitful and untrustworthy; guilty of betrayal.',
    example: 'The perfidious advisor leaked state secrets to the enemy.',
  },
  {
    id: 33, category: 'advanced', word: 'Loquacious',
    phonetic: '/loʊˈkweɪ.ʃəs/', pos: 'adjective',
    definition: 'Tending to talk a great deal; talkative.',
    example: 'The loquacious host entertained guests for hours.',
  },
  {
    id: 34, category: 'advanced', word: 'Obfuscate',
    phonetic: '/ˈɒb.fʌ.skeɪt/', pos: 'verb',
    definition: 'To make unclear or difficult to understand; to confuse deliberately.',
    example: 'The legal jargon was used to obfuscate the contract\'s true terms.',
  },
  {
    id: 35, category: 'advanced', word: 'Perspicacious',
    phonetic: '/ˌpɜː.spɪˈkeɪ.ʃəs/', pos: 'adjective',
    definition: 'Having a ready insight; shrewd and having a clear understanding.',
    example: 'The perspicacious investor saw the market crash coming months in advance.',
  },
  {
    id: 36, category: 'advanced', word: 'Equanimity',
    phonetic: '/ˌiː.kwəˈnɪm.ɪ.ti/', pos: 'noun',
    definition: 'Mental calmness and composure, especially in difficult situations.',
    example: 'She faced the crisis with remarkable equanimity.',
  },
];
