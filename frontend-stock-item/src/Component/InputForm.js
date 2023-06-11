import React, { useEffect, useState } from 'react';
import {storage} from "../firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import "./InputForm.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const InputForm = ({isClicked, setIsClicked, postData}) => {
    const [tes,setTes]= useState([]);
    const [input, setInput] = useState({
        item:"",
        cost_buy:"",
        cost_sell:"",
        stock:"",
        img:""
     });

     const uploadImage = async(e)=>{
        
        try {
           
            const fileName = e.taget.files[0].name;
            const storageRef = ref(storage,`${fileName}`)

            const uploadBytes = await uploadBytes(storageRef, e.taget.files[0]);
           
            console.log("berhasil upload");

            const snapShot = await getDownloadURL(storageRef);
            const donwloadUrl = await snapShot();

            //url
            console.log(snapShot);
            setInput((currInput)=>{
                return{...currInput, img:snapShot};
            })
        } catch (error) {
            console.log(error);
        }
      


     }

     const onClickBut = ()=>{
       postData(input.img, input.item, input.cost_buy, input.cost_sell, input.stock);
       
     }
     const closePopUp = ()=>{
        setIsClicked(!isClicked);
     }

     const onChangeInput=(e)=>{
        setInput(currInput =>{
            return{...currInput, [e.target.id]:e.target.value}
        })
     }
     useEffect(()=>{
        console.log(tes);
     },[tes])
    return (
        <>
         {/* <h1>Input Form</h1>  */}
        <div className='container-form' >
            <div className='container-inner' >
                <FontAwesomeIcon className='button-close' onClick={closePopUp} icon={faXmark} size="xl" />
                <input  id='item' value={input.item} onChange={onChangeInput}  className='form-component' placeholder='nama barang' type='text'  />
                <input id='cost_buy' value={input.cost_buy} onChange={onChangeInput}  className='form-component' placeholder='harga beli' type='text' />
                <input id='cost_sell' value={input.cost_sell} onChange={onChangeInput}  className='form-component' placeholder='harga jual' type='text' />
                <input id='stock' value={input.stock} onChange={onChangeInput}  className='form-component' placeholder='stock' type='text' />
                <input 
                type="file" 
                accept='image/png, image/jpg' 
                name='img' 
                id='img' 
                // value={input.img} 
                onChange={uploadImage}  
                className='form-component' />
                
                <button onClick={onClickBut}>Input</button>
                {/* <button onClick={uploadImage}>tesImage</button> */}
            </div>
        </div>  
        </>
    );
}

export default InputForm;
