// dependencies.ts
import type { NamePath } from '../utils/util';
import { keyOfName } from '../utils/util';

export class DepGraph {
  // dep -> set of dependents
  private graph = new Map<string, Set<string>>();

  addDependency(dep: NamePath, dependent: NamePath) {
    const d = keyOfName(dep);
    const p = keyOfName(dependent);
    let set = this.graph.get(d);
    if (!set) {
      set = new Set();
      this.graph.set(d, set);
    }
    set.add(p);
  }
  removeDependentEverywhere(dependent: NamePath) {
    const p = keyOfName(dependent);
    for (const [, set] of this.graph) set.delete(p);
  }
  getDependentsOf(name: NamePath): string[] {
    const d = keyOfName(name);
    return Array.from(this.graph.get(d) || []);
  }
}
