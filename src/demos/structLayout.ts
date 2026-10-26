export interface FieldType {
  name: string;
  size: number;
  alignment: number;
}

export interface StructField extends FieldType {
  id: number;
}

export interface FieldLayout extends StructField {
  offset: number;
  paddingBefore: number;
}

export interface StructLayout {
  fields: FieldLayout[];
  size: number;
  alignment: number;
  tailPadding: number;
}

export const FIELD_TYPES: FieldType[] = [
  { name: 'char', size: 1, alignment: 1 },
  { name: 'int32_t', size: 4, alignment: 4 },
  { name: 'double', size: 8, alignment: 8 },
  { name: 'char[3]', size: 3, alignment: 1 },
];

function alignUp(offset: number, alignment: number): number {
  return Math.ceil(offset / alignment) * alignment;
}

export function calculateStructLayout(fields: StructField[]): StructLayout {
  let offset = 0;
  let alignment = 1;
  const layout = fields.map((field) => {
    const alignedOffset = alignUp(offset, field.alignment);
    const paddingBefore = alignedOffset - offset;
    offset = alignedOffset + field.size;
    alignment = Math.max(alignment, field.alignment);
    return { ...field, offset: alignedOffset, paddingBefore };
  });
  const size = alignUp(offset, alignment);
  return { fields: layout, size, alignment, tailPadding: size - offset };
}