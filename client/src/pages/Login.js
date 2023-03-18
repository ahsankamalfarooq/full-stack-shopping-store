import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { login } from '../redux/apiCalls';
import {mobile} from "../responsive";



///////////////////////////////////////////////////////
const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://c4.wallpaperflare.com/wallpaper/306/797/84/adult-blur-fashion-girls-landscape-wallpaper-thumb.jpg")
      center;
    background-size : cover;
`;
///////////////////////////////////////////////////////
const Wrapper = styled.div`
    width:  25%;
    background-color: white;
    padding: 20px;
    ${mobile({ width: "75%" })}
`;
///////////////////////////////////////////////////////
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;
///////////////////////////////////////////////////////
const Form = styled.form`
    display: flex;
    flex-direction: column;
    /* margin: 10px 0px ;  */
    /* background-color: cyan; */
`;
///////////////////////////////////////////////////////
const Input = styled.input`
    padding: 10px;
    margin: 10px 0px;
    flex: 1;
    min-width: 40%;
`;
///////////////////////////////////////////////////////
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 13px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    & :disabled{
        color: green;
        cursor : not-allowed;
    }
`;
///////////////////////////////////////////////////////
const Link = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
    display: flex;
`;
////////////////////////////////////////////////////////

const Error = styled.span`
    color: red;
`


const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const {isFetching, error} = useSelector((state) => state.user)

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, {username, password})
    };

  return (
    <Container>
        <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
                <Input placeholder='username'  onChange={(e) => setUsername(e.target.value)} />
                <Input placeholder='password' type="password"  onChange={(e) => setPassword(e.target.value)} />
            </Form>
            <Button onClick={handleClick} disabled= {isFetching}>LOGIN</Button>
            {error && <Error>Some thing went wrong...</Error>}
            <Link>Forget Password ?</Link>
            <Link>CREATE A NEW ACCOUNT</Link>
        </Wrapper>
    </Container>
  )
}

export default Login