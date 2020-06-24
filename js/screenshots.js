function screenshotes(user){
  setTimeout(function() {
    func(user);
  }, 1000);

  function func(user) {
    var countPrints = 1;
    var imageFormat = 'image/png';

    widowsCapture();

    async function widowsCapture() {
      desktopCapturer.getSources({ types: ['window'] }).then(async sources => {
        console.log(sources);
        for (const source of sources) {
            if (source.name === 'MU') {
                try{
                    const stream = await navigator.mediaDevices.getUserMedia({
                        audio: false,
                        video: {
                            mandatory: {
                                chromeMediaSource: 'desktop',
                                chromeMediaSourceId: source.id,
                                minWidth: 1280,
                                maxWidth: 4000,
                                minHeight: 720,
                                maxHeight: 4000
                            }
                        }
                    });

                    await handleStream(stream);
                } catch (e) {
                    handleError(e);
                }
            }
        }
      });
    }

    async function handleStream(stream) {
      var video = document.createElement('video');

      video.style.cssText = 'position:absolute;top:-10000px;left:-10000px;';

      video.onloadedmetadata = function () {
          video.style.height = this.videoHeight + 'px';
          video.style.width = this.videoWidth + 'px';

          video.play();

          var canvas = document.createElement('canvas');

          canvas.width = this.videoWidth;
          canvas.height = this.videoHeight;

          var ctx = canvas.getContext('2d');

          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          video.remove();

          try {
              stream.getTracks()[0].stop();
          } catch (e) {}

          saveScreen(canvas.toDataURL(imageFormat));
      }

      video.srcObject = stream;
      document.body.appendChild(video);
    }

    async function saveScreen(base64data) {
      let base64Image = base64data.split(';base64,').pop();
      let pathPrint = './assets/screenshots/';
      var namePrint = 'image' +  countPrints + '.png';

      await fs.writeFile(pathPrint + namePrint, base64Image, {encoding: 'base64'}, function(err) {
        uploadScreen(pathPrint + namePrint);
        countPrints++;
      });
    }

    async function uploadScreen(pathScreen) {
      const formData = {
        file: fs.createReadStream(pathScreen),
      }

      await nodeRequest.post({
        url:'http://localhost:3333/telegram/photo',
        auth: {
          bearer: user.token,
        },
        headers: {
          'Accept-Language': user.locale,
        },
        formData: formData
      },
      function optionalCallback(err, httpResponse, body) {
        if (err) {
          return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
      })
    }

    function handleError(e) {
      console.log(e);
    }
  }
}
