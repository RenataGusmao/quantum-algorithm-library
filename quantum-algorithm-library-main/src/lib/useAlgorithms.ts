"use client";
import { useState, useEffect } from "react";
import { Algorithm } from "@/types/algorithm";
import { algorithms as seedAlgorithms } from "@/data/algorithms";

const STORAGE_KEY = "admin_algorithms";

export function useAlgorithms() {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setAlgorithms(stored ? JSON.parse(stored) : seedAlgorithms);
    setLoaded(true);
  }, []);

  const save = (data: Algorithm[]) => {
    setAlgorithms(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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

  return { algorithms, loaded, addAlgorithm, updateAlgorithm, deleteAlgorithm };
}
