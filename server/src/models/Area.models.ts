import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import Bodega from "./Bodega.model";

@Table({
    tableName: "Area",
})

class Area extends Model {

    // TODO Add Nature of the variables
    // Id of the Material
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    declare Id: number;

    // Material of the Product
    @ForeignKey(() => Bodega)
    @Column({
        type: DataType.INTEGER
    })
    declare Bodega: number;
    @BelongsTo(() => Bodega)
    declare BodegaId: Bodega;

    // Name of the Area
    @Column({
        type: DataType.STRING
    })
    declare Name: string;

}

export default Area