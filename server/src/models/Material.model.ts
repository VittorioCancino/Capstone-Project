import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from "sequelize-typescript"

@Table({
    tableName: "Material",
    createdAt: false,
    updatedAt: false
})

class Material extends Model {
    // TODO Add Nature of the variables
    // Id of the Material
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    declare Id: number;


    // Name of the Material
    @Column({
        type: DataType.STRING
    })
    declare Name: string;

}

export default Material
