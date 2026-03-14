import type { Tool, Workflow, Collection } from "@/types";
import { tools } from "@/content/tools";
import { workflows } from "@/content/workflows";
import { collections } from "@/content/collections";
import { VISIBLE_FIELDS } from "@/config/homepage";

const VISIBLE_SET = new Set<string>(VISIBLE_FIELDS);

export function getAllTools(): Tool[] {
  return tools;
}

export function getVisibleTools(): Tool[] {
  return tools.filter((t) => VISIBLE_SET.has(t.field));
}

export function getVisibleCollections(): Collection[] {
  return collections.filter((c) => c.field && VISIBLE_SET.has(c.field));
}

export function getVisibleWorkflows(): Workflow[] {
  return workflows.filter((w) => VISIBLE_SET.has(w.field));
}

export function isToolVisible(slug: string): boolean {
  const tool = getToolBySlug(slug);
  return !!tool && VISIBLE_SET.has(tool.field);
}

export function isCollectionVisible(slug: string): boolean {
  const collection = getCollectionBySlug(slug);
  return !!collection && !!collection.field && VISIBLE_SET.has(collection.field);
}

export function isWorkflowVisible(slug: string): boolean {
  const workflow = getWorkflowBySlug(slug);
  return !!workflow && VISIBLE_SET.has(workflow.field);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByField(field: string): Tool[] {
  return tools.filter((t) => t.field === field);
}

export function getToolsByTask(task: string): Tool[] {
  return tools.filter((t) => t.tasks.includes(task as Tool["tasks"][number]));
}

export function getToolsBySearch(query: string): Tool[] {
  const q = query.toLowerCase();
  return tools.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.tagline.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.useCases.some((u) => u.toLowerCase().includes(q))
  );
}

export function getFilteredTools(filters: {
  field?: string;
  task?: string;
  format?: string;
  search?: string;
}): Tool[] {
  let result = tools;

  if (filters.field) {
    result = result.filter((t) => t.field === filters.field);
  }
  if (filters.task) {
    result = result.filter((t) => t.tasks.includes(filters.task as Tool["tasks"][0]));
  }
  if (filters.format) {
    result = result.filter((t) => t.format === filters.format);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.useCases.some((u) => u.toLowerCase().includes(q))
    );
  }

  return result;
}

export function getAllWorkflows(): Workflow[] {
  return workflows;
}

export function getWorkflowBySlug(slug: string): Workflow | undefined {
  return workflows.find((w) => w.slug === slug);
}

export function getAllCollections(): Collection[] {
  return collections;
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getToolsBySlugs(slugs: string[]): Tool[] {
  return slugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is Tool => t !== undefined);
}

export function getWorkflowsBySlugs(slugs: string[]): Workflow[] {
  return slugs
    .map((slug) => getWorkflowBySlug(slug))
    .filter((w): w is Workflow => w !== undefined);
}

export function getUniqueTestedWith(): string[] {
  const set = new Set<string>();
  tools.forEach((t) => {
    t.testedWith?.forEach((v) => set.add(v));
  });
  return Array.from(set).sort();
}
