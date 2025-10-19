export class FilterBuilder {
    private parts: string[] = [];

    addEquals(field: string, value: string | number | boolean) {
        this.addCondition(field, "eq", value);
        return this;
    }

    addNotEquals(field: string, value: string | number | boolean) {
        this.addCondition(field, "ne", value);
        return this;
    }

    addGreaterThan(field: string, value: number) {
        this.parts.push(`${field} gt ${value}`);
        return this;
    }

    addLessThan(field: string, value: number) {
        this.parts.push(`${field} lt ${value}`);
        return this;
    }

    addContains(field: string, value: string) {
        this.parts.push(`contains(${field}, '${value}')`);
        return this;
    }

    and() {
        if (this.parts.length > 0 && !this.isLastLogicalOperator()) this.parts.push("and");
        return this;
    }

    or() {
        if (this.parts.length > 0 && !this.isLastLogicalOperator()) this.parts.push("or");
        return this;
    }

    remove(field: string) {
        const pattern = new RegExp(`\\b${field}\\b`, "i");
        this.parts = this.parts.filter(p => !pattern.test(p) || p === "and" || p === "or");
        this.cleanup();
        return this;
    }

    clear() {
        this.parts = [];
        return this;
    }

    build() {
        return this.parts.join(" ");
    }

    private addCondition(field: string, operator: string, value: string | number | boolean) {
        if (typeof value === "string") {
            this.parts.push(`${field} ${operator} '${value}'`);
        } else {
            this.parts.push(`${field} ${operator} ${value}`);
        }
    }

    private isLastLogicalOperator() {
        const last = this.parts[this.parts.length - 1];
        return last === "and" || last === "or";
    }

    private cleanup() {
        this.parts = this.parts.filter((p, i, arr) => {
            if ((p === "and" || p === "or") && (i === 0 || i === arr.length - 1)) return false;
            if ((p === "and" || p === "or") && (arr[i - 1] === "and" || arr[i - 1] === "or")) return false;
            return true;
        });
    }
}
