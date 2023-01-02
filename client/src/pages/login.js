import {useContext, useState} from 'react';
// When register is created, we needto call AuthProvider function
import { AuthContext } from '../context/authContext'; 
import {useForm} from "../utility/hooks";
import {useMutation} from "@apollo/react-hooks";
import {gql} from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import {TextField, Button, Container, Stack, Alert} from "@mui/material";
import {StyleSheets} from 'react-native';



const LOGIN_USER = gql`

    mutation Mutation($loginInput: loginInput) {
        loginUser(loginInput: $loginInput) {
            email 
            login
            firstname
            lastname
            token
        }
    }

`

function Login(props){
    let navigate = useNavigate();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState([]);

    const STUDENT_EMAIL = new RegExp('^[a-z0-9](\.?[a-z0-9]){5,}@k(nights)?nights\.ucf\.edu$');
    const PROFESSOR_EMAIL = new RegExp('^[a-z0-9](\.?[a-z0-9]){5,}@ucf\.edu$');
    const PROFESSOR_EMAIL_TEST = new RegExp('^[a-z0-9](\.?[a-z0-9]){5,}@gmail\.com$');

    function loginUserCallback(){
        loginUser();
    }

    const {onChange, onSubmit, values} = useForm(loginUserCallback,{
        email:"",
        password:""
    });

    const [loginUser, {loading}]  = useMutation(LOGIN_USER,{
        update(proxy,{data:{loginUser: userData}}){
            context.login(userData);

            if(STUDENT_EMAIL.test(userData.email)){
                // go to student page 
                navigate('/student');
            }else if(PROFESSOR_EMAIL_TEST.test(userData.email)){
                // go to professor page 
                navigate('/');
            }
        },
        onError({graphQLErrors}){
            setErrors(graphQLErrors);
        },
        variables:{loginInput:values}
    });

    return(
        // coding front end part 
        <Container spacing={2} maxWidth="sm">
            <h3>Login</h3>
            <Stack spacing={2} paddingBottom={2}>
                <TextField
                    label="Email"
                    name="email"
                    onChange={onChange}
                />
                <TextField
                    type="password"
                    label="Password"
                    name="password"
                    onChange={onChange}
                />
            </Stack>
            {errors.map(function(error){
                return(
                    <Alert severity="error">
                        {error.message}
                    </Alert>
                )
            })}
            <Button variant="contained" onClick={onSubmit}>Login</Button>
        </Container>


    )
}

export default Login;