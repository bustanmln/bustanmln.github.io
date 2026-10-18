import test from 'node:test';
import assert from 'node:assert/strict';
import {
  resolvePageId,
  filterProjects,
  resolveSelectedProjectId,
  clampExperienceIndex,
  normalizeThemePreference,
  resolveEffectiveTheme,
  formatThemeStatusLabel,
  classifyViewportTier,
  computeSchematicNodeCount,
} from './portfolioLogic.ts';

const SAMPLE_PROJECTS = [
  { id: 'sipesat', filterCategory: 'iot' },
  { id: 'iot-power', filterCategory: 'iot' },
  { id: 'sumo-robot', filterCategory: 'robotics' },
  { id: 'agv-blindspot', filterCategory: 'robotics' },
] as const;

test('resolvePageId normalizes hashes and defaults unknown routes to home', () => {
  assert.equal(resolvePageId('home'), 'home');
  assert.equal(resolvePageId('#experience'), 'experience');
  assert.equal(resolvePageId('  #PROJECTS  '), 'projects');
  assert.equal(resolvePageId('certificates'), 'certificates');
  assert.equal(resolvePageId('unknown-section'), 'home');
  assert.equal(resolvePageId(''), 'home');
  assert.equal(resolvePageId(null), 'home');
});

test('filterProjects returns all items for "all" and matching category subset otherwise', () => {
  assert.equal(filterProjects(SAMPLE_PROJECTS, 'all').length, 4);
  assert.deepEqual(
    filterProjects(SAMPLE_PROJECTS, 'iot').map((p) => p.id),
    ['sipesat', 'iot-power']
  );
  assert.deepEqual(
    filterProjects(SAMPLE_PROJECTS, 'robotics').map((p) => p.id),
    ['sumo-robot', 'agv-blindspot']
  );
});

test('resolveSelectedProjectId preserves valid selection or falls back to first filtered item', () => {
  assert.equal(resolveSelectedProjectId(SAMPLE_PROJECTS, 'all', 'sumo-robot'), 'sumo-robot');
  assert.equal(resolveSelectedProjectId(SAMPLE_PROJECTS, 'iot', 'sumo-robot'), 'sipesat');
  assert.equal(resolveSelectedProjectId(SAMPLE_PROJECTS, 'robotics', 'agv-blindspot'), 'agv-blindspot');
  assert.equal(resolveSelectedProjectId(SAMPLE_PROJECTS, 'robotics', 'iot-power'), 'sumo-robot');
});

test('clampExperienceIndex resets out-of-range indices when switching tracks', () => {
  assert.equal(clampExperienceIndex(4, 2), 2);
  assert.equal(clampExperienceIndex(1, 3), 0);
  assert.equal(clampExperienceIndex(4, -1), 0);
  assert.equal(clampExperienceIndex(0, 0), 0);
});

test('normalizeThemePreference defaults invalid values to system and preserves valid modes', () => {
  assert.equal(normalizeThemePreference('light'), 'light');
  assert.equal(normalizeThemePreference('  DARK '), 'dark');
  assert.equal(normalizeThemePreference('system'), 'system');
  assert.equal(normalizeThemePreference('invalid'), 'system');
  assert.equal(normalizeThemePreference(null), 'system');
  assert.equal(normalizeThemePreference(undefined), 'system');
});

test('resolveEffectiveTheme resolves explicit modes and follows OS preference in system mode', () => {
  assert.equal(resolveEffectiveTheme('light', true), 'light');
  assert.equal(resolveEffectiveTheme('light', false), 'light');
  assert.equal(resolveEffectiveTheme('dark', false), 'dark');
  assert.equal(resolveEffectiveTheme('dark', true), 'dark');
  assert.equal(resolveEffectiveTheme('system', true), 'dark');
  assert.equal(resolveEffectiveTheme('system', false), 'light');
});

test('formatThemeStatusLabel distinguishes system mode from explicit light or dark selection', () => {
  assert.equal(formatThemeStatusLabel('light', 'light'), 'Light');
  assert.equal(formatThemeStatusLabel('dark', 'dark'), 'Dark');
  assert.equal(formatThemeStatusLabel('system', 'dark'), 'System (Dark)');
  assert.equal(formatThemeStatusLabel('system', 'light'), 'System (Light)');
});

test('classifyViewportTier categorizes mobile, tablet, desktop, and ultrawide widths accurately', () => {
  assert.equal(classifyViewportTier(320), 'mobile');
  assert.equal(classifyViewportTier(430), 'mobile');
  assert.equal(classifyViewportTier(768), 'tablet');
  assert.equal(classifyViewportTier(1024), 'desktop');
  assert.equal(classifyViewportTier(1440), 'desktop');
  assert.equal(classifyViewportTier(1920), 'ultrawide');
  assert.equal(classifyViewportTier(2560), 'ultrawide');
});

test('computeSchematicNodeCount reduces decorative background load on mobile and scales on desktop', () => {
  const mobileCount = computeSchematicNodeCount(360, 800);
  const desktopCount = computeSchematicNodeCount(1920, 1080);
  assert.ok(mobileCount <= 8, 'Mobile node count should be capped for performance');
  assert.ok(desktopCount > mobileCount, 'Desktop should allow more schematic nodes than mobile');
  assert.ok(desktopCount <= 22, 'Ultrawide node count should be capped reasonably');
});
