var BrightcoveIdDetector = {
    body: document.getElementsByTagName('body')[0],
    injectedStyle: document.getElementById('brightcove_video_id_finder_style'),
    videoIdsInfo: document.querySelectorAll('.brigthcove_video_id_info'),
    
    injectStyles: function() {
        if(this.injectedStyle !== null) {
            return;
        }
        
        this.injectedStyle = document.createElement('style');
        this.injectedStyle.id = 'brightcove_video_id_finder_style';
        this.injectedStyle.textContent = `
            .brigthcove_video_id_info {
                position: absolute;
                top: 2px;
                left: 1px;
                z-index: 999999999;
                color: black;
                background: #fff;
                text-align: left;
                text-transform: none;
                font-size: 13px;
                padding: 10px;
                user-select: text;
            }
            .brigthcove_video_id_info section {
                display: block;
                height: 20px;
                display: flex;
                align-items: center;
            }
            .brigthcove_video_id_info a {
                text-decoration: underline;
                color: #0000EE;
            }
            .brigthcove_video_id_info img {
                margin-left: 5px
            }
        `;

        this.body.appendChild(this.injectedStyle);
    },

    removeStyles: function() {
        this.body.removeChild(this.injectedStyle);

        this.injectedStyle = undefined;
    },

    addVideoIdsInfo: function() {
        const videos = document.querySelectorAll('video[data-video-id]');
        
        videos.forEach( video => {
            const videoIdInfo = document.createElement('div');
            videoIdInfo.classList.add('brigthcove_video_id_info');
            videoIdInfo.innerHTML =  `
                <section>
                    <strong>Id:</strong> ${video.dataset.videoId}
                </section>
                <section>
                    <a href="${video.getAttribute('poster')}" target="_blank">poster image</a>
                    <img src="${chrome.extension.getURL('icons/external-link.svg')}" width="10" height="10" />
                </section>
                <section>
                    <a href="${video.src}" target="_blank">video source</a>
                    <img src="${chrome.extension.getURL('icons/external-link.svg')}" width="10" height="10" />
                </section>
            `;

            video.parentNode.appendChild(videoIdInfo);
        });
    },

    removeVideoIdsInfo: function() {
        this.videoIdsInfo.forEach( info => {
            info.parentNode.removeChild(info);
        })
    },

    inPage: function() {
        return this.videoIdsInfo.length > 0;    
    },
    
    run: function() {
        if(this.inPage()) {
            this.removeVideoIdsInfo();
            this.removeStyles();
            
            return;
        }

        this.injectStyles();
        this.addVideoIdsInfo();
    }
}

BrightcoveIdDetector.run();
