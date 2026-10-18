import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, cpSync, readFileSync, writeFileSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = join(root, 'plugins/freie-spielleitung-02');
const script = join(root, 'scripts/package_plugin.py');
const run = (...args) => spawnSync('python3', [script, ...args], { encoding: 'utf8' });

function fixture(fn) {
  const temp = mkdtempSync(join(tmpdir(), 'rpg-plugin-'));
  const copy = join(temp, 'freie-spielleitung-02');
  cpSync(source, copy, { recursive: true });
  try { fn(copy, temp); } finally { rmSync(temp, { recursive: true, force: true }); }
}

test('Pluginquelle lässt sich prüfen und reproduzierbar paketieren', () => fixture((copy, temp) => {
  const a = join(temp, 'a.zip'), b = join(temp, 'b.zip');
  assert.equal(run('--source', copy, '--check').status, 0);
  for (const output of [a, b]) assert.equal(run('--source', copy, '--output', output).status, 0);
  assert.deepEqual(readFileSync(a), readFileSync(b));
}));

test('Fehlende und aus dem Paket führende Regelreferenzen werden abgewiesen', () => fixture(copy => {
  const skill = join(copy, 'skills/freie-spielleitung/SKILL.md');
  const original = readFileSync(skill, 'utf8');
  for (const target of ['references/fehlt.md', '../fremde-regeln.md']) {
    writeFileSync(skill, original.replace('references/abenteuer-und-welt.md', target));
    const result = run('--source', copy, '--check');
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Referenz/);
  }
}));

test('Ungültige Metadaten werden vor einem Upload erkannt', () => fixture(copy => {
  const path = join(copy, 'plugin.json');
  const original = JSON.parse(readFileSync(path, 'utf8'));
  for (const change of [
    m => { m.extensions['com.openai'].interface.shortDescription = 'x'.repeat(31); },
    m => { m.name = 'anderes-plugin'; },
    m => { m.author.email = 'private@example.invalid'; },
    m => { m.version = 'morgen'; },
  ]) {
    const value = structuredClone(original);
    change(value);
    writeFileSync(path, JSON.stringify(value));
    assert.notEqual(run('--source', copy, '--check').status, 0);
  }
}));

test('Symlinks und ein Archiv im eigenen Quellordner werden abgewiesen', () => fixture((copy, temp) => {
  assert.notEqual(run('--source', copy, '--output', join(copy, 'plugin.zip')).status, 0);
  symlinkSync(join(temp, 'private.txt'), join(copy, 'private.txt'));
  assert.notEqual(run('--source', copy, '--check').status, 0);
}));
