import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import Disposicion from "./Disposicion.model";

@Table({
    tableName: "Existencias",
})

class Existencias extends Model {

    // TODO Add Nature of the variables
    // Id of the Material
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    declare Id: number;

    // Material of the Product
    @ForeignKey(() => Disposicion)
    @Column({
        type: DataType.INTEGER
    })
    declare Disposicion: number;
    @BelongsTo(() => Disposicion)
    declare DisposicionId: Disposicion;

    // Name of the Area
    @Column({
        type: DataType.INTEGER
    })
    declare Cantidad: string;

}

export default Existencias