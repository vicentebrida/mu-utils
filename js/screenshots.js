function screenshotes(user){
  setTimeout(function() {
    func(user);
  }, 1000);

  function func(user) {
    var pathPrint = './assets/screenshots/';
    const printscreens = [];

    widowsCapture();

    async function widowsCapture() {
      const { promisify } = require('util');
      let imageName;
      let promisifyFs = promisify(fs.writeFile);

      await desktopCapturer.getSources({ types: ['window'], thumbnailSize: {width: 800, height: 600} }).then(async sources => {
        console.log(sources);
        for (const source of sources) {
          if (source.name === 'MU') {
            imageName = Math.random().toString(36).substring(7) + '.jpeg';

            await promisifyFs(
              pathPrint + imageName,
              source.thumbnail.toJPEG(100),
              () => {}
            );

            printscreens.push(pathPrint + imageName);
          }
        }
      });

      await upload(printscreens);
    }

    async function upload(files) {
      const formData = {
        file: files.map((file) => {
          return fs.createReadStream(file);
        })
      };

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
        files.map((file) => {
          return fs.unlinkSync(file);
        })
      })
    }
  }
}
