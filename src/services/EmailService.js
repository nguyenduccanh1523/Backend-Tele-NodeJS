const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const sendEmailCreateOrder = async (email, orderItems) =>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.MAIL_ACCOUNT,
          pass: process.env.MAIL_PASSWORD,
        },
      });

      let listItems = '';
      const attachImage = []
        orderItems.forEach((order) => {
            listItems += `<div>
            <div>Bạn đã đặt sản phẩm <b>${order.name}</b> với <b>Số lượng: ${order.amount}</b> và <b>Giá là: ${order.price} VND</b></div>
            <div>Bên dưới là hình ảnh của sản phẩm </div>
            </div>`
            attachImage.push({path: order.image})
        })

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: `"DavidCanh Send Mail 👻" <${process.env.MAIL_ACCOUNT}>`, // sender address
          to: email, // list of receivers
          subject: "Bạn đã đặt hàng tại TELE", // Subject line
          text: "Hello world?", // plain text body
          html: `<div><b>Bạn đã dặt hàng thành công tại shop TELE</b></div> ${listItems}`, // html body
          attachments: attachImage
        });
}

module.exports = {
    sendEmailCreateOrder
}