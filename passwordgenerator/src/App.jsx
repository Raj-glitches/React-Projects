import { useCallback, useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [char, setChar] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const genPassword =useCallback( ()=> {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmanopqrstuvwxyz"

    if(number) str += "0123456789"
    if(char) str +="!@#$%^&*()_+"

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(index)
    }

    console.log("hi");
    
    setPassword(pass)

  },[length, number, char])

    const copyPasswordToClipboard = ()=> {
      window.navigator.clipboard.writeText(password)
      passwordRef.current?.select()
    }

  useEffect(() => {
    genPassword()
  }, [length, number, char])

  return (
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shdow rounded-lg overflow-hidden'>
          <input 
            type="text" 
            value={password} 
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button 
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
            Copy
          </button>
      </div>
      <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
              name="" 
              id="" 
            />
              <label htmlFor="length">Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input 
                type="checkbox"
                defaultChecked={number}
                onChange={() => {
                  setNumber( (prev)=> !prev)
                }}
                name="" 
                id="" 
              />     
              <label htmlFor="number">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input 
                type="checkbox"
                defaultChecked={char}
                onChange={() => {
                  setChar( (prev)=> !prev)
                }}
                name="" 
                id="" 
              />     
              <label htmlFor="charInput">Characters</label>
          </div>
      </div>
   </div>
  )
}

export default App
