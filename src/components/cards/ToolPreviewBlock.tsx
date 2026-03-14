"use client";

import Image from "next/image";
import type { Tool, PreviewType } from "@/types";
import { FORMAT_LABELS } from "@/lib/constants";

interface ToolPreviewBlockProps {
  tool: Tool;
  className?: string;
}

function getPreviewSrc(tool: Tool): string {
  const p = tool.preview;
  return "src" in p ? p.src : p.before;
}

function CritiquePreview({ tool }: { tool: Tool }) {
  const raw = tool.outputExample ?? tool.content.prompt ?? "";
  const snippet = raw.length > 120 ? `${raw.slice(0, 120)}…` : raw || "Structured critique output";
  return (
    <div className="flex h-full flex-col justify-center gap-2 p-3">
      <div className="rounded bg-neutral-100 px-2 py-1.5 font-mono text-[10px] leading-relaxed text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
        {snippet}
      </div>
      <span className="text-[10px] text-neutral-500">Output: bullet points, recommendations</span>
    </div>
  );
}

function StructuredPreview({ tool }: { tool: Tool }) {
  const raw = tool.outputExample ?? tool.content.template ?? tool.content.prompt ?? "";
  const snippet = raw.length > 100 ? `${raw.slice(0, 100)}…` : raw || "Table / structured output";
  return (
    <div className="flex h-full flex-col justify-center gap-2 p-3">
      <div className="rounded border border-neutral-200 bg-white px-2 py-1.5 font-mono text-[10px] leading-relaxed text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400">
        {snippet}
      </div>
      <span className="text-[10px] text-neutral-500">Structured output</span>
    </div>
  );
}

function BeforeAfterPreview({ tool }: { tool: Tool }) {
  const p = tool.preview;
  if ("before" in p) {
    return (
      <div className="grid h-full grid-cols-2 gap-px bg-neutral-200 dark:bg-neutral-700">
        <div className="relative overflow-hidden bg-neutral-50 dark:bg-neutral-800">
          <Image src={p.before} alt="Before" fill className="object-cover" sizes="160px" />
          <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] text-white">Before</span>
        </div>
        <div className="relative overflow-hidden bg-neutral-50 dark:bg-neutral-800">
          <Image src={p.after} alt="After" fill className="object-cover" sizes="160px" />
          <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] text-white">After</span>
        </div>
      </div>
    );
  }
  return null;
}

function MiniWorkflowPreview({ tool }: { tool: Tool }) {
  const steps = tool.useCases?.slice(0, 3) ?? ["Step 1", "Step 2", "Step 3"];
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 p-3">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-[10px] font-medium text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400">
            {i + 1}
          </span>
          <span className="truncate text-xs text-neutral-600 dark:text-neutral-400">{s}</span>
        </div>
      ))}
    </div>
  );
}

function ImagePreview({ tool }: { tool: Tool }) {
  const src = getPreviewSrc(tool);
  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={tool.preview.alt ?? tool.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

function FallbackPreview({ tool }: { tool: Tool }) {
  const formatLabel = FORMAT_LABELS[tool.format];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-4">
      <span className="rounded-full bg-neutral-200 px-2.5 py-0.5 text-[10px] font-medium text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400">
        {formatLabel}
      </span>
      <p className="line-clamp-3 text-center text-xs text-neutral-500 dark:text-neutral-400">{tool.tagline}</p>
    </div>
  );
}

export function ToolPreviewBlock({ tool, className = "" }: ToolPreviewBlockProps) {
  const type: PreviewType = tool.previewType ?? "image";
  const hasRealImage = type === "image" || (type === "beforeAfter" && "before" in tool.preview);

  if (type === "critique") {
    return (
      <div className={`aspect-[4/3] overflow-hidden rounded-t-[var(--radius-lg)] bg-neutral-50 dark:bg-neutral-800/50 ${className}`}>
        <CritiquePreview tool={tool} />
      </div>
    );
  }
  if (type === "structured") {
    return (
      <div className={`aspect-[4/3] overflow-hidden rounded-t-[var(--radius-lg)] bg-white dark:bg-neutral-900/50 ${className}`}>
        <StructuredPreview tool={tool} />
      </div>
    );
  }
  if (type === "beforeAfter" && "before" in tool.preview) {
    return (
      <div className={`aspect-[4/3] overflow-hidden rounded-t-[var(--radius-lg)] ${className}`}>
        <BeforeAfterPreview tool={tool} />
      </div>
    );
  }
  if (type === "miniWorkflow") {
    return (
      <div className={`aspect-[4/3] overflow-hidden rounded-t-[var(--radius-lg)] bg-neutral-50 dark:bg-neutral-800/50 ${className}`}>
        <MiniWorkflowPreview tool={tool} />
      </div>
    );
  }
  if (hasRealImage) {
    return (
      <div className={`relative aspect-[4/3] overflow-hidden rounded-t-[var(--radius-lg)] bg-neutral-100 dark:bg-neutral-800 ${className}`}>
        <ImagePreview tool={tool} />
      </div>
    );
  }

  return (
    <div className={`aspect-[4/3] overflow-hidden rounded-t-[var(--radius-lg)] bg-neutral-100 dark:bg-neutral-800 ${className}`}>
      <FallbackPreview tool={tool} />
    </div>
  );
}
