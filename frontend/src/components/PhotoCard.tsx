import React from 'react';
import { Link } from 'react-router-dom';

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
    return (
        <div key={_id} className="photo-card" style={{width:'300px'}}>
                <Link to={location.pathname.includes('/user')? `/photo/user/${_id}`: `/photo/${_id}`} className="photo-card__link">
                    <img src={`http://localhost:8000/images/${photo}`} alt={title} className="photo-card__image" width={'250px'} />
                </Link>
            <h3 className="photo-card__title">{title}</h3>
            <Link to={`/user/${userId._id}`} className={'photo-card__link'}>
                <p className="photo-card__uploader">Uploaded by: {userId.displayName}</p>
            </Link>
        </div>
    );
};

export default PhotoCard;