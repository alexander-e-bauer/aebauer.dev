// Compatibility shim:
// Keep existing imports working (e.g. `import { fetchFullConversationBySid } from '@/api'`)
// while the real implementation lives in `src/api/*`.

export * from './api/index';
export { default } from './api/index';