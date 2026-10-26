import { describe, expect, it } from 'vitest';
import { eraseValue, insertValue, resizeValues } from './containers';
import { getMemoryStep, memorySteps } from './heap';
import { calculateStructLayout, FIELD_TYPES, type StructField } from './structLayout';
import { makeRandomValues, sortInfo, sortValues, type SortAlgorithm } from './sorting';

describe('stack and heap model', () => {
  it('shows an allocated address and a dangling pointer after free', () => {
    expect(memorySteps[1]?.pointer).toContain('0x1000');
    expect(getMemoryStep(2).pointer).toContain('dangling');
    expect(getMemoryStep(100)).toEqual(memorySteps[2]);
    expect(getMemoryStep(-1)).toEqual(memorySteps[0]);
  });
});

describe('vector/list visualizer operations', () => {
  it('inserts, erases, and resizes without mutating the original state', () => {
    const original = { kind: 'vector' as const, values: [4, 8, 12] };
    const inserted = insertValue(original, 1, 6);

    expect(inserted.values).toEqual([4, 6, 8, 12]);
    expect(eraseValue(inserted, 2).values).toEqual([4, 6, 12]);
    expect(resizeValues(original, 5).values).toEqual([4, 8, 12, 0, 0]);
    expect(original.values).toEqual([4, 8, 12]);
  });
});

describe('sorting visualizer algorithms', () => {
  it.each<SortAlgorithm>(['bubble', 'insertion', 'merge'])(
    'sorts with %s and preserves the input array',
    (algorithm) => {
      const values = [9, 1, 6, 3, 3, 0];
      expect(sortValues(values, algorithm)).toEqual([0, 1, 3, 3, 6, 9]);
      expect(values).toEqual([9, 1, 6, 3, 3, 0]);
      expect(sortInfo[algorithm].time).toBeTruthy();
    },
  );

  it('creates a bounded demo array', () => {
    expect(makeRandomValues(8, () => 0.5)).toEqual(Array(8).fill(51));
    expect(makeRandomValues(100, () => 0)).toHaveLength(64);
  });
});

describe('C struct layout calculator', () => {
  it('aligns fields and includes internal and tail padding', () => {
    const fields: StructField[] = [
      { ...FIELD_TYPES[0]!, id: 1 },
      { ...FIELD_TYPES[2]!, id: 2 },
      { ...FIELD_TYPES[3]!, id: 3 },
      { ...FIELD_TYPES[1]!, id: 4 },
    ];
    const result = calculateStructLayout(fields);

    expect(result.fields.map((field) => [field.offset, field.paddingBefore])).toEqual([
      [0, 0],
      [8, 7],
      [16, 0],
      [20, 1],
    ]);
    expect(result.alignment).toBe(8);
    expect(result.size).toBe(24);
    expect(result.tailPadding).toBe(0);
  });

  it('aligns the total struct size to its largest field alignment', () => {
    const result = calculateStructLayout([
      { ...FIELD_TYPES[1]!, id: 1 },
      { ...FIELD_TYPES[0]!, id: 2 },
    ]);
    expect(result.fields[1]?.offset).toBe(4);
    expect(result.tailPadding).toBe(3);
    expect(result.size).toBe(8);
  });
});