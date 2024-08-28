import { useState } from 'react'
import axios from "axios"
import './App.css'

function App() {

  const [data, setData] = useState({
    email: "",
    body: ""
  })

  const handelChange = (e) => {
    const { name, value } = e.target
    // console.log(name,value);
    const copylogininfo = { ...data }
    copylogininfo[name] = value
    setData(copylogininfo)
  }



  const handelsubmit = async (e) => {
    e.preventDefault()
    //console.log(data);
    if (!data.email || !data.body) {
      alert("Email and body is requred")
      return
    }
    try {
      const res = await axios.post("http://localhost:3000", data)
      console.log(res.data);
      if (res.status === 200) {
        alert("Email was send")
      }
    } catch (error) {
      console.log(error);
      alert("Something is wrong")

    }


  }
  return (
    <>
      <div className="flex justify-center items-center flex-col m-3">
        <h1 className='text-center text-3xl text-blue-600'>Email sending macanisum</h1>
        <form action="" className='flex justify-center items-center flex-col gap-1' method='post'>
          <label htmlFor="email" className=''>Enter our email here:</label>
          <input type="email" name="email" id="email" className='outline-none border border-black p-1' placeholder='Enter your mail here' onChange={handelChange} />
          <label htmlFor="body">Enter mail body here</label>
          <textarea name="body" id="body" placeholder='Enter email body here' className='border border-black h-[381px] outline-none p-1' cols={80}
            onChange={handelChange}
          ></textarea>
          <input type="submit" value="Submit" onClick={handelsubmit} className='p-3 bg-slate-500 text-white rounded-md' />

        </form>
      </div>
    </>
  )
}

export default App
