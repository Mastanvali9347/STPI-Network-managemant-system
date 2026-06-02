import { CustomNode } from './CustomNode';

/**
 * React Flow node type registry.
 * Keys must match nodeType values from topology data (internet, router, etc.).
 */
export const nodeTypes = {
  internet: CustomNode,
  router: CustomNode,
  switch: CustomNode,
  firewall: CustomNode,
  wifi: CustomNode,
  server: CustomNode,
};
