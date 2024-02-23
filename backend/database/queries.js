import { db, User } from './model.js'

console.log(await User.findAll())

await db.close()