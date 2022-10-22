import 'dotenv/config';
import { createDatabase } from 'typeorm-extension';
import { options } from './data-source';

// Create the database with specification of the DataSource options
(async () => {
    await createDatabase({ options });
})();
