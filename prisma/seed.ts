import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Cleaning up existing database records...');
  await prisma.favorite.deleteMany({});
  await prisma.college.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('👤 Creating default test user account...');
  const hashedPassword = await bcrypt.hash('password123', 10);
  const testUser = await prisma.user.create({
    data: {
      name: 'Test Student',
      email: 'student@example.com',
      password: hashedPassword,
    },
  });
  console.log(`✅ Default user created: ${testUser.email} (Password: password123)`);

  console.log('🏫 Seeding 20 colleges across various locations...');

  const collegesData = [
    {
      name: 'Indian Institute of Technology (IIT) Madras',
      location: 'Chennai',
      overview: 'Ranked consistently as India’s top engineering institute, IIT Madras is celebrated for its cutting-edge research, massive green campus, and exceptional academic rigor.',
      courses: ['B.Tech Computer Science', 'B.Tech Electrical Engineering', 'M.Tech Data Science'],
      fees: 220000,
      placement: 24.5,
      rating: 4.9,
    },
    {
      name: 'Indian Institute of Technology (IIT) Bombay',
      location: 'Mumbai',
      overview: 'Located in Powai, IIT Bombay is a powerhouse of entrepreneurship and innovation, hosting one of the finest tech ecosystems and global alumni networks.',
      courses: ['B.Tech Computer Science', 'B.Tech Aerospace Engineering', 'B.Tech Mechanical'],
      fees: 230000,
      placement: 26.0,
      rating: 4.9,
    },
    {
      name: 'Indian Institute of Technology (IIT) Delhi',
      location: 'Delhi',
      overview: 'Situated in the heart of India’s capital, IIT Delhi is a prime destination for global research partnerships and high-impact corporate tech recruitments.',
      courses: ['B.Tech Computer Science', 'B.Tech Mathematics & Computing', 'M.Tech AI'],
      fees: 225000,
      placement: 25.0,
      rating: 4.8,
    },
    {
      name: 'Bits Pilani (Main Campus)',
      location: 'Pilani',
      overview: 'A premium private university known for its strict meritocracy, zero reservation policy, and iconic "No Attendance Rule" that fosters extreme student independence.',
      courses: ['B.E. Computer Science', 'B.E. Electronics & Instrumentation', 'M.Sc. Economics'],
      fees: 550000,
      placement: 19.8,
      rating: 4.7,
    },
    {
      name: 'Delhi Technological University (DTU)',
      location: 'Delhi',
      overview: 'Formerly known as Delhi College of Engineering (DCE), DTU boasts an immense legacy of technical education and unparalleled placements in top-tier tech firms.',
      courses: ['B.Tech Software Engineering', 'B.Tech Information Technology', 'MBA'],
      fees: 210000,
      placement: 16.5,
      rating: 4.5,
    },
    {
      name: 'National Institute of Technology (NIT) Trichy',
      location: 'Trichy',
      overview: 'The premier national institute of technology in India, widely respected for its rigorous structural curriculum and outstanding core placement drives.',
      courses: ['B.Tech Computer Science', 'B.Tech Electronics & Communication'],
      fees: 145000,
      placement: 18.2,
      rating: 4.6,
    },
    {
      name: 'Vellore Institute of Technology (VIT)',
      location: 'Vellore',
      overview: 'A sprawling private campus boasting state-of-the-art technological labs, flexible credit choice modern learning systems, and record-breaking volume placements.',
      courses: ['B.Tech Computer Science', 'B.Tech Bio-Medical Engineering', 'MCA'],
      fees: 198000,
      placement: 9.2,
      rating: 4.2,
    },
    {
      name: 'SRM Institute of Science and Technology',
      location: 'Chennai',
      overview: 'One of India’s largest private universities offering high international exposure, standard industrial labs, and wide cultural diversity among students.',
      courses: ['B.Tech Computer Science', 'B.Tech Cyber Security', 'B.Tech Cloud Computing'],
      fees: 250000,
      placement: 8.5,
      rating: 4.1,
    },
    {
      name: 'RV College of Engineering (RVCE)',
      location: 'Bengaluru',
      overview: 'Strategically positioned inside India’s Silicon Valley, RVCE offers deep real-time access to tech start-ups and multinational enterprise internships.',
      courses: ['B.E. Computer Science', 'B.E. Information Science', 'M.Tech VLSI'],
      fees: 240000,
      placement: 11.5,
      rating: 4.3,
    },
    {
      name: 'Manipal Institute of Technology (MIT)',
      location: 'Manipal',
      overview: 'Famous for its exemplary lifestyle campus infrastructure, global collaborations, and exceptional focus on creative engineering design challenges.',
      courses: ['B.Tech Computer Science', 'B.Tech Data Science', 'B.Tech Automobile'],
      fees: 425000,
      placement: 12.0,
      rating: 4.4,
    },
    {
      name: 'College of Engineering, Guindy (CEG)',
      location: 'Chennai',
      overview: 'Established in 1794, CEG is one of Asia’s oldest technical colleges, highly celebrated for its extremely affordable public education and profound legacy.',
      courses: ['B.E. Computer Science', 'B.E. Geo-Informatics', 'M.E. Structural Engineering'],
      fees: 350000,
      placement: 14.7,
      rating: 4.5,
    },
    {
      name: 'Jadavpur University',
      location: 'Kolkata',
      overview: 'A premier state-run university globally admired for offering world-class engineering packages at an incredibly low government-subsidized fee structure.',
      courses: ['B.E. Computer Science', 'B.E. Electronics', 'B.E. Power Engineering'],
      fees: 10000,
      placement: 15.1,
      rating: 4.6,
    },
    {
      name: 'Thapar Institute of Engineering and Technology',
      location: 'Patiala',
      overview: 'A premium historical institution known for its high academic standards, wide expansive green labs, and high placement ratios across North India.',
      courses: ['B.Tech Computer Science', 'B.Tech Mechatronics', 'M.Tech Software'],
      fees: 410000,
      placement: 10.8,
      rating: 4.3,
    },
    {
      name: 'Amity University',
      location: 'Noida',
      overview: 'A high-tech hi-fi infrastructure university delivering flexible curriculum choices, strong industry integrations, and global transfer campus programs.',
      courses: ['B.Tech Computer Science', 'B.Tech Artificial Intelligence', 'BBA'],
      fees: 320000,
      placement: 7.2,
      rating: 3.9,
    },
    {
      name: 'International Institute of Information Technology (IIIT) Hyderabad',
      location: 'Hyderabad',
      overview: 'A premium hub dedicated heavily to computer science research, coding mastery, and high-performance engineering breakthroughs globally.',
      courses: ['B.Tech Computer Science', 'B.Tech Electronics', 'Dual Degree MS'],
      fees: 360000,
      placement: 30.2,
      rating: 4.9,
    },
    {
      name: 'PSG College of Technology',
      location: 'Coimbatore',
      overview: 'An elite industry-connected institution famous for producing top industrialists, rigorous research models, and robust practical core engineering labs.',
      courses: ['B.E. Production Engineering', 'B.E. Computer Science', 'M.Tech Systems'],
      fees: 120000,
      placement: 11.2,
      rating: 4.4,
    },
    {
      name: 'National Institute of Technology (NIT) Surathkal',
      location: 'Mangaluru',
      overview: 'Beautifully located directly along the Arabian Sea shore, NIT Surathkal blends absolute academic brilliance with excellent surfing and beach lifestyle.',
      courses: ['B.Tech Computer Science', 'B.Tech Information Technology', 'M.Tech Marine'],
      fees: 150000,
      placement: 19.0,
      rating: 4.7,
    },
    {
      name: 'College of Engineering (COEP)',
      location: 'Pune',
      overview: 'A prestigious historic autonomous technical institute deeply respected across western industries for producing stellar research engineers.',
      courses: ['B.Tech Computer Science', 'B.Tech Metallurgy', 'M.Tech Control Systems'],
      fees: 135000,
      placement: 12.4,
      rating: 4.4,
    },
    {
      name: 'Kalinga Institute of Industrial Technology (KIIT)',
      location: 'Bhubaneswar',
      overview: 'A vast technical city campus known for magnificent sports amenities, super-fast corporate alignment modules, and holistic cultural incubation setups.',
      courses: ['B.Tech Computer Science', 'B.Tech Computer Systems', 'MCA'],
      fees: 350000,
      placement: 8.2,
      rating: 4.1,
    },
    {
      name: 'Chandigarh University',
      location: 'Chandigarh',
      overview: 'One of the fastest-growing private universities recognized for high industrial placement volumes, active startup labs, and massive tech festivals.',
      courses: ['B.Tech Computer Science', 'B.Tech Mobile Computing', 'MBA'],
      fees: 260000,
      placement: 7.9,
      rating: 4.0,
    }
  ];

  for (const college of collegesData) {
    await prisma.college.create({
      data: college,
    });
  }

  console.log('🚀 Successfully seeded database with 20 premium colleges!');
}

main()
  .catch((e) => {
    console.error('❌ Error while seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });