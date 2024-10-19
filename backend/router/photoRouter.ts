import express from 'express';
import { imagesUpload } from '../multer';
import Photo from '../models/PhotoPublish';
import authCheck, { RequestWithUser } from '../middleware/authCheck';


const photoRouter = express.Router();
photoRouter.use(express.json());

photoRouter.get('/' , async (req, res) => {
    const allPhotos = await Photo.find().populate('userId' , 'displayName')
    return res.status(200).json(allPhotos)
})

photoRouter.post('/', imagesUpload.single('photo') , async (req, res, next) => {
    try{
        const { userId, title } = req.body;
        const photoName = req.file?.filename;

        if (!userId || !title || !photoName) {
            return res.status(400).send({error: 'The fields should not be empty'});
        }

        const photo = new Photo({
            userId: req.body.userId,
            title: req.body.title,
            photo: req.file?.filename,
        });

        await photo.save()
        res.send(photo)
    }catch(err){
        next(err);
    }
})

photoRouter.delete('/:id', authCheck , async (req, res, next) => {
    const photoId = req.params.id;
    const user = (req as RequestWithUser).user

    if(!user) return res.status(400).send({error:'User not found'})

    try {
        const photo = await Photo.findById(photoId)

        if (!photo) {
            return res.status(404).send({message: 'Photo not found'});
        }

        if (user.role !== 'admin' && photo.userId.toString() !== user._id.toString()) {
            return res.status(403).json({message: 'Access denied'});
        }

        await Photo.findByIdAndDelete(photoId)
    }catch(err){
        next(err);
    }

    await Photo.findOneAndDelete({_id: photoId})
    return res.status(200).send({message: 'Success'});
})

export default photoRouter;