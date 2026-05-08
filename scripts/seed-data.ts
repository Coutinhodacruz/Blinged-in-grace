import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env');
    process.exit(1);
}

// Define models locally in the script to avoid issues with Next.js path aliases in a standalone script
const GalleryItemSchema = new mongoose.Schema({
    title: String,
    imageUrl: { type: String, required: true },
    description: String,
    category: String
}, { timestamps: true });

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

const CategorySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    color: { type: String, required: true },
    description: { type: String, required: true },
    items: [{ type: String }],
}, { timestamps: true });

const GalleryItem = mongoose.models.GalleryItem || mongoose.model('GalleryItem', GalleryItemSchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const GALLERY_ITEMS = [
  {
    title: 'Blinged Water Bottle',
    category: 'Bedazzled Designs',
    imageUrl: 'https://media.base44.com/images/public/69f90aa4aed3d1c3e1966f53/5bd216c04_image.png',
    description: 'Hand-placed rhinestones with custom name detailing.',
  },
  {
    title: 'Faith Scripture Shirt',
    category: 'Faith Collection',
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop',
    description: 'Soft cotton tee with metallic gold scripture print.',
  },
  {
    title: 'Custom Photo Mug',
    category: 'Custom Mugs',
    imageUrl: '/cup.jpeg',
    description: 'Vibrant photo transfer with personalized message.',
  },
  {
    title: 'Business Branding Kit',
    category: 'Business Branding',
    imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&auto=format&fit=crop',
    description: 'Coordinated stickers and labels for a boutique brand.',
  },
  {
    title: 'Glitter Ombre Tumbler',
    category: 'Bedazzled Designs',
    imageUrl: '/pouch.jpeg',
    description: 'Double-walled tumbler with custom glitter finish.',
  },
  {
    title: 'Inspirational Hooded Sweatshirt',
    category: 'Printed Apparel',
    imageUrl: '/slippers.jpeg',
    description: 'Premium heavyweight hoodie with custom quote.',
  },
  {
    title: 'Luxe Rhinestone Phone Case',
    category: 'Bedazzled Designs',
    imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&auto=format&fit=crop',
    description: 'Full-coverage bedazzled case for ultimate sparkle.',
  },
  {
    title: 'Personalized Gift Mug',
    category: 'Custom Mugs',
    imageUrl: 'https://images.unsplash.com/photo-1521485950395-bcfb8fc9bd06?w=800&auto=format&fit=crop',
    description: 'Beautiful ceramic mug with handwritten-style name.',
  },
  {
    title: 'Custom Brand Stickers',
    category: 'Stickers & Labels',
    imageUrl: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&auto=format&fit=crop',
    description: 'Durable vinyl stickers for professional packaging.',
  },
  {
    title: 'Custom Initial Phone Case',
    category: 'Bedazzled Designs',
    imageUrl: 'https://images.unsplash.com/photo-1570857502809-08184874388e?w=800&auto=format&fit=crop',
    description: 'Premium clear case with crystal initial and delicate cherry blossom accents.',
  },
  {
    title: 'Custom Pearl Slides',
    category: 'Bedazzled Designs',
    imageUrl: '/images/products/aire-pearl-slides.jpg',
    description: 'Comfortable white slides personalized with elegant hand-placed pearls.',
  },
  {
    title: 'Blinged Heart Tumbler',
    category: 'Bedazzled Designs',
    imageUrl: '/images/products/abi-heart-tumbler.jpg',
    description: 'Double-walled tumbler with crystal name and sparkling heart details.',
  },
];

const FEATURED_ITEMS = [
  {
    name: 'Personalized Blinged Water Bottle / Tumbler',
    category: 'bedazzled',
    price: 25,
    description: 'Your name or message bedazzled in sparkling rhinestones on a tumbler or water bottle. Choose your colours, theme, and design.',
    imageUrl: 'https://media.base44.com/images/public/69f90aa4aed3d1c3e1966f53/5bd216c04_image.png',
    tags: ['Rhinestones', 'Personalized', 'Gift Idea'],
    isFeatured: true
  },
  {
    name: 'Custom Phone Case',
    category: 'bedazzled',
    price: 30,
    description: 'A beautiful, custom-made phone case featuring your initial and elegant floral designs.',
    imageUrl: '/pouch.jpeg',
    tags: ['Phone Case', 'Bling', 'Custom'],
    isFeatured: true
  },
  {
    name: 'Custom Slippers',
    category: 'printed',
    price: 18,
    description: 'Design your own slippers with a custom print — your name, favourite quote, faith message, birthday design, or business logo.',
    imageUrl: '/slippers.jpeg',
    tags: ['Slippers', 'Custom', 'Fashion'],
    isFeatured: true
  },
];

const CATEGORIES = [
    {
      id: 'bedazzled',
      name: 'Bedazzled Designs',
      image: 'https://media.base44.com/images/public/69f90aa4aed3d1c3e1966f53/5bd216c04_image.png',
      color: 'accent',
      description: 'Water bottles, tumblers, phone cases, and shoes—all sparkled with premium rhinestones.',
      items: [
        'Water Bottles',
        'Tumblers & Drinkware',
        'Phone Cases',
        'Shoes & Footwear',
        'Bags & Accessories',
      ],
    },
    {
      id: 'apparel',
      name: 'Custom Apparel',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop',
      color: 'primary',
      description: 'Personalized t-shirts and hoodies for events, families, and businesses with custom designs.',
      items: [
        'T-Shirts',
        'Birthday Shirts',
        'Family Shirts',
        'Church Event Shirts',
        'Scripture Shirts',
      ],
    },
    {
      id: 'mugs',
      name: 'Phone Pouche',
      image: '/pinkpouch.jpeg',
      color: 'accent',
      description: 'Handcrafted with love and care, each pouch is unique and designed to be cherished. Perfect for storing your essentials in style.',
      items: [
        'Pouche',
        'Bags',
        'Shoes',
        'Water Bottles',
        'Tumblers & Drinkware',
        'Phone Cases',
      ],
    },
    {
      id: 'stickers',
      name: 'Stickers & Labels',
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&auto=format&fit=crop',
      color: 'primary',
      description: 'Custom stickers for businesses, events, packaging, and personal branding.',
      items: [
        'Business Logo Stickers',
        'Product Labels',
        'Packaging Stickers',
        'Event Stickers',
        'Thank-You Stickers',
      ],
    },
    {
      id: 'faith',
      name: 'Faith Collection',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop',
      color: 'accent',
      description: 'Scripture-based and inspirational designs to encourage and uplift beautifully.',
      items: [
        'Scripture Apparel',
        'Faith-Based Gifts',
        'Inspirational Quotes',
        'Prayer Items',
        'Christian Designs',
      ],
    },
    {
      id: 'business',
      name: 'Phone Pouches',
      image: '/blackpouch.jpeg',
      color: 'primary',
      description: 'Phone pouches for the business.',
      items: [
        'Branded Pouches',
        'Logo Stickers',
        'Business Pouches',
        'Product Labels',
        'Branded Gifts',
      ],
    },
];

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected successfully.');

        // Clear existing data
        console.log('Clearing existing data...');
        await GalleryItem.deleteMany({});
        await Product.deleteMany({});
        await Category.deleteMany({});

        // Insert Gallery Items
        console.log('Seeding Gallery Items...');
        await GalleryItem.insertMany(GALLERY_ITEMS);

        // Insert Products
        console.log('Seeding Products...');
        await Product.insertMany(FEATURED_ITEMS);

        // Insert Categories
        console.log('Seeding Categories...');
        await Category.insertMany(CATEGORIES);

        console.log('Database seeded successfully! 🌱');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();
