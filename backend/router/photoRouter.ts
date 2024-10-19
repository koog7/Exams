import express from 'express';
import { imagesUpload } from '../multer';
import Photo from '../models/PhotoPublish';


const photoRouter = express.Router();
photoRouter.use(express.json());

photoRouter.post('/', imagesUpload.single('photo') , async (req, res, next) => {
    try{
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