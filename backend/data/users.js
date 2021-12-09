import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin user',
        email: 'admin@example.com',
        password: bcrypt.hashSync('1234567', 10),
        isAdmin: true,
    },

    {
        name: 'User 1',
        email: 'user1@example.com',
        password: bcrypt.hashSync('1234567', 10),
    },

    {
        name: 'User 2',
        email: 'user2n@example.com',
        password: bcrypt.hashSync('1234567', 10),
    },

];

export default users; 