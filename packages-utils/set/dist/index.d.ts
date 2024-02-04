declare global {
    interface Set<T> {
        isSuperset(subset: Set<T>): boolean;
        union(setB: Set<T>): Set<T>;
        intersection(setB: Set<T>): Set<T>;
        symmetricDifference(setB: Set<T>): Set<T>;
        difference(setB: Set<T>): Set<T>;
    }
    interface SetConstructor {
        unique<T>(array: T[]): T[];
    }
}
export {};
//# sourceMappingURL=index.d.ts.map