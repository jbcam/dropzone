<template>
    <div class="container center">
        <div id="dropzone" :class="{ 'hover':hover }" @dragover="hover = true" @dragleave="hover=false" @drop="hover=false">
            <input type="file" accept="application/pdf" ref="input" @change="getFile" />
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
            <div v-if="filename" class="center pt-80">{{ filename }}</div>
        </div>
        <DropzoneCounter :totalFiles=tf />
        <DropzoneSettings />
    </div>
</template>
<script>
import DropzoneCounter from './DropzoneCounter';
import DropzoneSettings from './DropzoneSettings';
import lottie from 'lottie-web';
import checkedAnim from '@/assets/check_animation.json'
import chokidar from 'chokidar';
import BinaryService from '@/services/BinaryService';
const binaryService = new BinaryService();
const fs = require('fs');

export default {
    name: "Dropzone",
    components: {
        DropzoneCounter,
        DropzoneSettings
    },
    props: {
        initialTotalFiles: Number
    },
    data() {
        return {
            checked: null,
            hover: false,
            filename: null,
            isLoading: true,
            tf: this.initialTotalFiles,
            watcher: null
        }
    },
    methods: {
        reset() {
            if (this.$refs.input) {
                this.$refs.input.value = null;
            }
            this.filename = null;
            this.checked.stop();
        },
        async submit(file) {
            // kickoff upload
            const success = await binaryService.upload(file);
            if (success) {
                this.tf = await binaryService.findTotal();
                this.checked.play();
                setTimeout(this.reset, 3000);
            } else {
                alert('File was not uploaded - Please check your internet connection');
            }

        },
        getFile() {
            const file = this.$refs.input.files[0];
            // validate input file
            if (this.$refs.input.accept && this.$refs.input.accept.includes(file.type) == false) {
                return alert('File type not allowed.');
            }
            this.filename = `File: ${/[^\\|^/]*$/.exec(this.$refs.input.value)[0]}`;
            this.submit(file)
        },
        startWatcher: function(path) {
            this.watcher = chokidar.watch(`${path}/*.pdf`, {
                usePolling: true,
                interval: 200,
                ignoreInitial: true
            });

            const submit = (path) => {
                fs.readFile(path, (err, data) => {
                    if (err) throw err;
                    this.filename = `File: ${/[^\\|^/]*$/.exec(path)[0]}`;
                    this.submit(data);
                });
            }

            // Declare the listeners of the watcher
            this.watcher
                .on('add', (path, stats) => {
                    console.log('File', path, 'has been added');
                    if (stats.size < 2000000) {
                        submit(path);
                    }
                })
                .on('change', (path, stats) => {
                    console.log('File', path, 'has been changed');
                    if (stats.size < 2000000) {
                        submit(path);
                    }
                })
                .on('error', (error) => {
                    console.log('Error happened', error);
                })
        },
    },
    async mounted() {
        this.checked = lottie.loadAnimation({
            container: this.$refs.checked,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: checkedAnim
        });
    },
    beforeDestroy() {
        this.watcher.close();
    }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container {
    /*margin: 0 auto;*/
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

.item {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: start;
    border-top: 1px solid #d6d6d6;
}

.pt-80 {
    padding-top: 80px;
}

.pl-15 {
    padding-left: 15px;
}

.btn {
    color: #999999;
    border: 1px solid #999999;
    padding: 8px 10px;
    border-radius: 4px;
    font-weight: lighter;
    opacity: 0.6;
    margin: 13px 0 10px 15px;
}

.btn:hover {
    opacity: 1;
    text-decoration: none;
    color: #999999;
}

.btn:focus {
    outline: none;
}
</style>
