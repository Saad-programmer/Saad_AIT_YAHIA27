import { describe, expect, it } from 'vitest';
import fallbackProjects from '../data/project-fallback.json';
import {
  CACHE_DURATION_MS,
  CACHE_KEY,
  filterAndSortProjects,
  loadGitHubData,
  mergeRepositories,
  readCache,
} from './projects';

const projects = mergeRepositories([]);

describe('source-backed repository data', () => {
  it('includes all six reviewed repositories in the offline catalog', () => {
    expect(projects.map((project) => project.name)).toEqual([
      'GTK-Bekhocha',
      'AquariumGTK',
      'GTKFinalVers',
      'TRackRS',
      'std-LIST-std-VECTOR',
      'List-Vector',
    ]);
  });

  it('merges API metadata without replacing reviewed descriptions', () => {
    const merged = mergeRepositories([
      {
        name: 'GTK-Bekhocha',
        html_url: 'https://github.com/Saad-programmer/GTK-Bekhocha',
        description: null,
        language: 'C',
        stargazers_count: 4,
        topics: ['gtk3'],
        updated_at: '2026-10-23T17:21:45Z',
      },
    ]);

    expect(merged[0]?.stars).toBe(4);
    expect(merged[0]?.apiTopics).toEqual(['gtk3']);
    expect(merged[0]?.description).toBe(fallbackProjects[0]?.description);
  });
});

describe('project filters and sorting', () => {
  it('filters by language, category, and search text', () => {
    expect(
      filterAndSortProjects(projects, {
        query: 'gtk',
        language: 'C',
        topic: 'GTK',
        sort: 'name',
      }).map((project) => project.name),
    ).toEqual(['AquariumGTK', 'GTK-Bekhocha', 'GTKFinalVers']);
  });

  it('sorts repositories by stars and most recently updated', () => {
    const withApiData = mergeRepositories([
      {
        name: 'List-Vector',
        html_url: 'https://github.com/Saad-programmer/List-Vector',
        description: null,
        language: 'C++',
        stargazers_count: 5,
        topics: [],
        updated_at: '2026-10-20T00:00:00Z',
      },
      {
        name: 'TRackRS',
        html_url: 'https://github.com/Saad-programmer/TRackRS',
        description: null,
        language: 'C++',
        stargazers_count: 9,
        topics: [],
        updated_at: '2026-10-24T00:00:00Z',
      },
    ]);
    const filters = { query: '', language: 'all', topic: 'all', sort: 'stars' as const };

    expect(filterAndSortProjects(withApiData, filters)[0]?.name).toBe('TRackRS');
    expect(filterAndSortProjects(withApiData, { ...filters, sort: 'updated' })[0]?.name).toBe(
      'TRackRS',
    );
  });
});

describe('hourly GitHub cache', () => {
  it('accepts an unexpired record and rejects stale data', () => {
    const now = 100_000;
    const value = JSON.stringify({
      savedAt: now - 10,
      repositories: [],
      profile: { followers: 2, public_repos: 6 },
    });
    const storage = { getItem: (key: string) => (key === CACHE_KEY ? value : null) };

    expect(readCache(storage, now)?.profile.followers).toBe(2);
    expect(readCache(storage, now + CACHE_DURATION_MS)).toBeNull();
  });

  it('ignores malformed or inaccessible storage values', () => {
    expect(readCache({ getItem: () => '{not json' })).toBeNull();
    expect(
      readCache({
        getItem: () => {
          throw new Error('storage disabled');
        },
      }),
    ).toBeNull();
  });

  it('uses the static six-project catalog when GitHub is unavailable', async () => {
    const storage = { getItem: () => null, setItem: () => undefined };
    const failingFetch = async () => {
      throw new Error('offline');
    };

    const result = await loadGitHubData(storage, failingFetch as typeof fetch, 1000);

    expect(result.source).toBe('fallback');
    expect(result.projects).toHaveLength(6);
    expect(result.followers).toBeNull();
  });
});
