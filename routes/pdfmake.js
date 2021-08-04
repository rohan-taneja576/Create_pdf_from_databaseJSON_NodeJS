const express = require('express');
const router = express.Router();
// const pdfDocument = require('pdfkit');
// const fs = require('fs');
// const doc = new pdfDocument();

const puppeteer = require('puppeteer');

htmlToPdf = async req => {
  console.log(req.body);
  try {
    // let file_name = req.body.name + '_' + currentTime + '.pdf';
    // let source_file_path = 'tmp/' + file_name;
    (async () => {
      const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
      });
      const page = await browser.newPage();
      await page.setContent(req.body.fname);

      //   if (req.body.style) {
      //     await page.addStyleTag({
      //       content: req.body.style,
      //     });
      //   }

      const buffer = await page.pdf({
        path: 'source_file_path.pdf',
        format: 'a4',
        margin: {
          top: '30px',
          bottom: '30px',
          left: '50px',
          right: '50px',
        },
      });
      await browser.close();
    })();
  } catch (err) {
    console.log(err, 'catch error');
  }
};

router.post('/pdf', (req, res, next) => {
  //   doc.pipe(fs.createWriteStream('pdfFile.pdf'));
  //   doc.fontSize(25).text(req.body.fname, 100, 100);
  //   doc.fontSize(25).text(req.body.lname, 100, 100);
  //   doc.end();
  htmlToPdf(req);
  res.send('PDF Generated');
});

module.exports = router;
