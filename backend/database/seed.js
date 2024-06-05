import { db, User } from './model.js'

await db.sync({ force: true })

let users = ["Pacha", "Kuzco", "Kronk", "Yzma", "Squirrel"]

for (const user of users) {
  await User.create({
    username: user.toLowerCase(),
    password: "test"
  })
}

await db.close()