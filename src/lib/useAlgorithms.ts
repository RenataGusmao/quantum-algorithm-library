"use client";

import { useSyncExternalStore } from "react";
import { Algorithm } from "@/types/algorithm";
import { algorithms as seedAlgorithms } from "@/data/algorithms";

const STORAGE_KEY = "admin_algorithms";
const CHANGE_EVENT = "admin_algorithms_change";

let cachedStorageValue: string | null = null;
let cachedAlgorithms: Algorithm[] = seedAlgorithms;

function readAlgorithms(): Algorithm[] {
  if (typeof window === "undefined") {
    return seedAlgorithms;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    cachedStorageValue = null;
    cachedAlgorithms = seedAlgorithms;
    return seedAlgorithms;
  }

  if (stored === cachedStorageValue) {
    return cachedAlgorithms;
  }

  try {
    cachedStorageValue = stored;
    cachedAlgorithms = JSON.parse(stored) as Algorithm[];
    return cachedAlgorithms;
  } catch {
    cachedStorageValue = null;
    cachedAlgorithms = seedAlgorithms;
    return seedAlgorithms;
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
  };
}

function persistAlgorithms(data: Algorithm[]) {
  cachedAlgorithms = data;
  cachedStorageValue = JSON.stringify(data);
  window.localStorage.setItem(STORAGE_KEY, cachedStorageValue);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useAlgorithms() {
  const algorithms = useSyncExternalStore(
    subscribe,
    readAlgorithms,
    () => seedAlgorithms
  );

  const save = (data: Algorithm[]) => {
    persistAlgorithms(data);
  };

  const addAlgorithm = (algorithm: Omit<Algorithm, "id">) => {
    const newAlg: Algorithm = { ...algorithm, id: Date.now().toString() };
    save([...algorithms, newAlg]);
    return newAlg;
  };

  const updateAlgorithm = (id: string, data: Partial<Algorithm>) => {
    save(algorithms.map((a) => (a.id === id ? { ...a, ...data } : a)));
  };

  const deleteAlgorithm = (id: string) => {
    save(algorithms.filter((a) => a.id !== id));
  };

  return {
    algorithms,
    loaded: true,
    addAlgorithm,
    updateAlgorithm,
    deleteAlgorithm,
  };
}
