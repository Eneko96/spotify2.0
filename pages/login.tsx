import { getProviders, signIn } from 'next-auth/react'

export default function login ({ providers = {} }: {providers: any}) {
  return (
   <div className='flex flex-col items-center bg-black justify-center min-h-screen w-full'>
     <img className='w-52 mb-5' src='https://links.papareact.com/9xl' alt='spotify' />
     {Object.values(providers).map((provider: any) => (
       <div key={provider.name}>
         <button onClick={() => signIn(provider.id, { callbackUrl: '/' })} className='bg-[#18D860] text-white p-5 rounder-lg'>
           Login with {provider.name}
         </button>
        </div>
     ))}
   </div>
  )
}

export async function getServerSideProps () {
  const providers = await getProviders()

  return {
    props: {
      providers
    }
  }
}
