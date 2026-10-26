import fallbackProjects from '../data/project-fallback.json';

export const CACHE_KEY = 'systems-portfolio:github:v1';
export const CACHE_DURATION_MS = 60 * 60 * 1000;
const REPOSITORY_API = 'https://api.github.com/users/Saad-programmer/repos?per_page=100';
const PROFILE_API = 'https://api.github.com/users/Saad-programmer';

export interface ProjectDetails {
  problem: string;
  architecture: string[];
  features: string[];
  challenges: string[];
  learned: string[];
  technologies: string[];
  evidence: string[];
  screenshot: string;
}

export interface Project {
  name: string;
  language: string;
  description: string;
  details: ProjectDetails;
  categories: string[];
  suggestedDescription: string;
  suggestedTopics: string[];
  url: string;
  updatedAt: string;
  stars: number;
  apiTopics: string[];
}

type StaticProject = Omit<Project, 'url' | 'updatedAt' | 'stars' | 'apiTopics'>;

interface ApiRepository {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
}

interface ApiProfile {
  followers: number;
  public_repos: number;
}

interface CacheRecord {
  savedAt: number;
  repositories: ApiRepository[];
  profile: ApiProfile;
}

export interface GitHubData {
  projects: Project[];
  followers: number | null;
  publicRepos: number | null;
  source: 'cache' | 'live' | 'fallback';
}

export interface ProjectFilters {
  query: string;
  language: string;
  topic: string;
  sort: 'updated' | 'stars' | 'name';
}

const knownProjects = fallbackProjects as StaticProject[];
const knownNames = new Set(knownProjects.map((project) => project.name.toLowerCase()));

function normalizeRepository(apiRepository: ApiRepository): Project | null {
  const staticProject = knownProjects.find(
    (project) => project.name.toLowerCase() === apiRepository.name.toLowerCase(),
  );
  if (!staticProject) return null;

  return {
    ...staticProject,
    language: apiRepository.language ?? staticProject.language,
    url: apiRepository.html_url,
    updatedAt: apiRepository.updated_at,
    stars: apiRepository.stargazers_count,
    apiTopics: apiRepository.topics,
  };
}

export function mergeRepositories(repositories: ApiRepository[]): Project[] {
  const byName = new Map(
    repositories
      .filter((repository) => knownNames.has(repository.name.toLowerCase()))
      .map((repository) => [repository.name.toLowerCase(), repository]),
  );

  return knownProjects.map((project) => {
    const apiRepository = byName.get(project.name.toLowerCase());
    if (!apiRepository) {
      return {
        ...project,
        url: `https://github.com/Saad-programmer/${encodeURIComponent(project.name)}`,
        updatedAt: '',
        stars: 0,
        apiTopics: [],
      };
    }
    return normalizeRepository(apiRepository)!;
  });
}

export function filterAndSortProjects(projects: Project[], filters: ProjectFilters): Project[] {
  const query = filters.query.trim().toLowerCase();
  const filtered = projects.filter((project) => {
    const searchable = [
      project.name,
      project.language,
      project.description,
      ...project.categories,
      ...project.apiTopics,
      ...project.details.technologies,
    ]
      .join(' ')
      .toLowerCase();

    return (
      (!query || searchable.includes(query)) &&
      (filters.language === 'all' || project.language === filters.language) &&
      (filters.topic === 'all' ||
        project.categories.includes(filters.topic) ||
        project.apiTopics.includes(filters.topic))
    );
  });

  return filtered.sort((left, right) => {
    if (filters.sort === 'stars')
      return right.stars - left.stars || left.name.localeCompare(right.name);
    if (filters.sort === 'name') return left.name.localeCompare(right.name);
    return Date.parse(right.updatedAt || '1970-01-01') - Date.parse(left.updatedAt || '1970-01-01');
  });
}

export function readCache(storage: Pick<Storage, 'getItem'>, now = Date.now()): CacheRecord | null {
  try {
    const value = storage.getItem(CACHE_KEY);
    if (!value) return null;

    const cache = JSON.parse(value) as CacheRecord;
    if (
      typeof cache.savedAt !== 'number' ||
      now - cache.savedAt >= CACHE_DURATION_MS ||
      !Array.isArray(cache.repositories) ||
      typeof cache.profile?.followers !== 'number' ||
      typeof cache.profile?.public_repos !== 'number'
    ) {
      return null;
    }
    return cache;
  } catch {
    return null;
  }
}

function fallbackData(): GitHubData {
  return {
    projects: mergeRepositories([]),
    followers: null,
    publicRepos: null,
    source: 'fallback',
  };
}

function fromCache(cache: CacheRecord): GitHubData {
  return {
    projects: mergeRepositories(cache.repositories),
    followers: cache.profile.followers,
    publicRepos: cache.profile.public_repos,
    source: 'cache',
  };
}

export async function loadGitHubData(
  storage: Pick<Storage, 'getItem' | 'setItem'> = localStorage,
  fetcher: typeof fetch = fetch,
  now = Date.now(),
): Promise<GitHubData> {
  const cached = readCache(storage, now);
  if (cached) return fromCache(cached);

  try {
    const [repositoriesResponse, profileResponse] = await Promise.all([
      fetcher(REPOSITORY_API, { headers: { Accept: 'application/vnd.github+json' } }),
      fetcher(PROFILE_API, { headers: { Accept: 'application/vnd.github+json' } }),
    ]);
    if (!repositoriesResponse.ok || !profileResponse.ok) throw new Error('GitHub request failed');

    const repositories = (await repositoriesResponse.json()) as ApiRepository[];
    const profile = (await profileResponse.json()) as ApiProfile;
    const cache: CacheRecord = { savedAt: now, repositories, profile };
    try {
      storage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch {
      // Storage may be disabled; the live response is still usable for this page view.
    }

    return {
      projects: mergeRepositories(repositories),
      followers: profile.followers,
      publicRepos: profile.public_repos,
      source: 'live',
    };
  } catch {
    return fallbackData();
  }
}
