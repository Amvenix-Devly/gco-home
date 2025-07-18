import Imagekit from 'imagekit'

export const imageKit = new Imagekit({
  publicKey: 'public_HWTFjcY9U+MQETONQK19IGSBtt4=',
  privateKey: 'private_80LY2uCHWIdBg3hDz3i7Jul85tU=',
  urlEndpoint: 'https://ik.imagekit.io/qaqsezzqo',
})

// un tested
const UploadFile = async (file: File | any, folder: string = ''): Promise<{ fileId: string, url: string }> => {
  const byte = await file.arrayBuffer()
  const buffer = Buffer.from(byte)
  return new Promise((resolve, reject) => {
    imageKit.upload(
      {
        file: buffer,
        fileName: file.name,
        folder: 'gco_home/' + folder,
      },
      (err, result) => {
        if (err) {
          reject(err)
        } else {
          const { fileId, url } = result as any
          resolve({ fileId, url })
        }
      }
    )
  })
}

export default UploadFile
