
import { ChangeEvent, useState } from "react";
import styled from "styled-components";


type FormInput = {
    id: number;
    placeholder: string;
    label: string;
    value: string;
    name: string;
    type: string;
    errorMessage: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => any;
};

const FormInputContainer = styled.div`
  input:invalid[focused="true"] ~ span {
    display: block;
  }
  input {
    padding: 12px;
    margin-bottom: 10px;
    border: 1px solid lightgray;
  }
`;

const Error = styled.span`
  font-size: 15px;
  padding: 3px;
  color: red;
  display: none;
`;


const FormInputLabel = styled.label`
    font-size: 14px;
    color: gray;
`;

const FormInputDiv = styled.div`
     display: flex;
     padding: .5rem 0 .5rem;
    flex-direction: column;
`
const FormInputNew = (props: FormInput) => {
    const [focus, setFocus] = useState(false);
    const { label, onChange, errorMessage, id, ...otherProps } = props;
    const handleFocus = () => {
        setFocus(true);
    };
    return (
        <FormInputContainer>
            <FormInputDiv>
                <FormInputLabel htmlFor={props.name}>{label}</FormInputLabel>
                {
                    <input
                        {...otherProps}
                        onChange={onChange}
                        onBlur={handleFocus}
                        //@ts-ignore
                        focused={focus.toString()}
                    />

                }


                <Error>{errorMessage}</Error>
            </FormInputDiv>
        </FormInputContainer>
    );
};

export default FormInputNew;