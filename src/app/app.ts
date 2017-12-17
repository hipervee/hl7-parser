import 'reflect-metadata';
import { Parser } from './hl7-parser/parser';
let sampleMessage = `MSH|^~\&|SENDING_APPLICATION|SENDING_FACILITY|RECEIVING_APPLICATION|RECEIVING_FACILITY|20110613072836||SIU^S14|24916579|P|2.3||||||
                    SCH|10345^10345|2196178^2196178|||10345|OFFICE^Office visit|reason for the appointment|OFFICE|60|m|^^60^20110617084500^20110617093000|||||9^DENT^ARTHUR^||||9^DENT^ARTHUR^|||||Scheduled
                    PID|1|X0BB67|42||BEEBLEBROX^ZAPHOD||19781012|M|||1 Heart of Gold ave^^Fort Wayne^IN^46804||(260)555-1234|||S||999999999|||||||||||||||||||||
                    PV1|1|O|||||1^Adams^Douglas^A^MD^^^^|2^Colfer^Eoin^D^MD^^^^||||||||||||||||||||||||||||||||||||||||||99158||
                    RGS|1|U
                    AIG|1|U|1^Adams, Douglas|D^^
                    AIL|1|U|OFFICE^^^OFFICE|^Main Office||20110614084500|||60|m^Minutes||Scheduled
                    AIP|1|U|1^Adams^Douglas^A^MD^^^^|D^Adams, Douglas||20110614084500|||60|m^Minutes||Scheduled`;
var parser = new Parser();
parser.Parse(sampleMessage);