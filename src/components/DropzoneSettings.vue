<template>
    <div class="item">
        <button class="btn" @click="setWatchfolder">Set watchfolder</button>
        <p class="pl-15">{{ watchfolderPath }}</p>
    </div>
</template>
<script>
import Store from '@/services/StoreService.js';
const store = new Store({
    configName: 'user-preferences',
    defaults: {
        watchfolderPath: null
    }
});
export default {
    name: "DropzoneCounter",
    data() {
        return {
            watchfolderPath: null
        }
    },
    methods: {
        setWatchfolder: function() {
            const { dialog } = require('electron').remote;
            const path = dialog.showOpenDialog({ properties: ['openDirectory'] })[0]
            if (path) {
                this.watchfolderPath = path
                // persist path
                store.set('watchfolderPath', path);
                this.$parent.startWatcher(path);
            }
        }
    },
    created() {
        // get persistent path
        this.watchfolderPath = store.get('watchfolderPath') ? store.get('watchfolderPath') : 'not set'
        this.$parent.startWatcher(this.watchfolderPath);
    },
};
</script>
