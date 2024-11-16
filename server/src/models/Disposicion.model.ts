import { Table, Column, Model, ForeignKey, PrimaryKey, DataType, BelongsTo, AutoIncrement, Unique } from "sequelize-typescript";
import Area from "./Area.models";
import Producto from "./Product.models";

@Table({
    tableName: "Disposicion",
})
class Disposicion extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    declare Id: number;

    @ForeignKey(() => Producto)
    @Column({
        type: DataType.INTEGER,
    })
    declare ProductoId: number;

    @ForeignKey(() => Area)
    @Column({
        type: DataType.INTEGER,
    })
    declare AreaId: number;

    @Unique
    @Column({
        type: DataType.STRING,
    })
    declare UID: number;

    // Relationships
    @BelongsTo(() => Producto)
    declare Material: Producto;

    @BelongsTo(() => Area)
    declare Area: Area;
}

export default Disposicion;