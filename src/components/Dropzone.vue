<template>
  <div class="container center">
    <div id="dropzone" :class="{ 'hover':hover }"
     @dragover="hover = true"
     @dragleave="hover=false"
     @drop="hover=false" >
      <input type="file" accept="application/pdf" ref="input" @change="submit" />
      <svg class="checked" ref="checked"></svg>
      <div v-if="!filename" class="center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d6d6d6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="picto">
          <polyline points="16 16 12 12 8 16"></polyline>
          <line x1="12" y1="12" x2="12" y2="21"></line>
          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
          <polyline points="16 16 12 12 8 16"></polyline>
        </svg>
        <p>Drop a file here to upload</p>
      </div>
      <div v-if="filename" class="center pt-10">{{ filename }}</div>
    </div>
    <DropzoneCounter :totalFiles=tf />
  </div>
</template>
<script>
  import DropzoneCounter from './DropzoneCounter';
  import lottie from 'lottie-web'
  import checkedAnim from '@/assets/check_animation.json'

  import BinaryService from '@/services/BinaryService'

  const binaryService = new BinaryService();

  export default {
    name: "Dropzone",
    components: {
      DropzoneCounter
    },
     props: {
        totalFiles: Number
    },
    data() {
      return {
        checked: null,
        hover: false,
        filename: null,
        isLoading: true,
        tf: this.totalFiles
      }
    },
    methods: {
        reset() {
          this.$refs.input.value = null;
          this.filename = null;
          this.checked.stop();
        },
        async submit() {
          const file = this.$refs.input.files[0];
          // validate input file
          if (this.$refs.input.accept && this.$refs.input.accept.includes(file.type) == false) {
              return alert('File type not allowed.');
          }
          this.filename = `File: ${/[^\\]*$/.exec(this.$refs.input.value)[0]}`;
          // kickoff upload
          const success = await binaryService.upload(file);
          if (success) {
            this.tf = await binaryService.findTotal();
            this.checked.play();
            setTimeout(this.reset, 3000);
          } else {
             alert('Oups something went wrong');
          }
        }
    },
    async mounted() {
      this.checked = lottie.loadAnimation(
      {
        container: this.$refs.checked,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: checkedAnim
      });
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    margin: 30px auto;
    width: 400px;
  }

  #dropzone {
    position: relative;
    border: 2px dashed #d6d6d6;
    height: 300px;
    text-align: center;
    margin-bottom: 30px;
  }

  #dropzone.hover {
    background: rgba(0, 0, 0, 0.05);
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

  .picto {
    width: 60px;
    height: 60px;
  }

  .checked {
    position: absolute;
    left: 50%;
    top: 5%;
    transform: translateX(-50%);
    width: 150px;
    height: 150px;
  }

  .pt-10 {
    padding-top: 10%;
  }
</style>
