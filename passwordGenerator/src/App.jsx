import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [length, setlength] = useState(8)
  const [numbersAllowed, setnumbersAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState("")


  //useRef Hook  (Neeche password ke input form se link kara)
  const passwordRef = useRef(null);


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,9);

    window.navigator.clipboard.writeText(password);
  }, [password])



  const passwordGenerator = useCallback( () => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numbersAllowed) str += "0123456789";
    if(charAllowed) str += "@#$%*&^!";

    for ( let i=1; i<=length; i++ ) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numbersAllowed, charAllowed, setPassword]);

  useEffect( () => {
    passwordGenerator()
  }, [length, numbersAllowed, charAllowed, passwordGenerator] );

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-5 my-15 py-5  text-orange-500 bg-gray-700'>

        <h1 className='text-white text-center my-3'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden text-white border-amber-50 mb-4'>
          <input type='text' value={password} className="outline-none w-full py-3 px-4 bg-white text-black" placeholder='Password' readOnly ref={passwordRef}></input>
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5  shrink-0'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range' min={0} max={100} value={length} className='cursor-pointer' onChange={(e) => {setlength(e.target.value)}}></input>
            <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type='checkbox' id='numberInput' defaultChecked={numbersAllowed} onChange={() => {setnumbersAllowed((prev) => !prev)}}></input>
            <label htmlFor='numberInput'>Numbers</label>
          </div>

           <div className='flex items-center gap-x-1'>
            <input type='checkbox' id='characterInput' defaultChecked={charAllowed} onChange={() => {setcharAllowed((prev) => !prev)}}></input>
            <label htmlFor='characterInput'>Characters</label>
          </div>

        </div>



      </div>
    </>
  )
}

export default App
