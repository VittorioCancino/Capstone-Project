import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, HasMany } from "sequelize-typescript"
import Product from "./Product.models";

@Table({
    tableName: "Type",
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
