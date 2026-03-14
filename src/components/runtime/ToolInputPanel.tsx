"use client";

import type { InputSchema, InputFieldSchema } from "@/types/runtime";

interface ToolInputPanelProps {
  schema: InputSchema;
  inputs: Record<string, string | number>;
  onChange: (key: string, value: string | number) => void;
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: InputFieldSchema;
  value: string | number;
  onChange: (v: string | number) => void;
}) {
  const v = value ?? field.default ?? "";

  if (field.type === "textarea" || field.type === "multiline") {
    return (
      <textarea
        value={String(v)}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        rows={field.rows ?? 4}
        className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm dark:bg-neutral-900"
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        value={String(v)}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm dark:bg-neutral-900"
      >
        {field.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "color") {
    return (
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={String(v).startsWith("#") ? String(v) : "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-14 cursor-pointer rounded border border-[var(--color-border)]"
        />
        <input
          type="text"
          value={String(v)}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm dark:bg-neutral-900"
        />
      </div>
    );
  }

  return (
    <input
      type={field.type === "number" ? "number" : "text"}
      value={String(v)}
      onChange={(e) =>
        onChange(field.type === "number" ? Number(e.target.value) || 0 : e.target.value)
      }
      placeholder={field.placeholder}
      className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm dark:bg-neutral-900"
    />
  );
}

export function ToolInputPanel({ schema, inputs, onChange }: ToolInputPanelProps) {
  return (
    <aside className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 dark:bg-[var(--color-surface-elevated)]">
      <h3 className="mb-4 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        Inputs
      </h3>
      <div className="space-y-4">
        {schema.fields.map((field) => (
          <div key={field.key}>
            <label className="mb-1.5 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {field.label}
              {field.required && " *"}
            </label>
            <FieldInput
              field={field}
              value={inputs[field.key]}
              onChange={(v) => onChange(field.key, v)}
            />
          </div>
        ))}
      </div>
    </aside>
  );
}
