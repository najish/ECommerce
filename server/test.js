const db = require('./models');
const { User } = db;

async function test() {
    try {
        const user = await User.create({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password123'
        });
        console.log('User created:', user.toJSON());
    } catch (error) {
        console.error('Test error:', error);
    }
}
const another = async () => {
    try {
        const users = await User.findAll();
        
        const specificUser = await User.findOne({ where: { email: "test@gmail.com" } });
        
        if (specificUser) {
            console.log('User with email test@gmail.com:', specificUser.toJSON());
        } else {
            console.log('No user found with email test@gmail.com');
        }

        console.log('All users:');
        users.forEach(user => {
            console.log(user.toJSON());
        });
        
    } catch (err) {
        console.error('Another error:', err);
    }
};

another();
