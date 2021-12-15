class ImageUploader {
    async upload(file: any) {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'p0m3n8us');
        const result = await fetch('https://api.cloudinary.com/v1_1/ucamtu/upload', {
            method: 'POST',
            body: data,
        });
        return await result.json();
    }
}

export default ImageUploader;
