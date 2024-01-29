import axios from "axios";

export const fileUpload = async (file: File) => {
    try {
        if (!file) throw new Error("File not found");
        const cloudUrl = `https://api.cloudinary.com/v1_1/dx04ntgki/image/upload`;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'react_curso-journal');

        const response = await axios.post(cloudUrl, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            maxBodyLength: Infinity,
        });
        const {data,statusText} = response;

        if(statusText !== "OK") return{ok:false,error:"No se se almaceno nada"}

        return  data.secure_url
    } catch (error) {
        return {
            ok: false,
            error
        }
    }


}