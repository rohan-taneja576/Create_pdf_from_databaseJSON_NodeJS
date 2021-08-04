const puppeteer = require('puppeteer');
const data = require('./database.json');
const hbs = require('handlebars');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

const compile = async (templateName, data) => {
  const filePath = path.join(process.cwd(), 'templates', `${templateName}.hbs`);
  const html = await fs.readFileSync(filePath, 'utf-8');
  return hbs.compile(html)(data);
};

hbs.registerHelper('dateFormat', (value, format) => {
  console.log(value);
  ('use strict');
  if (format === 'fromNow') {
    return moment(value).fromNow();
  } else {
    return moment(value).format(format);
  }
});
(async function () {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    const content = await compile('short-list', data);
    await page.setContent(content);
    await page.pdf({
      path: 'databasePdfFile.pdf',
      format: 'a4',
      printBackground: true,
    });
    console.log('done');
    await browser.close();
    process.exit();
  } catch (err) {
    console.log(err, 'error');
  }
})();
