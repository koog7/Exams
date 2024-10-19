import mongoose from 'mongoose';
import { randomUUID } from 'crypto';
import Photo from './models/PhotoPublish';
import User from './models/Users';

const run = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/exams');
    const db = mongoose.connection;

    try {
        await db.dropCollection('users')
        await db.dropCollection('photos')
    }catch (e) {
        console.error(e);
    }

    const users = await User.create([
        {
            email: 'user1@gmail.com',
            password: 'password1',
            displayName: 'User1',
            avatar:'user.png',
            role: 'user',
            token:randomUUID(),
        },
        {
            email: 'admin2@gmail.com',
            password: 'password2',
            displayName: 'Admin2',
            avatar:'admin.png',
            role: 'admin',
            token:randomUUID(),
        }
    ])

    const [user1 , admin2] = users;

    await Photo.create([
        {
            userId: user1._id,
            photo: 'mountains.jpg',
            title: 'Mountain',
        },
        {
            userId: user1._id,
            photo: 'Sunset.jpg',
            title: 'Sunset',
        },
        {
            userId: admin2._id,
            photo: 'jungle.jpg',
            title: 'Jungles',
        },
        {
            userId: admin2._id,
            photo: 'swamp.jpg',
            title: 'Swamp',
        }
    ])

    await db.close();
}

run()
