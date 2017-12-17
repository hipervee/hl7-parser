import { Field } from './../../decorators/field-decorator';
import { Segment } from "./segment";

export class PID extends Segment {
    @Field({ majorSequence: 1, minorSequence: 0, length: 4, description: '' })
    SetId: string;
    @Field({ majorSequence: 2, minorSequence: 0, length: 20, description: '' })
    ExternalPatientId: string;
    @Field({ majorSequence: 3, minorSequence: 0, length: 20, description: '' })
    InternalPatientId: string;
    @Field({ majorSequence: 4, minorSequence: 0, length: 20, description: '' })
    AlternatePatientId: string;
    @Field({ majorSequence: 5, minorSequence: 0, length: 20, description: '' })
    FamilyName: string;
    @Field({ majorSequence: 5, minorSequence: 1, length: 20, description: '' })
    GivenName: string;

    constructor() {
        super('PID');
    }
}