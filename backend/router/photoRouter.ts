import express from 'express';
import { imagesUpload } from '../multer';
import Photo from '../models/PhotoPublish';


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

export default photoRouter;