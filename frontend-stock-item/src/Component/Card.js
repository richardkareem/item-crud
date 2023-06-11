import React from 'react';
import "./Card.css"
import axios from 'axios';

import Swal from 'sweetalert2'

const Card = ({item}) => {
    const Swal = require(`sweetalert2`);

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

    return (
    <div className='container-card' >
        <div className='container-image'>
            {/* <img className='image-card' src={item.img} /> */}
        </div>
        <button onClick={deleteCard} className='delete-card'>Click</button>
        <p>{item.id}</p>
        <p>Nama Barang: {item.item}</p>
        <p>Harga Beli: {item.cost_buy}</p>
        <p>Harga Jual: {item.cost_sell}</p>
        <p>Stock: {item.stock}</p>
    </div>
    );
}

export default Card;
