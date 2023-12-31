import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Home.css"
import Card from '../Component/Card';
import InputForm from '../Component/InputForm';
import Swal from 'sweetalert2';
import EditForm from '../Component/SubComponent/EditForm';
import { useNavigate } from 'react-router-dom';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {

    const navigate = useNavigate();

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
    const logout = ()=>{
       localStorage.clear();
       console.log("KELUAR");
       navigate("/login");
       
    }
    const fetchData = async()=>{
        try {
            const token = localStorage.getItem("token");
            const url = "http://localhost:8080/api/items";
            const config = {
                headers:
                {
                    "Content-Type":"application/json",
                    Authorization : `Bearer ${token}`
                }
            }
           const {data,status}= await axios.get(url,config);
           
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
            const token = localStorage.getItem("token");
            const url = "http://localhost:8080/api/create-item"; 
            const body = {
                "img": img,
                "item": item,
                "cost_buy": costBuy,
                "cost_sell": costSell,
                "stock": stock
            }
            const config = {
                headers:
                {
                    "Content-Type":"application/json",
                    Authorization : `Bearer ${token}`
                }
            };
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

    const editData = async(id, costBuy, costSell, stock, img)=>{
        try {
            const token = localStorage.getItem("token");
            id = currentData.id;
            stock = currentData.stock;
            costBuy = currentData.cost_buy;
            costSell = currentData.cost_sell;
            const url = `http://localhost:8080/api/item/${id}`;
            const config = {
                headers:
                {
                    "Content-Type":"application/json",
                    Authorization : `Bearer ${token}`
                }
            };
            let isCorrect = false;
            const body = {
                "img": img,
                "cost_buy": costBuy,
                "cost_sell": costSell,
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
            const { request } = error;
            const { status } = request;
            if (status === 400 ) {
                Swal.fire({
                    icon: 'error',
                    title: 'Your Input Wrong',
                    text: 'Cost Buy, Cost Sell, and Stock must Number',
                  })
            }
            // console.log(error);
        }
    }
    useEffect(()=>{
        fetchData();
     
    },[])

    useEffect(()=>{
        fetchData();
    },[datas])
    return (
    <div style={{display:"flex", justifyContent:"center", flexDirection:"column", height:"100vh", backgroundColor:"#fccf03"}}>
        <FontAwesomeIcon onClick={logout} className='logout-button' icon={faRightFromBracket} size='2xl' />
        {isClicked ? <InputForm isClicked={isClicked} setIsClicked={setIsClicked} postData = {postData} />  : null}
        {isClicked ? document.body.style.overflow="hidden" : null}
        {isClickedEdit ? 
        <EditForm 
        editData={editData}
        setIsClickedEdit={setIsClickedEdit} 
        isClickedEdit={isClickedEdit} 
        setCurrentData={setCurrentData}
        currentData={currentData}
        
        /> : null }
        {isClickedEdit ? document.body.style.overflow = "hidden" : null }
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
     
        <button style={{ marginTop:10,}} className='button-popout' onClick={click}  > Input Item</button>
      
        {/* <button style={{background:"pink", alignSelf:"center"}} onClick={click}>Pop Up Input</button> */}
    </div>
    );
}

export default Home;
