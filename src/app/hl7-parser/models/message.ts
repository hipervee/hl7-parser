import { HL7Segment } from './../decorators/segment-decorator';
import { MSH } from './segments/msh';
import { PID } from './segments/pid';

export class HL7Message {
    @HL7Segment({ id: 'MSH', multiple: false })
    Header: MSH;
    @HL7Segment({ id: 'PID', multiple: false })
    PatientIdentification: PID;

    constructor() {
        this.Header = new MSH();
        this.PatientIdentification = new PID();
    }
}