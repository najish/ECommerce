'use strict'
const bcrypt = require('bcryptjs')

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: await bcrypt.hash('alice123', 10),
        role: 'user',
        imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
        googleId: null,
      },
      {
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        password: await bcrypt.hash('bob123', 10),
        role: 'admin',
        imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
        googleId: null,
      },
      {
        name: 'Charlie Brown',
        email: 'charlie.brown@gmail.com',
        password: null,
        role: 'user',
        imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
        googleId: 'google-charlie-123',
      },
      {
        name: 'Diana Prince',
        email: 'diana.prince@gmail.com',
        password: null,
        role: 'user',
        imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
        googleId: 'google-diana-456',
      },
      {
        name: 'Ethan Hunt',
        email: 'ethan.hunt@example.com',
        password: await bcrypt.hash('mission123', 10),
        role: 'user',
        imageUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
        googleId: null,
      },
      {
        name: 'Fiona Gallagher',
        email: 'fiona.gallagher@example.com',
        password: await bcrypt.hash('fiona123', 10),
        role: 'user',
        imageUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
        googleId: null,
      },
      {
        name: 'George Lopez',
        email: 'george.lopez@gmail.com',
        password: null,
        role: 'user',
        imageUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
        googleId: 'google-george-001',
      },
      {
        name: 'Hannah Baker',
        email: 'hannah.baker@example.com',
        password: await bcrypt.hash('hannah321', 10),
        role: 'user',
        imageUrl: 'https://randomuser.me/api/portraits/women/8.jpg',
        googleId: null,
      },
      {
        name: 'Ian Somerhalder',
        email: 'ian.somerhalder@example.com',
        password: await bcrypt.hash('ian123', 10),
        role: 'user',
        imageUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
        googleId: null,
      },
      {
        name: 'Jenna Marbles',
        email: 'jenna.marbles@gmail.com',
        password: null,
        role: 'user',
        imageUrl: 'https://randomuser.me/api/portraits/women/10.jpg',
        googleId: 'google-jenna-998',
      },
      {
        name: 'Kevin Hart',
        email: 'kevin.hart@example.com',
        password: await bcrypt.hash('kevin321', 10),
        role: 'user',
        imageUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
        googleId: null,
      },
      {
        name: 'Laura Palmer',
        email: 'laura.palmer@example.com',
        password: await bcrypt.hash('laura123', 10),
        role: 'user',
        imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
        googleId: null,
      },
      {
        name: 'Michael Scott',
        email: 'michael.scott@example.com',
        password: await bcrypt.hash('dundermifflin', 10),
        role: 'admin',
        imageUrl: 'https://randomuser.me/api/portraits/men/13.jpg',
        googleId: null,
      },
      {
        name: 'Nina Dobrev',
        email: 'nina.dobrev@gmail.com',
        password: null,
        role: 'user',
        imageUrl: 'https://randomuser.me/api/portraits/women/14.jpg',
        googleId: 'google-nina-789',
      },
      {
        name: 'Oscar Isaac',
        email: 'oscar.isaac@example.com',
        password: await bcrypt.hash('oscar123', 10),
        role: 'user',
        imageUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
        googleId: null,
      },
      {
        name: 'Paula Abdul',
        email: 'paula.abdul@example.com',
        password: await bcrypt.hash('paula456', 10),
        role: 'user',
        imageUrl: 'https://randomuser.me/api/portraits/women/16.jpg',
        googleId: null,
      },
      {
        name: 'Quentin Tarantino',
        email: 'quentin.tarantino@example.com',
        password: await bcrypt.hash('killbill', 10),
        role: 'user',
        imageUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
        googleId: null,
      },
      {
        name: 'Rachel Green',
        email: 'rachel.green@example.com',
        password: await bcrypt.hash('rossgeller', 10),
        role: 'user',
        imageUrl: 'https://randomuser.me/api/portraits/women/18.jpg',
        googleId: null,
      },
      {
        name: 'Steve Rogers',
        email: 'steve.rogers@gmail.com',
        password: null,
        role: 'user',
        imageUrl: 'https://randomuser.me/api/portraits/men/19.jpg',
        googleId: 'google-cap-123',
      },
      {
        name: 'Zafer Eqbal',
        email: 'najish.eqbal@gmail.com',
        password: await bcrypt.hash('Zafer1998@', 10),
        role: 'user',
        imageUrl: 'https://randomuser.me/api/portraits/women/20.jpg',
        googleId: null,
      },
    ]

    const timestampedUsers = users.map(user => ({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    await queryInterface.bulkInsert('users', timestampedUsers, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  },
}
