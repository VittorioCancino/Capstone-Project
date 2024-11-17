import { Table, Column, Model, ForeignKey, PrimaryKey, DataType, BelongsTo, AutoIncrement, Unique } from "sequelize-typescript";
import Area from "./Area.models";
import Product from "./Product.models";

@Table({
    tableName: "ProductArea",
})
class ProductArea extends Model {
    // Id of the ProductArea
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    declare Id: number;

    // Id of the Product inside the Area
    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
    })
    declare ProductoId: number;

    // Id of the Area where the Product is located
    @ForeignKey(() => Area)
    @Column({
        type: DataType.INTEGER,
    })
    declare AreaId: number;

    // Unique identifier (Sequelize does not support composite Primary Keys)
    @Unique
    @Column({
        type: DataType.STRING,
    })
    declare UID: number;

    // Relationships
    @BelongsTo(() => Product)
    declare Product: Product;

    @BelongsTo(() => Area)
    declare Area: Area;
}

export default ProductArea;