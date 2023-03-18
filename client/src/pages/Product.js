import { Add, Remove } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import { addProduct } from '../redux/cartRedux';
import { publicRequest } from '../requestMethods';
import { mobile } from "../responsive";
import { useDispatch } from 'react-redux';



/////////////////////////////////////////////////////////
const Container = styled.div`

`;
/////////////////////////////////////////////////////////
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    /* background-color: magenta; */
    ${mobile({ padding: "10px", flexDirection:"column" })}


`;
/////////////////////////////////////////////////////////
const ImgContainer = styled.div`
    flex: 1;
`;
/////////////////////////////////////////////////////////
const Img = styled.img`
    /* width: 100%;
    height: 90vh; */
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: "40vh" })}
`;
/////////////////////////////////////////////////////////
const InfoContainer = styled.div`
    flex : 1;
    padding: 0px 50px;
    ${mobile({ padding: "10px" })}
`;
/////////////////////////////////////////////////////////
const Title = styled.h1`
    font-weight: 200;
`;
/////////////////////////////////////////////////////////
const Desp = styled.p`
    padding: 20px 0px;
`;
/////////////////////////////////////////////////////////
const Price = styled.span`
    font-size: 40px;
    font-weight: 100;
`;
/////////////////////////////////////////////////////////
const FilterContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    padding: 30px 0px;
    /* background-color: cyan; */
    ${mobile({ width: "100%" })}
`;
/////////////////////////////////////////////////////////
const Filter = styled.div`
    /* background-color: pink; */
    display: flex;
    align-items: center;
    padding-right: 20px;
`;
const FilterText = styled.div`
    font-weight: 200;
    font-size: 20px;

`;
/////////////////////////////////////////////////////////
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0px 5px;
    cursor: pointer;
`;
/////////////////////////////////////////////////////////
const Select = styled.select`
    padding: 5px;
    margin-left: 10px;
`;
/////////////////////////////////////////////////////////
const SelectOption = styled.option`

`;
/////////////////////////////////////////////////////////
const CountContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
    align-items: center;
    ${mobile({ width: "100%" })}
`;
/////////////////////////////////////////////////////////
const Counter = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;

`;
/////////////////////////////////////////////////////////
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;
/////////////////////////////////////////////////////////
const Button = styled.button`
        padding: 15px;
        border: 2px solid teal;
        background-color: white;
        cursor: pointer;
        font-weight: 500;
        &:hover{
            background-color: #f8f4f4;
        }

`;
/////////////////////////////////////////////////////////


const Product = () => {

    const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [products, setProducts] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState("")
  const [size, setSize] = useState("")
  const dispatch = useDispatch();


  useEffect(() => {
    const getProducts = async() => {
        try{
            const res = await publicRequest.get("/products/find/" + id)
            setProducts(res.data) 
            console.log(res)
            } catch(err) {
            }
        };
        getProducts();
  },[id]);

  const handleQuanttiy = (type) => {
    if(type === "dec") {
       quantity>1 && setQuantity(quantity-1)
    } else{
        setQuantity(quantity+1)
    }
  };


  const handleClick = () => {
    //update catergory
    dispatch(
        addProduct({...products, quantity, color, size})
        // addProduct({products : products, quantity : quantity, price : products.price * quantity})
    )
  }


  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <ImgContainer>
                <Img src = {products.img}/>
            </ImgContainer>
{/* ////////////////////////////////////////////////// */}
            <InfoContainer>
                <Title>{products.title}</Title>
                <Desp>{products.desc}</Desp>
                <Price>$ {products.price}</Price>
                <FilterContainer>
                    <Filter>
                        <FilterText>Color </FilterText>
                        {products.color?.map((c) => (
                            <FilterColor color={c} key = {c} onClick={()=>setColor(c)}/>
                        ))}
                    </Filter>
                    <Filter>
                        <FilterText>Size</FilterText>
                        <Select onChange={(e)=> setSize(e.target.value)}>
                            {products.size?.map((s) => (
                                <SelectOption key={s}>{s}</SelectOption>
                            ))}
                        </Select>
                    </Filter>
                </FilterContainer>
                <CountContainer>
                    <Counter>
                        <Remove onClick = {() => handleQuanttiy("dec")}/>
                        <Amount>{quantity}</Amount>
                        <Add onClick = {() => handleQuanttiy("inc")} />
                    </Counter>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                </CountContainer>

            </InfoContainer>
        </Wrapper>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default Product
