import { HL7Segment } from './../decorators/segment-decorator';
import { MSH } from './segments/msh';
import { PID } from './segments/pid';

export class HL7Message {
    @HL7Segment({ id: 'MSH', multiple: false })
    MSH: MSH;
    @HL7Segment({ id: 'PID', multiple: false })
    PID: PID;

    constructor() {
        this.MSH = new MSH();
        this.PID = new PID();
    }
}