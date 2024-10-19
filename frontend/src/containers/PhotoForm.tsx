import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store.ts';
import { postPhoto } from './Thunk/PhotoFetch.ts';
import { useNavigate } from 'react-router-dom';

const PhotoForm = () => {

    const urlFile = useRef(null);
    const [file, setFile] = useState<File | null>(null);
    const [text, setText] = useState<string>('');
    const [isValid, setIsValid] = useState(false);
    const userData = useSelector((state: RootState) => state.User.user);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    useEffect(() => {
        if (text.length > 0 && file) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [text, file]);

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target.files;

        if (fileInput && fileInput[0]) {
            setFile(fileInput[0]);
        } else {
            setFile(null);
        }
    };

    const onFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!userData) return;
        await dispatch(postPhoto({title: text , userId: userData._id , photo: file}));
        navigate('/');
    };

    return (
        <div className="form-container">
            <form onSubmit={onSubmit}>
                <label htmlFor="text" className="form-label">Photo Name</label>
                <input value={text} onChange={onFieldChange} type="text" name="text" placeholder="Enter a text" className="form-input" />

                <label htmlFor="text" className="form-label">Choose photo</label>
                <input ref={urlFile} accept="image/*" onChange={onFileChange} type="file" className="form-file-input" />
                <button type="submit" className="form-submit" disabled={!isValid}>Submit</button>
            </form>
        </div>
    );
};

export default PhotoForm;