import { db, User } from './model.js'

await db.sync({ force: true })

let users = ["Cat", "Ty", "Lincoln", "Jesse", "Josh", "Jackson", "Michael", "David"]

for (const user of users) {
  await User.create({
    username: user.toLowerCase(),
    password: "test"
  })
}

await db.close()