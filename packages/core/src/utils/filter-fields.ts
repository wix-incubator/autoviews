export function filterFields(
    fields: string[],
    toPick?: string[],
    toOmit?: string[]
): string[] {
    if (toPick) {
        return fields.filter(prop => toPick.includes(prop));
    }

    if (toOmit) {
        return fields.filter(prop => !toOmit.includes(prop));
    }

    return fields;
}
