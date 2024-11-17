import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import Group from "./Group.models"
import Material from "./Material.model";

@Table({
    tableName: "Product"
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
    declare MaterialInfo: Material;

    // Group of the Product
    @ForeignKey(() => Group)
    @Column({
        type: DataType.INTEGER
    })
    declare Group: number;
    @BelongsTo(() => Group)
    declare GroupInfo: Group;

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

    // Thickness of the Product
    @Column({
        type: DataType.INTEGER
    })
    declare Quantity: number;
}

export default Product