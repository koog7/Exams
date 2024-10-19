import { NavLink } from 'react-router-dom';

interface Photo {
    _id: string;
    title: string;
    photo: string;
    userId: {
        _id: string;
        displayName: string;
    };
}
interface PhotoModalProps {
    photo: Photo;
    onClose: () => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <h2>{photo.title} </h2><span>Uploaded by:<NavLink style={{textDecoration:'underline black' , color:'black'}} to={`/user/${photo.userId._id}`} >{photo.userId.displayName}</NavLink></span>
                </div>

                <img
                    src={`http://localhost:8000/images/${photo.photo}`}
                    alt={photo.title}
                    className="modal-image"
                />
                <button onClick={onClose} className="modal-close-button">Close</button>
            </div>
        </div>
    );
};

export default PhotoModal;