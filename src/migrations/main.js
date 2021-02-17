import migrate from './migrations';
import db from '../database/db';

async function runMigrate() {
  try {
    const result = await migrate(db);
    if (result) {
      console.log('migration successful');
    }
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

runMigrate();