export function toStr(value: unknown): string | null {
    if (value == null) {
        return null;
    }

    if (typeof value === 'string') {
        const trimmed = value.trim();
        return trimmed.length === 0 ? null : trimmed;
    }

    if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
        if (value === false) return null;

        const str = String(value).trim();
        return str.length === 0 ? null : str;
    }

    if (typeof value === 'object') {
        if (hasCustomToString(value)) {
            try {
                const str = value.toString().trim();
                return str.length === 0 ? null : str;
            } catch {
                return null;
            }
        }

        if ('value' in value && typeof value === 'object') {
            const str = String((value as { value: unknown }).value).trim();
            return str.length === 0 ? null : str;
        }
    }

    return null;
}

export function toInt(value: unknown): number | null {
    if (typeof value === 'number' && Number.isInteger(value)) {
        return value;
    }

    const str = toStr(value);

    if (str !== null && !isNaN(Number(str)) && str.trim() !== '') {
        return parseInt(str, 10);
    }

    return null;
}

// Funciones auxiliares
function hasCustomToString(obj: object): obj is { toString(): string } {
    return (
        'toString' in obj &&
        typeof obj.toString === 'function' &&
        obj.toString !== Object.prototype.toString
    );
}
