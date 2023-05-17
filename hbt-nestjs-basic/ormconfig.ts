import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions"
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions"

const config: SqliteConnectionOptions = {
    type: 'sqlite',
    database: 'db',
    entities: ['dist/src/**/*.entity.js'],
    synchronize: true
}

export default config