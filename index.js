'use strict';

const path = require('path');
const { Chromeless } = require('chromeless');
const chromeless = new Chromeless();
const { email, password } = require('./config/default');
 
async function run() {
  const screenshot = await chromeless
    .goto('https://portal.avidac.com/default.aspx')
    .type(email, 'input[name="Username"]')
    .type(password, 'input[name="Password"]')
    .click('input.input_button')

    .wait('input[value="Make a Payment"]', 15000)
    .click('input[value="Make a Payment"]')

    .wait('input.existingFunding', 15000)
    .click('input.existingFunding:nth-of-type(1)')
    .click('input#submitBtnId')

    .wait('input#emailAddress', 15000)
    .type(email, 'input#emailAddress')
    .type(email, 'input#confirmEmailAddress')
    // .click('input#submitBtnId')
    .screenshot({ filePath: path.join(__dirname, 'paymentConfirmations', `${new Date().toLocaleDateString()}_confirmation.png`) });
 
  console.log(screenshot); // prints local file path or S3 url
 
  await chromeless.end();
}
 
run().catch(console.error.bind(console));