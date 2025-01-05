import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PinCode } from "./PinCode";
import { UTSelection } from "./Selection";

  
@Entity()
export class VoteLog {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => PinCode)
    @JoinColumn({ name: "pinCodeId" })
    pinCode: PinCode;
  
    @ManyToOne(() => UTSelection)
    @JoinColumn({ name: "maleId" })
    maleSelection: UTSelection;
  
    @ManyToOne(() => UTSelection)
    @JoinColumn({ name: "femaleId" })
    femaleSelection: UTSelection;
  }
  