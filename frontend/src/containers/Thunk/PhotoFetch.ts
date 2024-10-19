import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosAPI from '../../axios/AxiosAPI.ts';

interface PhotoData {
    title: string;
    userId: string;
    photo: File | null;
}
export interface PhotoProps {
    _id: string;
    title: string;
    photo:string;
    userId: {
        _id: string;
        displayName: string;
    };
}

interface PhotoState {
    photo: PhotoProps[];
    loader: boolean;
    error: string | null;
}
const initialState: PhotoState = {
    photo:[],
    loader: false,
    error: null,
};

export const getAllPhoto = createAsyncThunk<PhotoProps[] , void>('photos/getAll' , async () =>{
    const response = await axiosAPI.get('/photo');
    return response.data;
});

export const deletePhoto = createAsyncThunk<void , string>('photos/delete' , async (id:string) =>{
    await axiosAPI.delete(`/photo/${id}`);
});

export const postPhoto = createAsyncThunk<void, PhotoData , { rejectValue: string }>('photos/createPost', async (PhotoData ,{rejectWithValue}) =>{
    try{
        const formData = new FormData();
        formData.append('userId', PhotoData.userId);
        formData.append('title' , PhotoData.title);

        if (PhotoData.photo) {
            formData.append('photo', PhotoData.photo);
        }

        await axiosAPI.post('/photo', formData);
    }catch(error){
        return rejectWithValue(`An unknown ${error} occurred`);
    }
});

export const PhotoSlice = createSlice({
    name: 'Photo',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(postPhoto.pending, (state: PhotoState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(postPhoto.fulfilled, (state: PhotoState) => {
            state.loader = false;
            state.error = null;
        });
        builder.addCase(postPhoto.rejected, (state: PhotoState , action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
        builder.addCase(getAllPhoto.pending, (state: PhotoState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(getAllPhoto.fulfilled, (state: PhotoState , action) => {
            state.photo = action.payload;
            state.loader = false;
            state.error = null;
        });
        builder.addCase(getAllPhoto.rejected, (state: PhotoState , action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
        builder.addCase(deletePhoto.pending, (state: PhotoState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(deletePhoto.fulfilled, (state: PhotoState) => {
            state.loader = false;
            state.error = null;
        });
        builder.addCase(deletePhoto.rejected, (state: PhotoState , action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
    }
});

export const PhotosReducer = PhotoSlice.reducer;