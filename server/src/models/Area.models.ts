import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import Warehouse from "./Warehouse.model";

@Table({
    tableName: "Area",
})

class Area extends Model {
    // Id of the Area
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    declare Id: number;

    // Id of the Warehouse where the Area is located
    @ForeignKey(() => Warehouse)
    @Column({
        type: DataType.INTEGER
    })
    declare WarehouseId: number;
    @BelongsTo(() => Warehouse)
    declare WarehouseInfo: Warehouse;

    // Name of the Aree
    @Column({
        type: DataType.STRING
    })
    declare Name: string;

}

export default Area