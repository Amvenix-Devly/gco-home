export const navigationData = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'About Us',
    path: '#',
    submenu: [
      {
        title: 'Our Organization',
        path: '/about',
        items: [
          { title: 'About GCO', path: '/about#about' },
          { title: 'Mission vision', path: '/about#mission' },
          { title: 'History of GCO', path: '/about#histry' },
        ],
      },
      {
        title: 'Our Team',
        path: '/about/team',
        items: [
          { title: 'Board Of Director', path: '/about/team#BOARD OF DIRECTOR' },
          { title: 'Executive Member', path: '/about/team#EXECUTIVE MEMBER' },
          { title: 'Adviser Council', path: '/about/team#ADVISER COUNCIL' },
          { title: 'Gco Staff', path: '/about/team#GCO STAFF' },
          { title: 'Tyagi Executive', path: '/about/team#TYAGI EXECUTIVE' },
        ],
      },
      {
        title: 'Our Strength',
        path: '/about/strength',
        items: [
          { title: 'Tyagi volunteer', path: '/about/strength#tyagiVolunteer' },
          { title: 'Tyagi foundation', path: '/about/strength#tyagiFoundation' },
          { title: 'Tyagi research center', path: '/about/strength#tyagiResearchCenter' },
          { title: 'Tyagi enterprise', path: '/about/strength#tyagiEnterprise' },
          { title: 'Global nation', path: '/about/strength/globalNation' },
          { title: 'GCO Nursery', path: '/about/strength#gcoNursery' },
          { title: 'treelanching', path: '/about/strength#treelanching' },
        ],
      },
      {
        title: 'Our Impact',
        path: '#',
        items: [
          { title: 'Annual report 2023', path: '/api/report2023' },
        ],
      },
    ],
  },
  {
    title: 'NEWS & STORIES',
    path: '#',
    submenu: [
      {
        title: 'NEWS & STORIES',
        path: '/about',
        items: [
          { title: 'Vidios', path: '/about/videos' },
          { title: 'Gallary', path: '/about/photo-gallery' },
        ],
      },
      {
        title: 'Image Boxes',
        items: [
          {
            title: 'Stay up to date on major announcements, exciting collaborations, and more.',
            src: 'https://onetreeplanted.org/cdn/shop/files/newsroom-promo_5000x.jpg?v=1690489113',
            linkTitle: 'Visit our Newsroom',
            path: '#',
          },
          {
            title: 'We make it simple for anyone to plant trees, and together we can make an incredible impact.',
            src: 'https://onetreeplanted.org/cdn/shop/files/Our_Vision-megamenu_images_4500x.webp?v=1674767633',
            linkTitle: 'Learn More',
            path: '#',
          },
        ],
      },
    ],
  },
  {
    title: 'Get Involved',
    path: '#',
    submenu: [
      {
        title: 'Businesses',
        path: '#',
        items: [
          { title: 'Become A Partner', path: '#' },
          { title: 'Partners', path: '#' },
          { title: 'Cryptocurrency', path: '#' },
          { title: 'Sports Sustainability', path: '#' },
        ],
      },
      {
        title: 'Individuals',
        path: '#',
        items: [
          { title: 'Monthly Giving', path: '#' },
          { title: 'Planned Giving', path: '#' },
          { title: 'Become A Tree Ambassador', path: '#' },
          { title: 'Teachers & Parents', path: '#' },
        ],
      },
      {
        title: 'Image Boxes',
        items: [
          {
            title: 'Become a business partner to improve your company’s sustainability initiatives and make an impact.',
            src: 'https://onetreeplanted.org/cdn/shop/files/Business_Sustainability-megamenu_images_4500x.webp?v=1674767903',
            linkTitle: 'Learn More',
            path: '#',
          },
          {
            title: 'See how your support and leadership can help us fund reforestation efforts across the globe.',
            src: 'https://onetreeplanted.org/cdn/shop/files/philanthropic-giving_4500x.jpg?v=1689881074',
            linkTitle: 'Learn More',
            path: '#',
          },
        ],
      },
    ],
  },
  {
    title: 'What we do',
    path: '#',
    submenu: [
      {
        title: 'Climate action',
        path: '/what-we-do',
        items: [
          { title: 'One tree for one child', path: '/what-we-do' },
          { title: 'Save life from thunderstorms with plants', path: '/what-we-do' },
          { title: 'Sponsor a tree for future child in Bangladesh', path: '/what-we-do' },
          { title: 'Disaster Resilience and Relief Programs', path: '/what-we-do' },
        ],
      },
      {
        title: 'Health',
        path: '/what-we-do',
        items: [
          { title: 'Maternal and Child Health in Bangladesh Slums', path: '/what-we-do' },
          { title: 'Maternal & Child Nutrition in Char Land, Bangladesh', path: '/what-we-do' },
        ],
      },
      {
        title: 'Food Security',
        path: '/what-we-do',
        items: [
          { title: "Addressing Hunger Among Bangladesh's Elderly", path: '/what-we-do' },
          { title: 'Abalamban – Self-Reliance', path: '/what-we-do' },
          { title: 'Cluster Village Program', path: '/what-we-do' },
        ],
      },
      {
        title: 'Human Rights',
        path: '/what-we-do',
        items: [
          { title: 'Skill development program', path: '/what-we-do' },
        ],
      },
      {
        title: 'Our Events',
        path: '/what-we-do',
        items: [
          { title: 'Skill development program', path: '/what-we-do' },
        ],
      },
      {
        title: 'Campaigns',
        path: '/what-we-do',
        items: [
          { title: 'Nutrition and Health Awareness Campaigns', path: '/what-we-do' },
          { title: 'Hygiene and Sanitation Awareness Campaigns', path: '/what-we-do' },
          { title: 'Mobile Campaigns for Health, Hygiene, and Social Awareness', path: '/what-we-do' },
        ],
      },
      {
        title: 'Training',
        path: '/what-we-do',
        items: [
          { title: 'ICT training program', path: '/what-we-do' },
        ],
      },
    ],
  },
  {
    title: 'Where we do',
    path: '#',
    submenu: [
      {
        title: '',
        path: '#',
        items: [
          { title: 'Bangladesh', path: '#' },
          { title: 'Zimbabwe', path: '#' },
          { title: 'Uganda', path: '#' },
        ],
      },
      {
        title: 'Image Boxes',
        items: [
          {
            title: 'Our fan-favorite Reforestation T-Shirt. Wear it with pride to show your support of reforesting our planet, one tree at a time.',
            src: 'https://onetreeplanted.org/cdn/shop/files/Mega_Menu_Image_2_1_a5088b7a-fa61-4d0b-9c6a-8a32dfb8adfd_4500x.jpg?v=1699972315',
            linkTitle: 'Shop now',
            path: '#',
          },
          {
            title: 'Give the gift that lasts a lifetime! Choose an image, write your personalized message and select a delivery date to gift a tree.',
            src: 'https://onetreeplanted.org/cdn/shop/files/gift-trees-mega-menu_2x_cb75d577-44b5-4b97-9796-04c5f4d3a921_2500x.jpg?v=1681420564',
            linkTitle: 'Gift a tree',
            path: '#',
          },
        ],
      },
    ],
  },
]
