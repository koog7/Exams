import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store.ts';
import { useEffect } from 'react';
import { getAllPhoto } from './Thunk/PhotoFetch.ts';
import PhotoCard from '../components/PhotoCard.tsx';


const Home = () => {

    const dispatch = useDispatch<AppDispatch>();

    const AllPhotos = useSelector((state: RootState) => state.Photo.photo)

    useEffect(() => {
        dispatch(getAllPhoto());
    }, [dispatch]);

    return (
        <div className="photo-gallery">
            {AllPhotos.map((photo) => (
                <PhotoCard photo={photo.photo} key={photo._id} userId={photo.userId} title={photo.title} _id={photo._id}  />
            ))}
        </div>
    );
};

export default Home;