<template>
  <div id="dropzone" ref="dropzone"  @dragover="hoverIn" @dragleave="hoverOut" @drop="drop">
    <input type="file" accept="application/pdf" ref="input"  @change="submit"/>
  <!--   <svg class="lottie center" ref="lottie"></svg> -->
    <svg width="24" height="24"  xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke="#57b883" clip-rule="evenodd" class="checked hidden" ref="done"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm7 7.457l-9.005 9.565-4.995-5.865.761-.649 4.271 5.016 8.24-8.752.728.685z"/></svg>
    <div class="center" ref="hint">
      <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d6d6d6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="picto"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
      <p>Drop a file here to upload</p>
    </div>
    <div class="center hidden" ref="filename"></div>
  </div>

</template>

<script>
  // import lottie from 'lottie-web'
  // import checkedAnim from '@/assets/check_animation.json'
  export default {
    name: "Dropzone",
    // props: {
    //     msg: String
    // }
    // data () {
    //   return {
    //     checked: null
    //   }
    // },
    methods: {
      hoverIn: function() {
        dropzone.classList.add("hover");
      },
      hoverOut: function() {
        dropzone.classList.remove("hover");
      },
      drop: function() {
        dropzone.classList.remove("hover");
      },
      submit: function() {
        const file = this.$refs.input.files[0];
        // validate input file
        if (this.$refs.input.accept && this.$refs.input.accept.includes(file.type) == false) {
          return alert('File type not allowed.');
        }
        this.$refs.hint.classList.add("hidden");
        // display file name
        this.$refs.filename.innerHTML = `File: ${/[^\\]*$/.exec(this.$refs.input.value)[0]}`;
        this.$refs.filename.classList.remove("hidden");
         // kickoff upload
        fetch('https://fhirtest.uhn.ca/baseDstu3/Binary', { method: 'POST', body: file })
        .then(response => {
          console.log(response)
          if(response.status == 201) {
            this.$refs.done.classList.remove("hidden");
          }
        })
      }
    },
    mounted() {
    //   this.checked = lottie.loadAnimation(
    //   {
    //     container: this.$refs.lottie,
    //     renderer: 'svg',
    //     loop: false,
    //     autoplay: true,
    //     annimationData: checkedAnim
    //   });
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
    width: 300px;
    margin: 30px auto;
    text-align: center;
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

/*  .lottie {
    width:100px;
    height:100px;
  }*/

  .checked {
    position: absolute;
    top: 20%;
    left:50%;
    transform: translateX(-50%);
  }

</style>
