import bcrypt from 'bcryptjs'
const users = [
    {
        name: 'Admin',
        email: 'admin@surfShop.com',
        password: bcrypt.hashSync('123456Admin', 10),
        isAdmin: true
    },
    {
        name: 'David Lama',
        email: 'daviop1234la@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Rona Dana',
        email: 'ronadana1996@gmail.com',
        password: bcrypt.hashSync('456789', 10),
    },
]

export default users