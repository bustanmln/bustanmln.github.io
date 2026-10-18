export type PageId = 'home' | 'experience' | 'projects' | 'certificates';
export type ProjectFilter = 'all' | 'iot' | 'robotics';
export type ExperienceTrack = 'campus' | 'career';
export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';
export type ViewportTier = 'mobile' | 'tablet' | 'desktop' | 'ultrawide';

export interface ProjectItem {
  id: string;
  num: string;
  title: string;
  categoryTag: string;
  filterCategory: 'iot' | 'robotics';
  period: string;
  shortDesc: string;
  stack: string[];
}

export const VALID_PAGES: readonly PageId[] = ['home', 'experience', 'projects', 'certificates'];
export const VALID_THEMES: readonly ThemePreference[] = ['light', 'dark', 'system'];

export function resolvePageId(targetPage: string | null | undefined): PageId {
  if (!targetPage) return 'home';
  const cleaned = targetPage.trim().replace(/^#/, '').trim().toLowerCase();
  return (VALID_PAGES as readonly string[]).includes(cleaned) ? (cleaned as PageId) : 'home';
}

export function filterProjects<T extends { filterCategory: string }>(
  projects: readonly T[],
  filter: ProjectFilter
): T[] {
  if (filter === 'all') return [...projects];
  return projects.filter((p) => p.filterCategory === filter);
}

export function resolveSelectedProjectId<T extends { id: string; filterCategory: string }>(
  projects: readonly T[],
  filter: ProjectFilter,
  currentSelectedId: string
): string {
  const filtered = filterProjects(projects, filter);
  if (filtered.some((p) => p.id === currentSelectedId)) {
    return currentSelectedId;
  }
  return filtered[0]?.id ?? projects[0]?.id ?? '';
}

export function clampExperienceIndex(trackLength: number, requestedIndex: number): number {
  if (trackLength <= 0) return 0;
  if (requestedIndex < 0 || requestedIndex >= trackLength || Number.isNaN(requestedIndex)) {
    return 0;
  }
  return requestedIndex;
}

export function normalizeThemePreference(raw: string | null | undefined): ThemePreference {
  if (!raw) return 'system';
  const cleaned = raw.trim().toLowerCase();
  return (VALID_THEMES as readonly string[]).includes(cleaned)
    ? (cleaned as ThemePreference)
    : 'system';
}

export function resolveEffectiveTheme(
  preference: ThemePreference,
  systemPrefersDark: boolean
): ResolvedTheme {
  if (preference === 'dark') return 'dark';
  if (preference === 'light') return 'light';
  return systemPrefersDark ? 'dark' : 'light';
}

export function formatThemeStatusLabel(
  preference: ThemePreference,
  resolved: ResolvedTheme
): string {
  if (preference === 'system') {
    return `System (${resolved === 'dark' ? 'Dark' : 'Light'})`;
  }
  return preference === 'dark' ? 'Dark' : 'Light';
}

export function classifyViewportTier(widthPx: number): ViewportTier {
  if (widthPx < 768) return 'mobile';
  if (widthPx < 1024) return 'tablet';
  if (widthPx < 1920) return 'desktop';
  return 'ultrawide';
}

export function computeSchematicNodeCount(widthPx: number, heightPx: number): number {
  if (widthPx <= 0 || heightPx <= 0) return 0;
  const tier = classifyViewportTier(widthPx);
  if (tier === 'mobile') {
    return Math.min(Math.max(4, Math.floor((widthPx * heightPx) / 75000)), 8);
  }
  if (tier === 'tablet') {
    return Math.min(Math.max(6, Math.floor((widthPx * heightPx) / 65000)), 12);
  }
  return Math.min(Math.max(10, Math.floor((widthPx * heightPx) / 55000)), 22);
}
