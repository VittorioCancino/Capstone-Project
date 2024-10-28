import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, HasMany, CreatedAt } from "sequelize-typescript"
import Product from "./Product.models";

@Table({
    tableName: "Type",
    createdAt: false,
    updatedAt: false
})

class Type extends Model {
    // TODO Add Nature of the variables
    // Id of the Type
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    declare Id: number;

    // Name of the Type
    @Column({
        type: DataType.STRING
    })
    declare Name: string;

}

export default Type
