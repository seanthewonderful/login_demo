import { db, User } from './model.js'
import bcryptjs from 'bcryptjs'

await db.sync({ force: true })

let users = ["Pacha", "Kuzco", "Kronk", "Yzma", "Squirrel"]

const hashedPassword = bcryptjs.hashSync("test", bcryptjs.genSaltSync(10))

for (const user of users) {
  await User.create({
    username: user.toLowerCase(),
    password: hashedPassword
  })
}

await db.close()