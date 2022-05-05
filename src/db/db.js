import { Pool } from 'pg';

const connectionString = 'postgres://gdtiwcjl:vpD7PrBmK8HyzlZbdt8qKU4W9kjDAtba@motty.db.elephantsql.com/gdtiwcjl';

const db = new Pool({ connectionString });

export default db;