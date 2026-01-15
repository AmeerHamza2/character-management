import { PrismaClient, Status, Gender } from '@prisma/client';

const prisma = new PrismaClient();

const characters = [
  {
    name: 'Gandalf the Grey',
    image: 'https://ui-avatars.com/api/?name=Gandalf&background=6366f1&color=fff&size=200',
    status: Status.ALIVE,
    gender: Gender.MALE,
    description: 'A powerful wizard known for his wisdom and guidance. He carries a staff and wears a grey cloak.',
  },
  {
    name: 'Arwen Evenstar',
    image: 'https://ui-avatars.com/api/?name=Arwen&background=ec4899&color=fff&size=200',
    status: Status.ALIVE,
    gender: Gender.FEMALE,
    description: 'An elven princess of great beauty and grace. She possesses immortality and healing powers.',
  },
  {
    name: 'Boromir of Gondor',
    image: 'https://ui-avatars.com/api/?name=Boromir&background=ef4444&color=fff&size=200',
    status: Status.DEAD,
    gender: Gender.MALE,
    description: 'A valiant warrior who fell in battle defending his companions. Son of the Steward of Gondor.',
  },
  {
    name: 'The Sphinx',
    image: 'https://ui-avatars.com/api/?name=Sphinx&background=a855f7&color=fff&size=200',
    status: Status.UNKNOWN,
    gender: Gender.UNKNOWN,
    description: 'A mysterious creature with the body of a lion and the head of a human. Known for riddles.',
  },
  {
    name: 'Captain Nova',
    image: 'https://ui-avatars.com/api/?name=Nova&background=0ea5e9&color=fff&size=200',
    status: Status.ALIVE,
    gender: Gender.FEMALE,
    description: 'A starship commander leading explorations to distant galaxies. Known for her tactical brilliance.',
  },
  {
    name: 'Unit X-42',
    image: 'https://ui-avatars.com/api/?name=X42&background=64748b&color=fff&size=200',
    status: Status.ALIVE,
    gender: Gender.UNKNOWN,
    description: 'An advanced AI entity that developed consciousness. Questions the nature of existence.',
  },
  {
    name: 'Dr. Marcus Chen',
    image: 'https://ui-avatars.com/api/?name=Marcus&background=22c55e&color=fff&size=200',
    status: Status.DEAD,
    gender: Gender.MALE,
    description: 'A brilliant scientist who sacrificed himself to save his research station from destruction.',
  },
  {
    name: 'Zara the Bounty Hunter',
    image: 'https://ui-avatars.com/api/?name=Zara&background=f97316&color=fff&size=200',
    status: Status.ALIVE,
    gender: Gender.FEMALE,
    description: 'A skilled tracker who operates in the outer rim. Never fails to capture her target.',
  },
  {
    name: 'Thor Odinson',
    image: 'https://ui-avatars.com/api/?name=Thor&background=3b82f6&color=fff&size=200',
    status: Status.ALIVE,
    gender: Gender.MALE,
    description: 'The Norse god of thunder wielding the mighty hammer Mjolnir. Protector of Midgard.',
  },
  {
    name: 'Athena Wisdom',
    image: 'https://ui-avatars.com/api/?name=Athena&background=8b5cf6&color=fff&size=200',
    status: Status.ALIVE,
    gender: Gender.FEMALE,
    description: 'Greek goddess of wisdom and strategic warfare. Born from the head of Zeus.',
  },
  {
    name: 'Anubis Guardian',
    image: 'https://ui-avatars.com/api/?name=Anubis&background=1f2937&color=fff&size=200',
    status: Status.UNKNOWN,
    gender: Gender.MALE,
    description: 'Egyptian god of mummification and the afterlife. Guides souls to the underworld.',
  },
  {
    name: 'Sarah Storm',
    image: 'https://ui-avatars.com/api/?name=Sarah&background=06b6d4&color=fff&size=200',
    status: Status.ALIVE,
    gender: Gender.FEMALE,
    description: 'A meteorologist who gained the ability to control weather patterns. Fights natural disasters.',
  },
  {
    name: 'The Shadow',
    image: 'https://ui-avatars.com/api/?name=Shadow&background=374151&color=fff&size=200',
    status: Status.UNKNOWN,
    gender: Gender.UNKNOWN,
    description: 'A mysterious vigilante who operates in the darkness. True identity remains unknown.',
  },
  {
    name: 'Dr. Elena Vance',
    image: 'https://ui-avatars.com/api/?name=Elena&background=f43f5e&color=fff&size=200',
    status: Status.ALIVE,
    gender: Gender.FEMALE,
    description: 'A renowned surgeon and part-time superhero. Uses advanced medical tech to save lives.',
  },
  {
    name: 'Commander Rex',
    image: 'https://ui-avatars.com/api/?name=Rex&background=84cc16&color=fff&size=200',
    status: Status.DEAD,
    gender: Gender.MALE,
    description: 'A legendary military leader who died defending his nation. Remembered as a hero.',
  },
  {
    name: 'Dark Lord Malachar',
    image: 'https://ui-avatars.com/api/?name=Malachar&background=7f1d1d&color=fff&size=200',
    status: Status.DEAD,
    gender: Gender.MALE,
    description: 'An ancient sorcerer who sought to plunge the world into eternal darkness. Defeated ages ago.',
  },
  {
    name: 'Queen Serpentina',
    image: 'https://ui-avatars.com/api/?name=Serpentina&background=166534&color=fff&size=200',
    status: Status.ALIVE,
    gender: Gender.FEMALE,
    description: 'A shape-shifting villainess with venomous abilities. Rules an underground criminal empire.',
  },
  {
    name: 'The Collector',
    image: 'https://ui-avatars.com/api/?name=Collector&background=7c3aed&color=fff&size=200',
    status: Status.UNKNOWN,
    gender: Gender.UNKNOWN,
    description: 'An enigmatic being who collects rare artifacts from across dimensions. Motives unclear.',
  },
  {
    name: 'Luna Silvermoon',
    image: 'https://ui-avatars.com/api/?name=Luna&background=c4b5fd&color=1f2937&size=200',
    status: Status.ALIVE,
    gender: Gender.FEMALE,
    description: 'A werewolf princess trying to unite her pack with humans. Struggles with her dual nature.',
  },
  {
    name: 'Professor Quantum',
    image: 'https://ui-avatars.com/api/?name=Quantum&background=0d9488&color=fff&size=200',
    status: Status.ALIVE,
    gender: Gender.MALE,
    description: 'A physicist who can manipulate quantum particles. Exists in multiple states simultaneously.',
  },
  {
    name: 'Oracle Prime',
    image: 'https://ui-avatars.com/api/?name=Oracle&background=d946ef&color=fff&size=200',
    status: Status.ALIVE,
    gender: Gender.UNKNOWN,
    description: 'An ancient being with the power to see all possible futures. Speaks in cryptic prophecies.',
  },
  {
    name: 'Captain Ironheart',
    image: 'https://ui-avatars.com/api/?name=Ironheart&background=78716c&color=fff&size=200',
    status: Status.DEAD,
    gender: Gender.FEMALE,
    description: 'A pirate queen who ruled the seven seas. Went down with her ship in a legendary battle.',
  },
  {
    name: 'Kai the Wanderer',
    image: 'https://ui-avatars.com/api/?name=Kai&background=fb923c&color=fff&size=200',
    status: Status.ALIVE,
    gender: Gender.MALE,
    description: 'A nomadic martial artist searching for enlightenment. Helps those in need on his journey.',
  },
  {
    name: 'The Eternal',
    image: 'https://ui-avatars.com/api/?name=Eternal&background=fbbf24&color=1f2937&size=200',
    status: Status.UNKNOWN,
    gender: Gender.UNKNOWN,
    description: 'A being that has existed since the dawn of time. Watches over creation without interference.',
  },
  {
    name: 'Maya Thunderstrike',
    image: 'https://ui-avatars.com/api/?name=Maya&background=4f46e5&color=fff&size=200',
    status: Status.ALIVE,
    gender: Gender.FEMALE,
    description: 'A champion gladiator from a distant realm. Wields lightning-infused weapons in battle.',
  },
];

async function main() {
  const existingCount = await prisma.character.count();

  if (existingCount > 0) {
    console.log(`[SEED] Skipped - database already has ${existingCount} characters`);
    return;
  }

  console.log('[SEED] Seeding database...');

  for (const character of characters) {
    await prisma.character.create({
      data: character,
    });
  }

  console.log(`[SEED] Created ${characters.length} characters`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
