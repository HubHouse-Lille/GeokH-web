
function previewFile() {
  var preview = document.getElementById("imgPreview");
  var newPhoto = document.getElementById("newPhoto");
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
    newPhoto.value = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}
