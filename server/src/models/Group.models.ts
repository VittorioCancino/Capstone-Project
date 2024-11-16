import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, HasMany, CreatedAt } from "sequelize-typescript"

@Table({
    tableName: "Group"
})

class Group extends Model {
    // TODO Add Nature of the variables
    // Id of the Group
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    declare Id: number;

    // Name of the Group
    @Column({
        type: DataType.STRING
    })
    declare Name: string;

}

export default Group
