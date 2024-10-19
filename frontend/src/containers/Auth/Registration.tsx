import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { loginUser } from '../Thunk/AuthFetch.ts';


const Registration = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const urlFile = useRef(null);
    const [file, setFile] = useState<File | null>(null);
    const error = useSelector((state: RootState) => state.User.error);

    const [login, setLogin] = useState({
        email: '',
        displayName: '',
        password: '',
    });
    const [isValid, setIsValid] = useState(false);


    useEffect(() => {
        if (login.email.length > 0 && login.password.length > 0 && login.displayName.length > 0 && file) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [login.email, login.password,login.displayName, file]);

    const submitData = async (e: React.FormEvent) => {
        e.preventDefault();

        const dis = await dispatch(loginUser({email:login.email, displayName: login.displayName, password: login.password , avatar: file}));
        if(dis.type === 'users/singIn/rejected'){
            return;
        }else{
            navigate('/');
        }
    };
    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target.files;

        if (fileInput && fileInput[0]) {
            setFile(fileInput[0]);
        } else {
            setFile(null);
        }
    };

    return (
        <div style={{marginLeft: '440px'}}>
            <h2 style={{marginLeft:'17px'}}>Sign Up</h2>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '300px',
                    marginLeft: '-107px',
                    gap: 2,
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label="Email"
                    variant="filled"
                    fullWidth
                    value={login.email}
                    onChange={(e) =>
                        setLogin({ ...login, email: e.target.value })
                    }
                    InputProps={{
                        style: { backgroundColor: 'white' },
                    }}
                />
                <TextField
                    label="Display name"
                    variant="filled"
                    fullWidth
                    value={login.displayName}
                    onChange={(e) =>
                        setLogin({ ...login, displayName: e.target.value })
                    }
                    InputProps={{
                        style: { backgroundColor: 'white' },
                    }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="filled"
                    fullWidth
                    value={login.password}
                    onChange={(e) =>
                        setLogin({ ...login, password: e.target.value })
                    }
                    InputProps={{
                        style: { backgroundColor: 'white' },
                    }}
                />

                <input ref={urlFile} accept="image/*" onChange={onFileChange} type={"file"} style={{ marginTop: '20px',  color:'black' }} required />
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#6CB4EE',
                        color: 'black',
                        '&:hover': {
                            backgroundColor: '#63aae0',
                        },
                    }}
                    onClick={submitData}
                    disabled={!isValid}
                    fullWidth>
                    Enter
                </Button>
                {error && (
                    <div style={{color:'red'}}>{error}</div>
                )}
            </Box>
        </div>
    );
};

export default Registration;