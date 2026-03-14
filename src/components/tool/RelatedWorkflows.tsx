import type { Workflow } from "@/types";
import { WorkflowCard } from "@/components/cards/WorkflowCard";

interface RelatedWorkflowsProps {
  workflows: Workflow[];
}

export function RelatedWorkflows({ workflows }: RelatedWorkflowsProps) {
  if (workflows.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Related workflows
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {workflows.map((workflow) => (
          <WorkflowCard key={workflow.slug} workflow={workflow} />
        ))}
      </div>
    </section>
  );
}
