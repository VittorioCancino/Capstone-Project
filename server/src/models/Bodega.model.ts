import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from "sequelize-typescript"

@Table({
    tableName: "Bodega",
})

class Bodega extends Model {

    // TODO Add Nature of the variables
    // Id of the Material
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    declare Id: number;

    // Name of the Bodega
    @Column({
        type: DataType.STRING
    })
    declare Name: string;

    // Name of the Direccion
    @Column({
        type: DataType.STRING
    })
    declare Direccion: string;

    // Name of the Encargado
    @Column({
        type: DataType.STRING
    })
    declare Encargado: string;

    // Name of the Telefono
    @Column({
        type: DataType.STRING
    })
    declare Telefono: string;

    // Name of the Email
    @Column({
        type: DataType.STRING
    })
    declare Email: string;

    // Name of the Horario
    @Column({
        type: DataType.STRING
    })
    declare Horario: string;
}

export default Bodega