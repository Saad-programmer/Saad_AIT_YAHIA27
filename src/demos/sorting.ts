export type SortAlgorithm = 'bubble' | 'insertion' | 'merge';

export interface SortInfo {
  name: string;
  time: string;
  space: string;
  stable: string;
}

export const sortInfo: Record<SortAlgorithm, SortInfo> = {
  bubble: { name: 'Bubble sort', time: 'O(n²)', space: 'O(1)', stable: 'Stable' },
  insertion: { name: 'Insertion sort', time: 'O(n²) worst case', space: 'O(1)', stable: 'Stable' },
  merge: { name: 'Merge sort', time: 'O(n log n)', space: 'O(n)', stable: 'Stable' },
};

export function createSortFrames(values: number[], algorithm: SortAlgorithm): number[][] {
  const result = [...values];
  const frames = [[...result]];
  if (algorithm === 'bubble') {
    for (let end = result.length - 1; end > 0; end -= 1) {
      for (let index = 0; index < end; index += 1) {
        if (result[index]! > result[index + 1]!) {
          [result[index], result[index + 1]] = [result[index + 1]!, result[index]!];
          frames.push([...result]);
        }
      }
    }
    return frames;
  }

  if (algorithm === 'insertion') {
    for (let index = 1; index < result.length; index += 1) {
      const current = result[index]!;
      let cursor = index - 1;
      while (cursor >= 0 && result[cursor]! > current) {
        result[cursor + 1] = result[cursor]!;
        cursor -= 1;
        frames.push([...result]);
      }
      result[cursor + 1] = current;
      frames.push([...result]);
    }
    return frames;
  }

  for (let width = 1; width < result.length; width *= 2) {
    for (let start = 0; start < result.length; start += width * 2) {
      const left = result.slice(start, start + width);
      const right = result.slice(start + width, start + width * 2);
      const merged: number[] = [];
      while (left.length && right.length) merged.push(left[0]! <= right[0]! ? left.shift()! : right.shift()!);
      const chunk = [...merged, ...left, ...right];
      result.splice(start, chunk.length, ...chunk);
      frames.push([...result]);
    }
  }
  return frames;
}

export function sortValues(values: number[], algorithm: SortAlgorithm): number[] {
  if (algorithm === 'merge') {
    if (values.length < 2) return [...values];
    const middle = Math.floor(values.length / 2);
    const left = sortValues(values.slice(0, middle), 'merge');
    const right = sortValues(values.slice(middle), 'merge');
    const merged: number[] = [];
    while (left.length && right.length) merged.push(left[0]! <= right[0]! ? left.shift()! : right.shift()!);
    return [...merged, ...left, ...right];
  }

  const result = [...values];
  if (algorithm === 'bubble') {
    for (let end = result.length - 1; end > 0; end -= 1) {
      for (let index = 0; index < end; index += 1) {
        if (result[index]! > result[index + 1]!) {
          [result[index], result[index + 1]] = [result[index + 1]!, result[index]!];
        }
      }
    }
    return result;
  }

  for (let index = 1; index < result.length; index += 1) {
    const current = result[index]!;
    let cursor = index - 1;
    while (cursor >= 0 && result[cursor]! > current) {
      result[cursor + 1] = result[cursor]!;
      cursor -= 1;
    }
    result[cursor + 1] = current;
  }
  return result;
}

export function makeRandomValues(size: number, random: () => number = Math.random): number[] {
  const count = Math.max(4, Math.min(64, Math.floor(size)));
  return Array.from({ length: count }, () => Math.floor(random() * 100) + 1);
}