import React, { useEffect } from 'react';
import "./Card.css"
import axios from 'axios';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import Swal from 'sweetalert2'

const Card = ({item, isClickedEdit, setIsClickedEdit, currentData, setCurrentData}) => {
    const Swal = require(`sweetalert2`);

    // const element = <FontAwesomeIcon icon="fa-solid fa-trash" style={{color: "#9b3b3b",}} />

    const deleteCard = async(id)=>{
        try {
            const url = `http://localhost:8080/api/item-delete/${item.id}`
            const config = { "Content-Type" : "applicaton/json" }
        
            const notification = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });
            const result = await notification;
            if(result.isConfirmed){
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                  const response = await axios.delete(url,config);
                  console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        
    },[])

    const edit = ()=>{
     setIsClickedEdit(curr =>{ return !isClickedEdit } );
    setCurrentData(curr=>{
        return {...curr, 
            id:item.id,
            item:item.item, 
            cost_buy:item.cost_buy,
            cost_sell:item.cost_sell,
            stock:item.stock,
            img:item.img,
         }
    });

    }
   

    return (
    <div className='container-card' >
        <div className='container-image'>
            <img className='image-card' src={item.img} />
           
        </div>
        <FontAwesomeIcon className='delete-card' icon={faTrashCan} onClick={deleteCard} size='xl' />
        <FontAwesomeIcon className='edit-card' icon={faPenToSquare} size='xl' onClick={edit} />
        <div className="container-text">
            <h1>Item: {item.item}</h1>
            <p style={{marginTop:10}}>Cost Buy: <span style={{color:"red"}} >{item.cost_buy}</span></p>
            <p style={{marginTop:10}}>Cost Sell: <span style={{color:"green"}}>{item.cost_sell}</span></p>
            <p style={{marginTop:10}}>Stock: {item.stock}</p>
        </div>
     
    </div>
    );
}

export default Card;
