export interface GalleryItem {
  id: number
  title: string
  category: string
  image: string
  description: string
}

export interface FeaturedItem {
  id: number
  name: string
  by: string
  category: string
  startingPrice: string
  description: string
  image: string
  tags: string[]
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: 'Blinged Water Bottle',
    category: 'Bedazzled Designs',
    image: 'https://media.base44.com/images/public/69f90aa4aed3d1c3e1966f53/5bd216c04_image.png',
    description: 'Hand-placed rhinestones with custom name detailing.',
  },
  {
    id: 2,
    title: 'Faith Scripture Shirt',
    category: 'Faith Collection',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop',
    description: 'Soft cotton tee with metallic gold scripture print.',
  },
  {
    id: 3,
    title: 'Custom Photo Mug',
    category: 'Custom Mugs',
    image: '/cup.jpeg',
    description: 'Vibrant photo transfer with personalized message.',
  },
  {
    id: 4,
    title: 'Business Branding Kit',
    category: 'Business Branding',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&auto=format&fit=crop',
    description: 'Coordinated stickers and labels for a boutique brand.',
  },
  {
    id: 5,
    title: 'Glitter Ombre Tumbler',
    category: 'Bedazzled Designs',
    image: '/pouch.jpeg',
    description: 'Double-walled tumbler with custom glitter finish.',
  },
  {
    id: 6,
    title: 'Inspirational Hooded Sweatshirt',
    category: 'Printed Apparel',
    image: '/slippers.jpeg',
    description: 'Premium heavyweight hoodie with custom quote.',
  },
  {
    id: 7,
    title: 'Luxe Rhinestone Phone Case',
    category: 'Bedazzled Designs',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&auto=format&fit=crop',
    description: 'Full-coverage bedazzled case for ultimate sparkle.',
  },
  {
    id: 8,
    title: 'Personalized Gift Mug',
    category: 'Custom Mugs',
    image: 'https://images.unsplash.com/photo-1521485950395-bcfb8fc9bd06?w=800&auto=format&fit=crop',
    description: 'Beautiful ceramic mug with handwritten-style name.',
  },
  {
    id: 9,
    title: 'Custom Brand Stickers',
    category: 'Stickers & Labels',
    image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&auto=format&fit=crop',
    description: 'Durable vinyl stickers for professional packaging.',
  },
  {
    id: 10,
    title: 'Custom Initial Phone Case',
    category: 'Bedazzled Designs',
    image: 'https://images.unsplash.com/photo-1570857502809-08184874388e?w=800&auto=format&fit=crop',
    description: 'Premium clear case with crystal initial and delicate cherry blossom accents.',
  },
  {
    id: 11,
    title: 'Custom Pearl Slides',
    category: 'Bedazzled Designs',
    image: '/images/products/aire-pearl-slides.jpg',
    description: 'Comfortable white slides personalized with elegant hand-placed pearls.',
  },
  {
    id: 12,
    title: 'Blinged Heart Tumbler',
    category: 'Bedazzled Designs',
    image: '/images/products/abi-heart-tumbler.jpg',
    description: 'Double-walled tumbler with crystal name and sparkling heart details.',
  },
]

export const FEATURED_ITEMS: FeaturedItem[] = [
  {
    id: 1,
    name: 'Personalized Blinged Water Bottle / Tumbler',
    by: 'Desiree',
    category: 'bedazzled',
    startingPrice: 'Starting at $25',
    description: 'Your name or message bedazzled in sparkling rhinestones on a tumbler or water bottle. Choose your colours, theme, and design.',
    image: 'https://media.base44.com/images/public/69f90aa4aed3d1c3e1966f53/5bd216c04_image.png',
    tags: ['Rhinestones', 'Personalized', 'Gift Idea'],
  },
  {
    id: 10,
    name: 'Custom Phone Case',
    by: 'Desiree',
    category: 'bedazzled',
    startingPrice: 'Starting at $30',
    description: 'A beautiful, custom-made phone case featuring your initial and elegant floral designs.',
    image: '/pouch.jpeg',
    tags: ['Phone Case', 'Bling', 'Custom'],
  },
  {
    id: 2,
    name: 'Custom Slippers',
    by: 'Rire',
    category: 'printed',
    startingPrice: 'Starting at $18',
    description: 'Design your own slippers with a custom print — your name, favourite quote, faith message, birthday design, or business logo.',
    image: 'slippers.jpeg',
    tags: ['Slippers', 'Custom', 'Fashion'],
  },
]
