export type ContainerKind = 'vector' | 'list';

export interface ContainerState {
  kind: ContainerKind;
  values: number[];
}

export function insertValue(state: ContainerState, index: number, value: number): ContainerState {
  const values = [...state.values];
  values.splice(Math.max(0, Math.min(index, values.length)), 0, value);
  return { ...state, values };
}

export function eraseValue(state: ContainerState, index: number): ContainerState {
  const values = [...state.values];
  if (index >= 0 && index < values.length) values.splice(index, 1);
  return { ...state, values };
}

export function resizeValues(state: ContainerState, size: number): ContainerState {
  const nextSize = Math.max(0, Math.min(16, Math.floor(size)));
  const values = state.values.slice(0, nextSize);
  while (values.length < nextSize) values.push(0);
  return { ...state, values };
}

export function getContainerDescription(kind: ContainerKind): string {
  return kind === 'vector'
    ? 'Contiguous elements; indexed access O(1). Middle insertion/erase shifts later elements O(n).'
    : 'Linked nodes; indexed access O(n). Insert/erase at a known iterator O(1), with pointer and allocation overhead.';
}