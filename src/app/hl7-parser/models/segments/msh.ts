import { Segment } from "./segment";

import { Field } from '../../decorators/field-decorator';
export class MSH extends Segment {
    constructor() {
        super('MSH');
    }
    @Field({ majorSequence: 1, minorSequence: 0, length: 3, description: 'Encoding Characters' })
    EncodingCharacters: string;
    @Field({ majorSequence: 2, minorSequence: 0, length: 3, description: 'Sending Application' })
    SendingApplication: string;
    @Field({ majorSequence: 3, minorSequence: 0, length: 3, description: 'Sending Facility' })
    SendingFacility: string;
    @Field({ majorSequence: 4, minorSequence: 0, length: 3, description: 'Receiving Application' })
    ReceivingApplication: string;
    @Field({ majorSequence: 5, minorSequence: 0, length: 3, description: 'Receiving Facility' })
    ReceivingFacility: string;
}