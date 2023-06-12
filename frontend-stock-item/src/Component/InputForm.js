import React, { useEffect, useState } from 'react';
import {storage} from "../firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import "./InputForm.css"

import Swal from 'sweetalert2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';



const InputForm = ({isClicked, setIsClicked, postData}) => {
    const [tes,setTes]= useState([]);
    const [ imageUpload, setImageUpload ] = useState(null);
    const [input, setInput] = useState({
        item:"",
        cost_buy:"",
        cost_sell:"",
        stock:"",
        img:""
     });

     //upload into firestore
     const uploadImage = async (e)=>{
        try {
            const fileName = e.target.files[0].name;
            const size = e.target.files[0].size;
            console.log(size);
            if (size < 100000){
                const storageRef = ref(storage,`${fileName}`)
                const snapshot = await uploadBytes(storageRef, e.target.files[0]); //dataFile
                
                const downloadUrl = await getDownloadURL(storageRef);
                setInput(currInput =>{
                    return {...currInput, img:downloadUrl}
                })
                console.log(downloadUrl);
            }else{
                Swal.fire({
                    icon:"error",
                    title: 'Error',
                    text: 'Item do not less than 100kb',
                  })
            }
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
   
    //  useEffect(()=>{
    //     console.log(tes);
    //  },[tes])
    return (
        <div  className="parent-container-input">
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
                onChange={uploadImage}
                name='img'  
                className='form-component' />
           
                <button onClick={onClickBut} style={{marginTop:20}} className='button-popout'>Input</button>
                {/* <button onClick={uploadImage}>tesImage</button> */}
            </div>
        </div>  
        </div>
    );
}

export default InputForm;
