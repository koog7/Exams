import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store.ts';
import { useEffect, useState } from 'react';
import { getAllPhoto, PhotoProps } from './Thunk/PhotoFetch.ts';
import PhotoCard from '../components/PhotoCard.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import PhotoModal from '../components/PhotoModal.tsx';


const Home = () => {

    const dispatch = useDispatch<AppDispatch>();

    const AllPhotos = useSelector((state: RootState) => state.Photo.photo)
    const [selectedPhoto, setSelectedPhoto] = useState<PhotoProps | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllPhoto());
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            const photo = AllPhotos.find(photo => photo._id === id);
            if(!photo) return;
            setSelectedPhoto(photo);
        }
    }, [id, AllPhotos]);

    const closeModal = () => {
        setSelectedPhoto(null);
        navigate('/');
    };

    return (
        <div className="photo-gallery">
            {AllPhotos.map((photo) => (
                <PhotoCard photo={photo.photo} key={photo._id} userId={photo.userId} title={photo.title} _id={photo._id}  />
            ))}

            {selectedPhoto && (
                <PhotoModal
                    photo={selectedPhoto}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default Home;