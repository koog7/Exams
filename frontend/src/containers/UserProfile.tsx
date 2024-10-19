import { useEffect, useState } from 'react';
import { getAllPhoto, PhotoProps } from './Thunk/PhotoFetch.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store.ts';
import { useNavigate, useParams } from 'react-router-dom';
import PhotoCard from '../components/PhotoCard.tsx';
import PhotoModal from '../components/PhotoModal.tsx';

const UserProfile = () => {

    const dispatch = useDispatch<AppDispatch>();

    const AllPhotos = useSelector((state: RootState) => state.Photo.photo)
    const userData = useSelector((state: RootState) => state.User.user)
    const [usersPhoto, setUsersPhoto] = useState<PhotoProps[] | null>(null);
    const [selectedPhoto, setSelectedPhoto] = useState<PhotoProps | null>(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllPhoto());
    }, [dispatch]);

    useEffect(() => {
        const photo = AllPhotos.filter(photo => photo.userId._id === id);
        if(!photo) return;
        setUsersPhoto(photo);
    }, [AllPhotos]);


    useEffect(() => {
        if (id) {
            const photo = AllPhotos.find(photo => photo._id === id);
            if(!photo) return;
            setSelectedPhoto(photo);
        }
    }, [id, AllPhotos]);

    const closeModal = () => {
        setSelectedPhoto(null);
        navigate(`/user/${selectedPhoto?.userId._id}`);
    };

    const displayName = usersPhoto?.[0]?.userId?.displayName;

    return (
        <div >
            <h1 style={{marginLeft:'35px'}}>{displayName? displayName : null}'s gallery</h1>
            <div className="photo-gallery">
                {usersPhoto?.map((photo) => (
                    <PhotoCard photo={photo.photo} key={photo._id} userId={photo.userId} title={photo.title} _id={photo._id} />
                ))}
                {selectedPhoto && (
                    <PhotoModal
                        photo={selectedPhoto}
                        onClose={closeModal}
                    />
                )}
            </div>
        </div>
    );
};

export default UserProfile;