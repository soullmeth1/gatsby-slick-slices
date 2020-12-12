const nodemailer = require('nodemailer');

const mailOptions = {
  from: `'no-reply' <${process.env.CL_HOST}>`,
  subject: 'Email Verification',
  text: 'This is text',
  // html: '<h1>That was easy, right!</h1>',
};
const transporter = nodemailer.createTransport({
  service: process.env.CL_HOST,
  auth: {
    user: process.env.CL_EMAIL,
    pass: process.env.CL_PASS,
  },
});

function parseHtml(orders, name, total) {
  return `<div>
  <h2>Your Recent Order for ${total}</h2>
  <p>Please start walking over here, We will have your order ready in the next 20 mins.</p>
  <ul>
  ${orders.map(
    (item) => `<li>
    <img src="${item.thumbnail}" alt="${item.name}" />
    <p>${item.size} ${item.name} - ${item.price}</p>
  </li>`
  )}
  </ul>
  </div>`;
}

// function wait(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

exports.handler = async (event) => {
  // await wait(5000);
  // console.log(event.body);
  const body = JSON.parse(event.body);
  const [orders, total, name, email, myClass] = Object.values(body);
  console.log(body);
  if (myClass) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Err 305',
      }),
    };
  }

  if (!name || !email || !orders.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Oops! You are missing the fields.`,
      }),
    };
  }

  const to = `${name} <${email}>`;
  const html = await parseHtml(orders, name, total);

  const info = await transporter.sendMail({
    ...mailOptions,
    to,
    html,
  });

  console.log(info);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Success! Come on down for your pizza.',
    }),
  };
};
