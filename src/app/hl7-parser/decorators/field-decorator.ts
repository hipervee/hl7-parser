import { FieldMetadata } from './field-metadata';
import "reflect-metadata";
const fieldMetadataKey = "HL7Fields";
export const Field = (options: FieldMetadata) => {
    return (target, property) => {
        var classConstructor = target.constructor;
        const metadata = Reflect.getMetadata(fieldMetadataKey, classConstructor) || {};
        metadata[property] = options;
        Reflect.defineMetadata(fieldMetadataKey, metadata, classConstructor);
    };
}
