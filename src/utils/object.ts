// taken from YagoLopez
// https://gist.github.com/YagoLopez
// https://gist.github.com/YagoLopez/1c2fe87d255fc64d5f1bf6a920b67484
export function findInObject<T>(obj: unknown, key: string): T[] {
    let objects: T[] = [];

    if (obj && typeof obj === 'object') {
        Object.entries(obj).forEach(([currentKey, value]) => {
            if (currentKey === key) {
                objects.push(value);
            } else if (typeof value === 'object') {
                objects.push(...findInObject(value, key) as T[]);
            }
        });
    }

    return objects;
}
