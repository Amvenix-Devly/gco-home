const VideosPage = async () => {
  const API_KEY = 'AIzaSyCLhqxrB-1f47v8inbfdTAJXt-3SFK00lo'
  const CHANNEL_ID = 'UC_-SQG_O7X4GjMqyankrZTw'
  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&order=date&part=snippet&type=video&maxResults=21`
  const response = await fetch(url, {
    next: {
      revalidate: 86400,
    },
  })
  const data = await response.json()
  const videosIds = data?.items

  return (
    <>
      <h1 className="text-center font-bold text-2xl md:text-3xl py-5 bg-primary text-white">
        Videos
      </h1>
      <main className="container mt-8">
        <div className="flex flex-wrap  p-5 bg-black bg-opacity-5 m-4 rounded-[8px]">
          {videosIds.map((v: any, index: number) => (
            <div key={index} className="w-full sm:w-1/2 p-4  xl:w-1/3 ">
              <iframe
                src={`https://www.youtube.com/embed/${v.id.videoId}`}
                className="w-full aspect-video rounded-[4px]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default VideosPage
