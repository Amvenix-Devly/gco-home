import fs from 'fs/promises'
import path from 'path'
import db from '@/lib/db'
import UploadFile from '@/lib/ImageKit'

// Image path mappings
const imagePaths = {
  AminNulImage: 'src/img/pagesImage/team/Aminul-Islam-.jpg',
  Afia: 'src/img/pagesImage/team/Afia-photo-1.png', 
  Najmul: 'src/img/pagesImage/team/Nizhum-Photo-2.jpg',
  Shahin: 'src/img/pagesImage/team/ExclusiveMember/shahi.jpg',
  Mashud: 'src/img/pagesImage/team/ExclusiveMember/mashud.jpg',
  Shamim: 'src/img/pagesImage/team/ExclusiveMember/Shamim.png',
  Zihanur: 'src/img/pagesImage/team/ExclusiveMember/jihanur.jpg',
  Kamrun: 'src/img/pagesImage/team/ExclusiveMember/kamrun.png',
  Ozair: 'src/img/pagesImage/team/ExclusiveMember/ozair.jpg',
  Samim: 'src/img/pagesImage/team/ExclusiveMember/Shamim.png',
  May: 'src/img/pagesImage/team/ExclusiveMember/may.png',
  MRIDHA: 'src/img/pagesImage/team/amin.jpg',
  MALEK: 'src/img/pagesImage/team/kh.jpg',
  SHOWKAT: 'src/img/pagesImage/team/mir.jpg',
  Af: 'src/img/pagesImage/team/tagyExclusive/af.jpg',
  bad: 'src/img/pagesImage/team/tagyExclusive/bad.png',
  rof: 'src/img/pagesImage/team/tagyExclusive/rof.png',
  shahid: 'src/img/pagesImage/team/stafmember/Shahid-photo.png',
  roni: 'src/img/pagesImage/team/stafmember/Roni-photo-2.jpg',
  masudStaff: 'src/img/pagesImage/team/stafmember/mashud.jpg',
  afStaff: 'src/img/pagesImage/team/stafmember/af.jpg',
  salma: 'src/img/pagesImage/team/stafmember/Salma-khatun-photo.png',
  mahfuzStaff: 'src/img/pagesImage/team/stafmember/2.png',
  jubayer: 'src/img/pagesImage/team/stafmember/jub.jpg',
  mayTagy: 'src/img/pagesImage/team/tagyExclusive/my.png',
  mahfuzTagy: 'src/img/pagesImage/team/tagyExclusive/2.png',
  zubaer: 'src/img/pagesImage/team/tagyExclusive/zub.jpg',
  zihanurTagy: 'src/img/pagesImage/team/tagyExclusive/zi.jpg',
  rabby: 'src/img/pagesImage/team/tagyExclusive/rab.jpg',
  tonima: 'src/img/pagesImage/team/tagyExclusive/toni.jpg',
  shadin: 'src/img/pagesImage/team/tagyExclusive/sha.png',
}

const data = {
  'BOARD OF DIRECTOR': [
    {
      name: 'Aminul Islam',
      title: 'Chairman',
      imagePath: imagePaths.AminNulImage,
    },
    {
      name: 'NIZHUM RAHMAN',
      title: 'SECRETARY',
      imagePath: imagePaths.Najmul,
    },
    {
      name: 'AFIA SUMI',
      title: 'TREASURER',
      imagePath: imagePaths.Afia,
    },
  ],
  'EXECUTIVE MEMBER': [
    {
      name: 'Aminul Islam',
      title: 'Chairman',
      imagePath: imagePaths.AminNulImage,
    },
    {
      name: 'MD. SHAHINUR ISLAM',
      title: 'VICE PRESIDENT',
      imagePath: imagePaths.Shahin,
    },
    {
      name: 'MD. MASUD RANA',
      title: 'SECRETARY GENERAL',
      imagePath: imagePaths.Mashud,
    },
    {
      name: 'MD. SHAMIM ALI',
      title: 'JOINT SECRETARY',
      imagePath: imagePaths.Shamim,
    },
    {
      name: 'ZIHANUR RAHMAN',
      title: 'FINANCE SECRETARY',
      imagePath: imagePaths.Zihanur,
    },
    {
      name: 'MST.KAMRUN NAHER',
      title: 'ORGANIZING SECRETARY',
      imagePath: imagePaths.Kamrun,
    },
    {
      name: 'OZAIR BIN OBAIDA',
      title: 'PUBLICATION SECRETARY',
      imagePath: imagePaths.Ozair,
    },
    {
      name: 'MST. SAMMI KHATUN',
      title: 'EXECUTIVE MEMBER',
      imagePath: imagePaths.Samim,
    },
    {
      name: 'MD. MAYMUR',
      title: 'EXECUTIVE MEMBER',
      imagePath: imagePaths.May,
    },
  ],
  'ADVISER COUNCIL': [
    {
      name: 'AMIN UDDIN MRIDHA',
      title: 'CHIEF ADVISER',
      imagePath: imagePaths.MRIDHA,
    },
    {
      name: 'KH MALEK',
      title: 'ADVISER',
      imagePath: imagePaths.MALEK,
    },
    {
      name: 'MIR SHOWKAT ALI',
      title: 'ADVISER',
      imagePath: imagePaths.SHOWKAT,
    },
  ],
  'GCO STAFF': [
    {
      name: 'Aminul Islam',
      title: 'Chairman',
      imagePath: imagePaths.AminNulImage,
    },
    {
      name: 'NIZHUM RAHMAN',
      title: 'SECRETARY',
      imagePath: imagePaths.Najmul,
    },
    {
      name: 'SHAHID AHMED',
      title: 'CO ORDINATOR',
      imagePath: imagePaths.shahid,
    },
    {
      name: 'RONI ISLAM',
      title: 'ACCOUNTANT',
      imagePath: imagePaths.roni,
    },
    {
      name: 'MD. MASUD RANA',
      title: 'PROJECT OFFICER',
      imagePath: imagePaths.masudStaff,
    },
    {
      name: 'AFTABUL ALOM RAIHAN',
      title: 'PROJECT DEV. MANAGER',
      imagePath: imagePaths.afStaff,
    },
    {
      name: 'MST SALMA KHATUN',
      title: 'SURVERY OFFICER',
      imagePath: imagePaths.salma,
    },
    {
      name: 'MAHFUZ AHMED',
      title: 'SURVERY OFFICER',
      imagePath: imagePaths.mahfuzStaff,
    },
    {
      name: 'JUBAYER AMIN',
      title: 'SURVERY OFFICER',
      imagePath: imagePaths.jubayer,
    },
  ],
  'TYAGI EXECUTIVE': [
    {
      name: 'Aminul Islam',
      title: 'PRESIDENT',
      imagePath: imagePaths.AminNulImage,
    },
    {
      name: 'MD. MASUD RANA',
      title: 'VICE PRESIDENT',
      imagePath: imagePaths.Mashud,
    },
    {
      name: 'AFTABUL ALOM RAIHAN',
      title: 'VICE PRESIDENT',
      imagePath: imagePaths.Af,
    },
    {
      name: 'MAHFUZ KARIM BADHON',
      title: 'VICE PRESIDENT',
      imagePath: imagePaths.bad,
    },
    {
      name: 'ABDUR ROUF KHAN',
      title: 'GENAREL SECRETARY',
      imagePath: imagePaths.rof,
    },
    {
      name: 'MD. MAYMUR',
      title: 'JOINT GENAREL SECRETARY',
      imagePath: imagePaths.mayTagy,
    },
    {
      name: 'MD MAHFUZ AHMED',
      title: 'JOINT GENAREL SECRETARY',
      imagePath: imagePaths.mahfuzTagy,
    },
    {
      name: 'MD ZUBAER AMIN',
      title: 'ORGANIZING SECRETARY',
      imagePath: imagePaths.zubaer,
    },
    {
      name: 'ZIHANUR RAHMAN',
      title: 'FINANCE SECRETARY',
      imagePath: imagePaths.zihanurTagy,
    },
    {
      name: 'MD RABBY',
      title: 'PUBLICATION SECRETARY',
      imagePath: imagePaths.rabby,
    },
    {
      name: 'MST. TONIMA ISLAM',
      title: 'EXECUTIVE MEMBER',
      imagePath: imagePaths.tonima,
    },
    {
      name: 'MD. SHADIN',
      title: 'EXECUTIVE MEMBER',
      imagePath: imagePaths.shadin,
    },
  ],
}

// Helper function to create File object from file path
async function createFileFromPath(filePath: string): Promise<File> {
  const fullPath = path.join(process.cwd(), filePath)
  const buffer = await fs.readFile(fullPath)
  const fileName = path.basename(filePath)
  
  // Create a File-like object that works with the upload function
  const file = new File([buffer], fileName, {
    type: `image/${path.extname(fileName).substring(1)}`
  })
  
  return file
}

// Upload image and return imageId and imageUrl
async function uploadImage(imagePath: string): Promise<{ imageId: string; imageUrl: string }> {
  try {
    const file = await createFileFromPath(imagePath)
    const uploadResult = await UploadFile(file, 'members')
    return {
      imageId: uploadResult.fileId,
      imageUrl: uploadResult.url
    }
  } catch (error) {
    console.error(`Failed to upload image: ${imagePath}`, error)
    throw error
  }
}

// Main sync function
async function syncTeamData() {
  try {
    console.log('Starting team data synchronization...')
    
    // Create member types first
    const memberTypeMap: Record<string, number> = {}
    
    for (const [typeName] of Object.entries(data)) {
      console.log(`Creating member type: ${typeName}`)
      
      // Check if member type already exists
      const existingType = await db.memberType.findFirst({
        where: { title: typeName }
      })
      
      if (existingType) {
        memberTypeMap[typeName] = existingType.id
        console.log(`Member type "${typeName}" already exists with ID: ${existingType.id}`)
      } else {
        const memberType = await db.memberType.create({
          data: {
            title: typeName,
            position: Object.keys(memberTypeMap).length
          }
        })
        memberTypeMap[typeName] = memberType.id
        console.log(`Created member type "${typeName}" with ID: ${memberType.id}`)
      }
    }
    
    // Create members
    for (const [typeName, members] of Object.entries(data)) {
      const typeId = memberTypeMap[typeName]
      
      for (let i = 0; i < members.length; i++) {
        const member = members[i]
        console.log(`Processing member: ${member.name} (${typeName})`)
        
        // Check if member already exists
        const existingMember = await db.member.findFirst({
          where: {
            name: member.name,
            typeId: typeId,
            title: member.title
          }
        })
        
        if (existingMember) {
          console.log(`Member "${member.name}" already exists, skipping...`)
          continue
        }
        
        // Upload image
        let imageId: string | null = null
        let imageUrl: string | null = null
        
        if (member.imagePath) {
          try {
            const uploadResult = await uploadImage(member.imagePath)
            imageId = uploadResult.imageId
            imageUrl = uploadResult.imageUrl
            console.log(`Uploaded image for ${member.name}`)
          } catch (error) {
            console.error(`Failed to upload image for ${member.name}:`, error)
            // Continue without image if upload fails
          }
        }
        
        // Create member
        await db.member.create({
          data: {
            name: member.name,
            title: member.title,
            typeId: typeId,
            position: i,
            imageId,
            imageUrl,
            previous: false
          }
        })
        
        console.log(`Created member: ${member.name}`)
      }
    }
    
    console.log('Team data synchronization completed successfully!')
    
  } catch (error) {
    console.error('Error during synchronization:', error)
    process.exit(1)
  } finally {
    await db.$disconnect()
  }
}

// Run the sync if this file is executed directly
if (require.main === module) {
  syncTeamData()
}