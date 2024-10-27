import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import Type from "./Type.models"
import Material from "./Material.model";

@Table({
    tableName: "Product",
})

class Product extends Model {
    // TODO Add Nature of the variables
    // Id of the Product
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    declare Id: number;

    // Material of the Product
    @ForeignKey(() => Material)
    @Column({
        type: DataType.INTEGER
    })
    declare Material: number;
    @BelongsTo(() => Material)
    declare MaterialFK: Material;

    // Type of the Product
    @ForeignKey(() => Type)
    @Column({
        type: DataType.INTEGER
    })
    declare Type: number;
    @BelongsTo(() => Type)
    declare TypeFK: Type;

    // Large of the Product
    @Column({
        type: DataType.INTEGER
    })
    declare Large: number;

    // Width of the Product
    @Column({
        type: DataType.INTEGER
    })
    declare Width: number;

    // Thickness of the Product
    @Column({
        type: DataType.INTEGER
    })
    declare Thickness: number;
}

export default Product