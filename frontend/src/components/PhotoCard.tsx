import React from 'react';

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
            <img src={`http://localhost:8000/images/${photo}`} alt={title} className="photo-card__image" width={'200px'} />
            <h3 className="photo-card__title">{title}</h3>
            <p className="photo-card__uploader">Uploaded by: {userId.displayName}</p>
        </div>
    );
};

export default PhotoCard;