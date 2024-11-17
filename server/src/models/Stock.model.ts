import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import ProductArea from "./ProductArea.model";

@Table({
    tableName: "Stock",
})

class Stock extends Model {
    // Id of the Stock Units
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    declare Id: number;

    // Area and Product of the Stock
    @ForeignKey(() => ProductArea)
    @Column({
        type: DataType.INTEGER
    })
    declare ProductArea: number;
    @BelongsTo(() => ProductArea)
    declare DisposicionId: ProductArea;

    // Quantity of the stock
    @Column({
        type: DataType.INTEGER
    })
    declare Cantidad: string;

}

export default Stock