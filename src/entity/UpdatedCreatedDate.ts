import {UpdateDateColumn, CreateDateColumn} from "typeorm";


export class UpdatedCreatedDate {
    @UpdateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}