import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from "sequelize-typescript"

@Table({
    tableName: "Warehouse",
})

class Warehouse extends Model {
    // Id of the Warehouse
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    declare Id: number;

    // Name of the Warehouse
    @Column({
        type: DataType.STRING
    })
    declare Name: string;

    // Adress of the Warehouse
    @Column({
        type: DataType.STRING
    })
    declare Address: string;

    //  Manager of the Warehouse
    @Column({
        type: DataType.STRING
    })
    declare Manager: string;

    //  Phone of the Warehouse
    @Column({
        type: DataType.STRING
    })
    declare Phone: string;

    //  Contact Email
    @Column({
        type: DataType.STRING
    })
    declare Email: string;

    //  Schedule of the Warehouse
    @Column({
        type: DataType.STRING
    })
    declare Schedule: string;
}

export default Warehouse