import React from 'react';
import "./EditForm.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const EditForm = ({setIsClickedEdit, isClickedEdit, currentData, setCurrentData, editData}) => {

    const closePopUp = ()=>{
        setIsClickedEdit(!isClickedEdit);
    }

    const onChangeInput = (e)=>{
        setCurrentData(curr=>{
            return{...curr, [e.target.id]:e.target.value}
        })
    }


    return (
        <>
        {/* <h1>Input Form</h1>  */}
       <div className='container-form' >
           <div className='container-inner' >

               <FontAwesomeIcon className='button-close' onClick={closePopUp} icon={faXmark} size="xl" />
               
               <input id='item' value={currentData.item} onChange={onChangeInput}  className='form-component' placeholder='nama barang' type='text'  />
               <input id='cost_buy' value={currentData.cost_buy}  onChange={onChangeInput} className='form-component' placeholder='harga beli' type='text' />
               <input id='cost_sell' value={currentData.cost_sell} onChange={onChangeInput}  className='form-component' placeholder='harga jual' type='text' />
               <input id='stock' value={currentData.stock} onChange={onChangeInput} className='form-component' placeholder='stock' type='text' />
               <input 
               type="file" 
               accept='image/png, image/jpg' 
               name='img' 
               id='img' 
               // value={input.img} 
            //    onChange={uploadImage}  
               className='form-component' />
               <button onClick={editData}>Input</button>
               {/* <button onClick={uploadImage}>tesImage</button> */}
           </div>
       </div>  
       </>
    );
}

export default EditForm;
