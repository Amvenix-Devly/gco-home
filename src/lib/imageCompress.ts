import imageCompression from 'browser-image-compression'

const compressImage = async (imageFile: File): Promise<File> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 3000,
    useWebWorker: true,
  }
  try {
    const compressedFile = await imageCompression(imageFile, options)
    return compressedFile
  } catch (error) {
    console.error('Failed to compress image: ', error)
    return imageFile
  }
}

export default compressImage
