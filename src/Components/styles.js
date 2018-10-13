import styled from "styled-components";
import style from "react-awesome-modal/lib/style";

export const ButtonContainer = styled.div`
  position: relative;
  height: 40px;
  background: red;
`

export const Button = styled.button`
    direction: ltr;
    overflow: hidden;
    text-align: center;
    height: 40px;
    display: table-cell;
    vertical-align: middle;
    position: relative;
    color: rgb(86, 86, 86);
    font-family: Roboto, Arial, sans-serif;
    user-select: none;
    font-size: 18px;
    background-color: rgb(255, 255, 255);
    padding: 0px 17px;
    border-bottom-right-radius: 2px;
    border-top-right-radius: 2px;
    background-clip: padding-box;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
    min-width: 57px;
    border-left: 0px;
`

export const FormContainer = styled.div`
  padding: 10px;
`

export const AddNewTitle = styled.h1`
  text-align:center;
`

export const InputText = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
`

export const InputButton = styled.input`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
`