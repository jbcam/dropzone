<template>
  <div id="dropzone">
    <input type="file" accept="application/pdf"/>
    <div class="center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d6d6d6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="picto"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
      <p>Drop a file here to upload</p>
    </div>
    <div class="center hidden"></div>
  </div>
</template>

<script>
export default {
    name: "Dropzone",
    // props: {
    //     msg: String
    // }
    mounted: function initDropzone() {
      const dropzone = document.getElementById("dropzone");
      const input = document.querySelector("#dropzone input");
      const hint = document.querySelector("#dropzone .center");
      const filename = document.querySelector("div.center");

      dropzone.addEventListener('dragover', function(){
        dropzone.classList.add("hover");
      });

      dropzone.addEventListener('dragleave', function(){
        dropzone.classList.remove("hover");
      });

      //reset input in case of same file added
      input.addEventListener('drop', function(){
        dropzone.classList.remove("hover");
      });

      input.addEventListener('change', function(){
        const file = this.files[0];
        // validate input file
        if (this.accept && this.accept.includes(file.type) == false) {
          return alert('File type not allowed.');
        }
        hint.classList.add("hidden");
        // display file name
        filename.innerHTML = `File: ${/[^\\]*$/.exec(this.value)[0]}`;
        filename.classList.remove("hidden");
        });
    }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #dropzone {
    position: relative;
    border: 2px dashed #d6d6d6;
    font-family: 'Open Sans', sans-serif;
    color: #d6d6d6;
    height: 200px;
    margin: 30px auto;
    text-align: center;
    width: 300px;
  }

  #dropzone.hover {
    background: rgba(0,0,0,0.05);
  }

  #dropzone [type="file"] {
    cursor: pointer;
    position: absolute;
    opacity: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    z-index: 2;
  }

  .center {
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
  }

  .picto {
    width:60px;
    height:60px;
  }

  .hidden {
    display: none;
  }
</style>
