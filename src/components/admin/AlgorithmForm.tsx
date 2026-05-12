"use client";
import { useState } from "react";
import { Algorithm } from "@/types/algorithm";
import { Category } from "@/types/category";
import { categories } from "@/data/categories";

type FormData = Omit<Algorithm, "id">;

interface AlgorithmFormProps {
  initial?: Partial<FormData>;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  submitLabel?: string;
}

function toSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function ArrayField({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const update = (i: number, val: string) => {
    const next = [...values];
    next[i] = val;
    onChange(next);
  };
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));
  const add = () => onChange([...values, ""]);

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {values.map((v, i) => (
          <div key={i} className="form-array-row">
            <input
              className="form-input"
              value={v}
              placeholder={placeholder}
              onChange={(e) => update(i, e.target.value)}
            />
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => remove(i)}
              aria-label="Remover"
            >
              ✕
            </button>
          </div>
        ))}
        <button type="button" className="btn btn-ghost btn-sm" onClick={add} style={{ alignSelf: "flex-start" }}>
          + Adicionar
        </button>
      </div>
    </div>
  );
}

export function AlgorithmForm({ initial, onSubmit, onCancel, submitLabel = "Salvar" }: AlgorithmFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [category, setCategory] = useState<Category>(initial?.category ?? "Search");
  const [shortDescription, setShortDescription] = useState(initial?.shortDescription ?? "");
  const [fullDescription, setFullDescription] = useState(initial?.fullDescription ?? "");
  const [complexity, setComplexity] = useState(initial?.complexity ?? "");
  const [applications, setApplications] = useState<string[]>(initial?.applications ?? [""]);
  const [characteristics, setCharacteristics] = useState<string[]>(initial?.characteristics ?? [""]);
  const [advantages, setAdvantages] = useState<string[]>(initial?.advantages ?? [""]);
  const [limitations, setLimitations] = useState<string[]>(initial?.limitations ?? [""]);
  const [tags, setTags] = useState<string[]>(initial?.tags ?? [""]);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!initial?.slug) setSlug(toSlug(val));
  };

  const clean = (arr: string[]) => arr.filter((v) => v.trim() !== "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      slug: slug || toSlug(name),
      category,
      shortDescription,
      fullDescription,
      complexity,
      applications: clean(applications),
      characteristics: clean(characteristics),
      advantages: clean(advantages),
      limitations: clean(limitations),
      tags: clean(tags),
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div className="card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <h2 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--text-soft)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Informações gerais
        </h2>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Nome *</label>
            <input
              className="form-input"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Ex: Grover's Algorithm"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Slug</label>
            <input
              className="form-input"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="grovers-algorithm"
            />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Categoria *</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Complexidade</label>
            <input
              className="form-input"
              value={complexity}
              onChange={(e) => setComplexity(e.target.value)}
              placeholder="Ex: O(√N)"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Descrição curta *</label>
          <input
            className="form-input"
            required
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Uma frase resumindo o algoritmo"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Descrição completa *</label>
          <textarea
            className="form-textarea"
            required
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
            placeholder="Explicação detalhada do algoritmo..."
          />
        </div>
      </div>

      <div className="card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <h2 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--text-soft)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Detalhes técnicos
        </h2>

        <ArrayField label="Aplicações" values={applications} onChange={setApplications} placeholder="Ex: Database search" />
        <ArrayField label="Características" values={characteristics} onChange={setCharacteristics} placeholder="Ex: Quadratic speedup" />
        <ArrayField label="Vantagens" values={advantages} onChange={setAdvantages} placeholder="Ex: Faster than classical..." />
        <ArrayField label="Limitações" values={limitations} onChange={setLimitations} placeholder="Ex: Requires quantum hardware" />
        <ArrayField label="Tags" values={tags} onChange={setTags} placeholder="Ex: search" />
      </div>

      <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
