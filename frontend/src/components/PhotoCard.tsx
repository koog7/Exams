import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store.ts';
import { deletePhoto } from '../containers/Thunk/PhotoFetch.ts';

interface Photo {
    _id: string;
    title: string;
    photo: string;
    userId: {
        _id: string;
        displayName: string;
    };
}

const PhotoCard: React.FC<Photo> = ({_id , title , photo , userId}) => {

    const userData = useSelector((state: RootState) => state.User.user)
    const dispatch = useDispatch<AppDispatch>();

    const deleteCard = async (id:string) => {
        await dispatch(deletePhoto(id))
        location.reload()
    }

    return (
        <div key={_id} className="photo-card" style={{width:'300px'}}>
                <Link to={location.pathname.includes('/user')? `/photo/user/${_id}`: `/photo/${_id}`} className="photo-card__link">
                    <img src={`http://localhost:8000/images/${photo}`} alt={title} className="photo-card__image" width={'250px'} />
                </Link>
            <h3 className="photo-card__title">{title}</h3>
            <Link to={`/user/${userId._id}`} className={'photo-card__link'}>
                <p className="photo-card__uploader">Uploaded by: {userId.displayName}</p>
            </Link>

            {(userData?._id === userId._id && location.pathname === `/user/${userId._id}`) && (
                <button style={{backgroundColor:'red' , padding:'10px' , borderRadius:'10px' , border:'none' , marginLeft:'10px'}} onClick={() => deleteCard(_id)} className="photo-card__delete-button">
                    Удалить
                </button>
            )}

            {(userData?.role === 'admin') && (
                <button style={{backgroundColor:'red' , padding:'10px' , borderRadius:'10px' , border:'none' , marginLeft:'10px'}} onClick={() => deleteCard(_id)} className="photo-card__delete-button">
                    Удалить
                </button>
            )}
        </div>
    );
};

export default PhotoCard;