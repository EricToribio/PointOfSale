import React, { useEffect } from 'react'
import axios from '../axios/axios'

const test = () => {
    useEffect(() => {
        const test = async () =>{

        
        try {
            const res = await axios.get('shop/1')
            console.log(res.data)
        } catch (error) {
            
        }
    }
    test()
    })
  return (
    <div>test</div>
  )
}

export default test