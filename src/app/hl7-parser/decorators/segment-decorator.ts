import { SegmentMetadata } from './segment-metadata';
import "reflect-metadata";
const segmentMetadataKey = "HL7Segment";
export const HL7Segment = (options: SegmentMetadata) => {
    return (target, property) => {
        var classConstructor = target.constructor;
        const metadata = Reflect.getMetadata(segmentMetadataKey, classConstructor) || {};
        metadata[property] = options;
        Reflect.defineMetadata(segmentMetadataKey, metadata, classConstructor);
    };
}
