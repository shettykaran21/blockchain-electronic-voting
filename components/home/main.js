import Image from 'next/image'

const Main = () => {
  return (
    <main>
      <div className="flex min-h-[calc(100vh-80px)] justify-center items-center">
        <div className="flex flex-col gap-8 justify-center items-center">
          <Image src="/ether.png" width={180} height={180} alt="Ethereum" />
          <h1 className="font-bold font-heading text-7xl text-center">
            A secure, blockchain-based
            <br /> e-voting system.
          </h1>
        </div>
      </div>
    </main>
  )
}

export default Main
