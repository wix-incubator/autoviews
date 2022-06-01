export function orderFields(source: string[], rules?: string[]): string[] {
    if (!rules || !rules.length) {
        return source;
    }
    const orderedByRules = rules.filter(rule => source.includes(rule));
    const orderedByDefault = source.filter(field => !rules.includes(field));
    return orderedByRules.concat(orderedByDefault);
}
