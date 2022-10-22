import 'dotenv/config';
import { dropDatabase } from 'typeorm-extension';
import { options } from './data-source';

(async () => {
    await dropDatabase({ options });
})();
