import { useState } from 'react';
import loginFields from './constants';
import FormAction from './FormAction';
import FormExtra from './FormExtra';
import Input from "./Input";

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }
    const authenticateUser = () =>{

    }


    return(
        <div className='flex justify-center'>
            <form className="space-y-3 py-4 bg-red">
            <div className="-space-y-5px">
                {
                    fields.map(field=>
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={loginState[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                        />
                    
                    )
                }
            </div>
                
            <FormExtra/>
            <FormAction handleSubmit={handleSubmit} text="Login"/>

        </form>
      </div>
    )
}