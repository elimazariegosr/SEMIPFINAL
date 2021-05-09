
let vas;
function activar_cam(){
  vas = navigator.mediaDevices.getUserMedia({video: true}).then((stream)=>{
    let video = document.getElementById("espejo");
    if(document.getElementById("espejo") != null){
      video = document.getElementById("espejo");
      video.srcObject = stream;
    }
  }).catch((err)=>console.log(err))
}
function desactivar_cam(){
  if(vas != null){
    location.reload()
  }
}