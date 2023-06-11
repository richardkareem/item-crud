import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Home.css"
import Card from '../Component/Card';
import InputForm from '../Component/InputForm';
import Swal from 'sweetalert2';
import EditForm from '../Component/SubComponent/EditForm';





const Home = () => {


    const [ datas, setDatas ] = useState([]);
    const [isClicked,setIsClicked] = useState(false);
    const [ isClickedEdit, setIsClickedEdit ] = useState(false);
    const [ currentData, setCurrentData ] = useState({
            "id":"",
            "img": "",
            "item": "",
            "cost_buy": "",
            "cost_sell": "",
            "stock": ""
    })
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

    const editData = async(stock, id)=>{
        try {
            id = currentData.id;
            stock = currentData.stock;
            const url = `http://localhost:8080/api/item/${id}`;
            const config = {"Content:Type":"application/json"};
            const body = {
             "stock": stock
            }
            const {data, status } = await axios.put(url,body,config);
            if(status === 201){
                Swal.fire({
                    icon:"success",
                    title: 'Success',
                    text: 'Success Edit item',
                  })
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    // const editData = async(img, item, costBuy, costSell,stock)=>{
    //     try {
    //         const url = "http://localhost:8080/api/item/1";
    //         const config = {"Content:Type":"application/json"};
    //         const body = {
    //             "img": img,
    //             "item": item,
    //             "cost_buy": costBuy,
    //             "cost_sell": costSell,
    //             "stock": stock
    //         }
    //         const data = await axios.put(url,body,config);
    //         console.log(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const tes = (id)=>{
        console.log("your id is "+ id);
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
        {isClickedEdit ? 
        <EditForm 
        editData={editData}
        setIsClickedEdit={setIsClickedEdit} 
        isClickedEdit={isClickedEdit} 
        setCurrentData={setCurrentData}
        currentData={currentData}
        
        /> : null }
        {/* {isClickedEdit ? } */}
        <h1 style={{textAlign:"center"}}>Input Item Website</h1>
        <div className='container'>
            
            {datas.map((item)=>(
                <Card key={item.id} 
                item={item} 
                setIsClickedEdit={setIsClickedEdit} 
                isClickedEdit={isClickedEdit}  
                currentData={currentData}
                setCurrentData={setCurrentData}
                />
            ))}

          
            
        </div>

        <button style={{background:"pink", alignSelf:"center"}} onClick={click}>Pop Up Input</button>
    </div>
    );
}

export default Home;
