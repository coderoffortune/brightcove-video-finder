class BrightcoveVideoIdFinder {
    constructor() {
        this.body = document.getElementsByTagName('body')[0],
        this.injectedStyle = document.getElementById('brightcove_video_id_finder_style'),
        this.videoIdsInfo = document.querySelectorAll('.brigthcove_video_id_info');
    }

    injectStyles() {
        if(this.injectedStyle !== null) {
            return;
        }
        
        this.injectedStyle = document.createElement('style');
        this.injectedStyle.id = 'brightcove_video_id_finder_style';
        this.injectedStyle.textContent = `.brigthcove_video_id_info {position: absolute; top: 0; z-index: 999999999; color: black; background: #fff; padding: 5px; text-transform: none; font-family: monospace; font-size: 15px; padding: 20px 10px; user-select: text}`;

        this.body.appendChild(this.injectedStyle);
    }

    removeStyles() {
        this.body.removeChild(this.injectedStyle);

        this.injectedStyle = undefined;
    }

    addVideoIdsInfo() {
        const videos = document.querySelectorAll('video[data-video-id]');
        
        videos.forEach( video => {
            const videoIdInfo = document.createElement('div');
            videoIdInfo.classList.add('brigthcove_video_id_info');
            videoIdInfo.innerHTML = `<b>Video Id:</b> ${video.dataset.videoId}`;

            video.parentNode.appendChild(videoIdInfo);
        });
    }

    removeVideoIdsInfo() {
        this.videoIdsInfo.forEach( info => {
            info.parentNode.removeChild(info);
        })
    }

    inPage() {
        return this.videoIdsInfo.length > 0;    
    }

    run() {
        if(this.inPage()) {
            this.removeVideoIdsInfo();
            this.removeStyles();
            
            return;
        }

        this.injectStyles();
        this.addVideoIdsInfo();
    }
}

var finder = new BrightcoveVideoIdFinder();

finder.run();
