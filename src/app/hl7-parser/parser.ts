import { MSH } from './models/segments/msh';
import { HL7Message } from "./models/message";
import "reflect-metadata";
import { format } from 'url';
export class Parser {
    segmentIds: string[] = ['ABS', 'ACC', 'ADD', 'AFF', 'AIG', 'AIL', 'AIP', 'AIS', 'AL1', 'APR', 'ARQ', 'AUT', 'BLC', 'BLG', 'BPO', 'BPX', 'BTX', 'CDM', 'CER', 'CM0', 'CM1', 'CM2', 'CNS', 'CSP', 'CSR', 'CSS', 'ABS', 'ACC', 'ADD', 'AFF', 'AIG', 'AIL', 'AIP', 'AIS', 'AL1', 'APR', 'ABS', 'ACC', 'ADD', 'AFF', 'AIG', 'AIL', 'AIP', 'AIS', 'AL1', 'APR', 'ARQ', 'AUT', 'BLC', 'BLG', 'BPO', 'BPX', 'BTX', 'CDM', 'CER', 'CM0', 'CM1', 'CM2', 'CNS', 'CSP', 'CSR', 'CSS', 'CTD', 'CTI', 'DB1', 'DG1', 'DRG', 'DSC', 'DSP', 'ECD', 'ECR', 'EDU', 'EQL', 'EQP', 'EQU', 'ERQ', 'ERR', 'EVN', 'FAC', 'FT1', 'GOL', 'GP1', 'GP2', 'GT1', 'IAM', 'IIM', 'IN1', 'IN2', 'IN3', 'INV', 'IPC', 'ISD', 'LAN', 'LCC', 'LCH', 'LDP', 'LOC', 'LRL', 'MFA', 'MFE', 'MFI', 'MRG', 'MSA', 'NCK', 'NDS', 'NK1', 'NPU', 'NSC', 'NST', 'NTE', 'OBR', 'OBX', 'ODS', 'ODT', 'OM1', 'OM2', 'OM3', 'OM4', 'OM5', 'OM6', 'OM7', 'ORC', 'ORG', 'OVR', 'PCR', 'PD1', 'PDA', 'PDC', 'PEO', 'PES', 'PID', 'PR1', 'PRA', 'PRB', 'PRC', 'PRD', 'PSH', 'PTH', 'PV1', 'PV2', 'QAK', 'QID', 'QPD', 'QRD', 'QRF', 'QRI', 'RCP', 'RDF', 'RDT', 'RF1', 'RGS', 'RMI', 'ROL', 'RQ1', 'RQD', 'RXA', 'RXC', 'RXD', 'RXE', 'RXG', 'RXO', 'RXR', 'SAC', 'SCH', 'SFT', 'SID', 'SPM', 'SPR', 'STF', 'TCC', 'TCD', 'TQ1', 'TQ2', 'TXA', 'UB1', 'UB2', 'URD', 'URS', 'VAR'];
    rawMessage: string;
    rawSegments: string[] = [];
    message: HL7Message
    messageSegmentsMetadata: any = {};
    constructor() {
        this.rawMessage = '';
        this.message = new HL7Message();
    }
    Parse(message: string) {
        this.rawMessage = message;
        this.formatMessage();
        this.createRawSegments();

        this.messageSegmentsMetadata = Reflect.getMetadata('HL7Segments', HL7Message);
        this.parseSegments();
    }

    formatMessage() {
        if (this.rawMessage) {
            this.rawMessage = this.rawMessage.replace(/\n/g, '').replace(/\r/g, '');

            this.segmentIds.map(o => o + '|').forEach(segment => {
                this.rawMessage = this.rawMessage.replace(segment, '\r\n' + segment);
            });
        }
    }

    createRawSegments() {
        this.rawSegments = this.rawMessage.split('\r\n').filter(o => o);
    }

    print() {
        console.log(`Total Segments: ${this.rawSegments.length}`);
        this.rawSegments.map((o, i) => console.log(i, o));
    }

    parseSegments() {
        let messageMetadata = Object.keys(this.messageSegmentsMetadata).map(o => {
            this.messageSegmentsMetadata[o].customId = o;
            return this.messageSegmentsMetadata[o];
        });
        let parseableSegments = messageMetadata.map(o => o.id);
        this.rawSegments.forEach(segment => {
            let rawComponents = segment.split('|').map(o => o.split('^'));
            let segmentId = rawComponents[0][0];

            if (parseableSegments.indexOf(segmentId) > -1) {
                let messageSegment = messageMetadata.filter(o => o.id == segmentId)[0];
                let segmentMetadata = this.getSegmentMetadata(this.message[messageSegment.customId].constructor);
                let componentNames = Object.keys(segmentMetadata);
                let componentsMetadata = componentNames.map(o => {
                    let componentIndex = segmentMetadata[o].majorSequence;
                    let fieldIndex = segmentMetadata[o].minorSequence;
                    let noOfFieldsInComponent = componentNames.filter(m => segmentMetadata[m].majorSequence == componentIndex).length;
                    let t = { name: o, index: componentIndex, fieldIndex: fieldIndex, noOfFields: noOfFieldsInComponent };
                    return t;
                });
                componentsMetadata.forEach(component => {
                    let majorComponent = rawComponents[component.index];
                    if (majorComponent) {
                        if (component.noOfFields == 1) {
                            this.message[messageSegment.customId][component.name] = majorComponent.join('^');
                        } else {
                            this.message[messageSegment.customId][component.name] = majorComponent[component.fieldIndex];
                        }

                    }
                });
            }
        });
        console.log(this.message);
    }

    getSegmentMetadata(type) {
        let metadata = Reflect.getMetadata('HL7Fields', type);
        return metadata;
    }
};