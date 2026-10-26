export interface MemoryStep {
  label: string;
  stack: string[];
  heap: string[];
  pointer: string;
}

export const memorySteps: MemoryStep[] = [
  {
    label: 'Before malloc: main owns x; no heap allocation exists.',
    stack: ['main()', 'int x = 7'],
    heap: [],
    pointer: 'ptr is not declared',
  },
  {
    label: 'malloc reserves heap memory and ptr stores its address.',
    stack: ['main()', 'int x = 7', 'int *ptr = 0x1000'],
    heap: ['0x1000: int value = 42'],
    pointer: 'ptr → 0x1000',
  },
  {
    label: 'free(ptr) releases the allocation; ptr still contains the old address.',
    stack: ['main()', 'int x = 7', 'int *ptr = 0x1000 (dangling)'],
    heap: [],
    pointer: 'ptr → 0x1000 (invalid, dangling)',
  },
];

export const leakExample = `int *values = malloc(8 * sizeof *values);
if (!values) return 1;
return 0; // TODO: free(values) before returning`;

export const danglingExample = `int *value = malloc(sizeof *value);
if (!value) return 1;
free(value);
printf("%d", *value); // use after free`;

export function getMemoryStep(index: number): MemoryStep {
  const boundedIndex = Math.max(0, Math.min(index, memorySteps.length - 1));
  return memorySteps[boundedIndex] ?? memorySteps[0]!;
}