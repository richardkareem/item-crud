import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Home.css"
import Card from '../Component/Card';
import InputForm from '../Component/InputForm';
import Swal from 'sweetalert2';



const Home = () => {


    const [ datas, setDatas ] = useState([]);
    const [isClicked,setIsClicked] = useState(false);
    const fetchData = async()=>{
        try {

           const {data,status}= await axios.get("http://localhost:8080/api/items");
           
           if(status === 200){
            // console.log(data);
            setDatas(data)
           }
    
        } catch (error) {
            console.log(error);
            
        }
    }
    const click = ()=>{
        setIsClicked(!isClicked);
    }

    const postData = async(img, item, costBuy, costSell, stock)=>{
        try {
            const url = "http://localhost:8080/api/create-item"; 
            const body = {
                "img": img,
                "item": item,
                "cost_buy": costBuy,
                "cost_sell": costSell,
                "stock": stock
            }
            const config = { "Content-type": "application/json" }
            const {data, status} = await axios.post(url,body,config);
        
            if(status ===201){
                Swal.fire({
                    icon:"success",
                    title: 'Success',
                    text: 'Success adding item',
                  })
            }
            
            console.log(data);
        } catch (error) {
            //error handler
            const { request } = error;
            const { status } = request;
            console.log(error);

            if(status === 400){
                Swal.fire({
                    icon: 'error',
                    title: 'Your Input Wrong',
                    text: 'Cost Buy, Cost Sell, and Stock must Number',
                  })
            }else if(status === 500){
                Swal.fire({
                    icon: 'error',
                    title: 'Item Already Inputed',
                    text: 'Cannot Input With Same Item`s Name',
                  })
            }
            
        }
    }

  
  

    useEffect(()=>{
        fetchData();
     
    },[])

    useEffect(()=>{
        fetchData();
    },[datas])
    return (
    <div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
        {isClicked ? <InputForm isClicked={isClicked} setIsClicked={setIsClicked} postData = {postData} /> : null}
        <h1>Pages Home</h1>
        <div className='container'>
            
            {datas.map((item)=>(
                <Card key={item.id} item={item}  />
            ))}

          
            
        </div>
        <button style={{background:"pink", alignSelf:"center"}} onClick={click}>Pop Up Input</button>
    </div>
    );
}

export default Home;
