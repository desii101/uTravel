/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";
import { ZodError, ZodObject, type ZodRawShape } from "zod";

export type FormValidationError = { [x: string]: any };

export function ZodFlatMap(error: ZodError) {
    return error.issues.reduce((obj: any, issue) => {
        setErrorAtPath(obj, issue.path, issue.message);
        return obj;
    }, {});
};

export function validateSchemaField<T extends ZodRawShape>(
    schema: ZodObject<T>,
    fieldName: keyof T,
    value: any
): boolean {
    // Check if schema has the field
    if (!(fieldName in schema.shape))
        throw new Error(`Field "${String(fieldName)}" does not exist in the schema.`);

    let fieldSchema: any = z.object({}); // init with empty zodtype value
    fieldSchema = schema.shape[fieldName];

    // Check if valid 
    try {
        fieldSchema.parse(value);
        return true;
    } catch {
        return false;
    }
};

export function parseTime(time: string) {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return new Date(0, 0, 0, hours, minutes, seconds);
};

function setErrorAtPath(obj: any, keys: PropertyKey[], value: string | number) {
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]])
            current[keys[i]] = {};
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
}
