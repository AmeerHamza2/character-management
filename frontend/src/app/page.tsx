'use client';

import { Suspense } from 'react';
import { useQueryState, parseAsString } from 'nuqs';
import { FilterBar, CharacterGrid } from '@/components';
import { useCharacters, type Status, type Gender } from '@/hooks/useCharacters';

function CharacterList() {
  const [status] = useQueryState('status', parseAsString.withDefault(''));
  const [gender] = useQueryState('gender', parseAsString.withDefault(''));
  const [search] = useQueryState('search', parseAsString.withDefault(''));

  const { data: characters = [], isLoading, error } = useCharacters({
    status: status as Status || undefined,
    gender: gender as Gender || undefined,
    search: search || undefined,
  });

  return (
    <CharacterGrid
      characters={characters}
      isLoading={isLoading}
      error={error as Error | null}
    />
  );
}

export default function Home() {
  return (
    <main className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Character Management
          </h1>
          <p className="text-gray-600">
            Browse and filter characters from various universes
          </p>
        </header>

        <Suspense fallback={<div className="h-24 bg-gray-100 rounded-xl animate-pulse" />}>
          <FilterBar />
        </Suspense>

        <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
          <CharacterList />
        </Suspense>
      </div>
    </main>
  );
}
