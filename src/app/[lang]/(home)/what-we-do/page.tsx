import View from './client'
import data from './data.json'

const page = () => {
  return (
    <>
      <div className="bg-green-500">
        <h1 className="text-center text-4xl p-3">What we do</h1>
      </div>
      <section className="container">
        <View data={data} />
      </section>
    </>
  )
}

export default page
