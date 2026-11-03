'use client';

import { useCallback, useSyncExternalStore } from 'react';

const KEY = 'overbid.saved.v1';
const listeners = new Set<() => void>();
let memory: string[] = [];
let storageOk: boolean | null = null;
let cachedRaw: string | null = null;
let cachedIds: string[] = [];

function canUseStorage() {
  if (storageOk !== null) return storageOk;
  try {
    const probe = '__overbid_probe__';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    storageOk = true;
  } catch {
    storageOk = false;
  }
  return storageOk;
}

function read(): string[] {
  if (!canUseStorage()) return memory;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === cachedRaw) return cachedIds;
    cachedRaw = raw;
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cachedIds = Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string').slice(0, 200) : [];
  } catch {
    cachedIds = [];
  }
  return cachedIds;
}

function write(ids: string[]) {
  if (canUseStorage()) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(ids));
    } catch {
      storageOk = false;
      memory = ids;
    }
  } else {
    memory = ids;
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) cb();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', onStorage);
  };
}

const EMPTY: string[] = [];

/** Bookmarks saved on this device only (demo). Falls back to in-memory when storage is unavailable. */
export function useSavedListings() {
  const ids = useSyncExternalStore(subscribe, read, () => EMPTY);
  const toggle = useCallback((id: string) => {
    const current = read();
    write(current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  }, []);
  const persistent = typeof window === 'undefined' ? true : canUseStorage();
  return { ids, isSaved: (id: string) => ids.includes(id), toggle, persistent };
}
