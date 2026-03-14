export const GITHUB_REPO_URL = "https://github.com/vushnevskuu/ai-tools-library";
export const GITHUB_BLOB_URL = `${GITHUB_REPO_URL}/blob/main`;

export function getToolGitHubPath(slug: string): string {
  return `${GITHUB_BLOB_URL}/src/content/tools.ts`;
}

export function getWorkflowGitHubPath(slug: string): string {
  return `${GITHUB_BLOB_URL}/src/content/workflows.ts`;
}

export function getCollectionGitHubPath(slug: string): string {
  return `${GITHUB_BLOB_URL}/src/content/collections.ts`;
}
