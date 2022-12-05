export default function updatePreviewImage(){
    const [file] = document.getElementById("file").files;
    if (file) {
        document.getElementById("preview-image").src = URL.createObjectURL(file)
    }
}