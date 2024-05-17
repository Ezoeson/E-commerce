import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('0401hasina', 10),
    isAdmin: true,
  },
  {
    name: 'Hasina zoe',
    email: 'hasina@email.com',
    password: bcrypt.hashSync('0401hasina', 10),
    isAdmin: false,
  },
  {
    name: 'James Brown',
    email: 'james@email.com',
    password: bcrypt.hashSync('0401hasina', 10),
    isAdmin: false,
  },
];
export default users;
