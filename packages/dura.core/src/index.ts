import { enablePatches, setAutoFreeze } from 'immer';
import { getUntracked } from 'proxy-compare';

setAutoFreeze(false);
enablePatches();
export * from './configure';
export { getUntracked };
