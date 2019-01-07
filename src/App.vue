<template>
    <div id="app">
        <svg class="center" ref="loading" width="200" height="200"></svg>
        <Dropzone :initialTotalFiles=totalFiles v-if="loaded" />
    </div>
</template>
<script>
import Dropzone from "./components/Dropzone.vue";
import lottie from 'lottie-web'
import loadingAnim from '@/assets/simple_loader.json'
import BinaryService from '@/services/BinaryService'

const binaryService = new BinaryService();
export default {
    name: "app",
    components: {
        Dropzone
    },
    data() {
        return {
            totalFiles: null,
            loaded: null
        }
    },
    async mounted() {
        const loading = lottie.loadAnimation({
            container: this.$refs.loading,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: loadingAnim
        });
        this.totalFiles = await binaryService.findTotal();
        loading.stop();
        this.loaded = true;
    }
};
</script>
<style>
#app {
    font-family: 'Open Sans', sans-serif;
    color: #d6d6d6;
}

.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
