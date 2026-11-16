
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Tour from './models/Tour.js';

dotenv.config();

const tours = [
  {
    title: 'Goa Beach Escape',
    city: 'Goa',
    address: 'Calangute Beach, Goa, India',
    distance: 550,
    photo: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
    desc: 'Explore the beautiful beaches, Portuguese architecture and vibrant nightlife of Goa.',
    price: 5000,
    maxGroupSize: 10,
    featured: true
  },
  {
    title: 'Manali Mountain Adventure',
    city: 'Manali',
    address: 'Mall Road, Manali, Himachal Pradesh, India',
    distance: 600,
    photo: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23',
    desc: 'Discover beautiful mountains, valleys and adventure activities in Manali.',
    price: 8000,
    maxGroupSize: 8,
    featured: true
  },
  {
    title: 'Bali Tropical Experience',
    city: 'Bali',
    address: 'Ubud, Bali, Indonesia',
    distance: 4500,
    photo: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    desc: 'Experience tropical beaches, temples, waterfalls and the culture of Bali.',
    price: 25000,
    maxGroupSize: 12,
    featured: true
  },
  {
    title: 'Maldives Island Retreat',
    city: 'Maldives',
    address: 'Male, Maldives',
    distance: 1000,
    photo: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
    desc: 'Enjoy crystal-clear waters, beautiful islands and relaxing beach activities.',
    price: 35000,
    maxGroupSize: 6,
    featured: true
  },
  {
    title: 'Ooty Hill Station Tour',
    city: 'Ooty',
    address: 'Ooty, Tamil Nadu, India',
    distance: 150,
    photo: 'https://images.unsplash.com/photo-1597074866923-dc0589150358',
    desc: 'Explore tea gardens, scenic mountain views and beautiful landscapes in Ooty.',
    price: 4000,
    maxGroupSize: 10,
    featured: true
  }
];

const seedTours = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    for (const tour of tours) {
      await Tour.updateOne(
        { title: tour.title },
        { $setOnInsert: tour },
        { upsert: true }
      );
    }

    console.log('Tour data inserted successfully!');
    console.log('Total sample destinations:', tours.length);
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

seedTours();
