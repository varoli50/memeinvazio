const iconHome = document.querySelector('.icon-home');
const userIcon = document.querySelector('.icon-user');
const logoutIcon = document.querySelector('.icon-logout');
const fileUpload = document.getElementById('fileUpload');
let meme = null;
const newMeme = document.querySelector('.newMeme')
const uploadButton = document.querySelector('.uploadButton')

iconHome.addEventListener('click', () =>{
    window.location.href='../html/home.html'
})
userIcon.addEventListener('click', () =>{
    window.location.href='../html/profile.html'
})
logoutIcon.addEventListener('click', logout)
fileUpload.addEventListener('change', selectPicture)
uploadButton.addEventListener('click', uploadMeme)

async function logout() {
    const response = await fetch('http://127.0.0.1:3000/api/auth/logout', {
        method:'POST',
        credentials:'include',


    })
    console.log(response)
    const data = await response.json();
    console.log(data)

    if( response.ok) {
        window.location.href = '../index.html'
    }
    else{
        alert('Hiba a kijelentkezéskor')
    }
}

function selectPicture(){
    const file = fileUpload.files[0];
    if (file) {
        meme= file;
        const reader = new FileReader();
        reader.onload =(event) =>{
            newMeme.style.backgroundImage= `url('${event.target.result}')`
        }
        reader.readAsDataURL(file)
    }
}
async function uploadMeme(){
    if(meme){
        const formData = new FormData;
        formData.append('meme', meme)
        console.log(formData)
        try {
            const response = await fetch('http://127.0.0.1:3000/api/memes/uploadMeme', {
                method:'POST',
                body: formData,
                credentials:'include'
            })
        } catch (error) {
            alert('Nem várt hiba!')
        }
    }
    else{
        alert('Válassz ki egy képet')
    }
}