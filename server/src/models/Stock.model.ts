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
    declare ProductAreaId: number;
    @BelongsTo(() => ProductArea)
    declare StockId: ProductArea;

    // Quantity of the stock
    @Column({
        type: DataType.INTEGER
    })
    declare Quantity: number;

}

export default Stock