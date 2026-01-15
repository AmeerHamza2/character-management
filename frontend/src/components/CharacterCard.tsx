'use client';

import type { Character } from '@/hooks/useCharacters';
import Image from 'next/image';

const statusColors = {
  ALIVE: 'bg-green-100 text-green-800',
  DEAD: 'bg-red-100 text-red-800',
  UNKNOWN: 'bg-gray-100 text-gray-800',
};

const genderIcons = {
  MALE: '♂',
  FEMALE: '♀',
  UNKNOWN: '⚥',
};

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full bg-gray-200">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {character.name}
          </h3>
          <span className="text-xl" title={character.gender}>
            {genderIcons[character.gender]}
          </span>
        </div>
        <div className="mb-3">
          <span
            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${statusColors[character.status]}`}
          >
            {character.status}
          </span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-3">
          {character.description}
        </p>
      </div>
    </div>
  );
}
