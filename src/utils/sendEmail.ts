import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'tuanbmt31122022@gmail.com',
        pass: 'omkw vqll ogij eryq',
    },
});

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (email: string, link: string) => {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"ITManagement" <itmanagement@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Xác thực tài khoản', // Subject line
        text: '', // plain text body
        html: `<html>
        <head>
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <title>Email Confirmation</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style type="text/css">
          /**
           * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
           */
          @media screen {
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 400;
              src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
            }
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 700;
              src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
            }
          }
          /**
           * Avoid browser level font resizing.
           * 1. Windows Mobile
           * 2. iOS / OSX
           */
          body,
          table,
          td,
          a {
            -ms-text-size-adjust: 100%; /* 1 */
            -webkit-text-size-adjust: 100%; /* 2 */
          }
          /**
           * Remove extra space added to tables and cells in Outlook.
           */
          table,
          td {
            mso-table-rspace: 0pt;
            mso-table-lspace: 0pt;
          }
          /**
           * Better fluid images in Internet Explorer.
           */
          img {
            -ms-interpolation-mode: bicubic;
          }
          /**
           * Remove blue links for iOS devices.
           */
          a[x-apple-data-detectors] {
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            color: inherit !important;
            text-decoration: none !important;
          }
          /**
           * Fix centering issues in Android 4.4.
           */
          div[style*="margin: 16px 0;"] {
            margin: 0 !important;
          }
          body {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          /**
           * Collapse table borders to avoid space between cells.
           */
          table {
            border-collapse: collapse !important;
          }
          a {
            color: #1a82e2;
          }
          img {
            height: auto;
            line-height: 100%;
            text-decoration: none;
            border: 0;
            outline: none;
          }
          </style>
        
        </head>
        <body style="background-color: #e9ecef;">
        
          <!-- start preheader -->
          <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
            A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
          </div>
          <!-- end preheader -->
        
          <!-- start body -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
        
            <!-- start logo -->
            <tr>
              <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                    <td align="center" valign="top" style="padding: 36px 24px;">
                      <a href="https://www.blogdesire.com" target="_blank" style="display: inline-block;">
                        <img src="https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                      </a>
                    </td>
                  </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end logo -->
        
            <!-- start hero -->
            <tr>
              <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                      <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Xác thực địa chỉ Email của bạn</h1>
                    </td>
                  </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end hero -->
        
            <!-- start copy block -->
            <tr>
              <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
        
                  <!-- start button -->
                  <tr>
                    <td align="left" bgcolor="#ffffff">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                  <a href=${link} target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Nhấn vào đây để xác thực</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- end button -->
        
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end copy block -->
        
            <!-- start footer -->
            <tr>
              <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end footer -->
        
          </table>
          <!-- end body -->
        
        </body>
        </html>`, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
};
export const sendEmailAccept = async (email: string) => {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"ITManagement" <itmanagement@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Thư mời phỏng vấn', // Subject line
        text: '', // plain text body
        html: `<html>
      <head>
        <meta charset="UTF-8">
      </head>
      <body>
        <div style="font-family: Arial, sans-serif;  margin: 0 auto;">
          <p>Chúng tôi xin chân thành cảm ơn sự quan tâm của bạn đến vị trí tuyển dụng tại công ty chúng tôi. Sau khi xem xét kỹ lưỡng hồ sơ của bạn, chúng tôi vui mừng thông báo rằng bạn đã đậu vòng hồ sơ và tiếp tục vào giai đoạn tiếp theo của quá trình tuyển dụng.</p>
          <p>Chúng tôi đã đánh giá cao kinh nghiệm, học vấn và kỹ năng của bạn, và chúng tôi tin rằng bạn có tiềm năng để góp phần vào thành công của công ty chúng tôi.</p>
          <p>Tiếp theo, chúng tôi sẽ liên hệ với bạn để sắp xếp cuộc phỏng vấn. Trong cuộc phỏng vấn, chúng tôi sẽ có cơ hội để hiểu rõ hơn về bạn, thảo luận về kỹ năng và kinh nghiệm của bạn, cũng như trả lời các câu hỏi liên quan đến vị trí mà bạn đang ứng tuyển.</p>
          <p>Hãy chuẩn bị tốt cho cuộc phỏng vấn và chúng tôi rất mong được gặp bạn trong thời gian sớm nhất.</p>
          <p>Trân trọng,</p>
          <p>IT MANAGEMENT</p>
        </div>
      </body>
      </html>`, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
};

export const sendEmailRefuse = async (email: string) => {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"ITManagement" <itmanagement@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Thư cảm ơn', // Subject line
        text: '', // plain text body
        html: `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
      </head>
      <body>
        <div style="font-family: Arial, sans-serif; margin: 0 auto;">
          <h2>Chào bạn,</h2>
          <p>Chúng tôi xin thông báo rằng bạn đã không được chọn để tiếp tục trong quá trình tuyển dụng của chúng tôi. Chúng tôi đã xem xét kỹ lưỡng và quyết định không tiếp tục với đề xuất của bạn.</p>
          <p>Chúng tôi rất cảm kích sự quan tâm và thời gian mà bạn đã dành cho quá trình ứng tuyển. Chúng tôi đánh giá cao nỗ lực và tài năng của bạn, nhưng đôi khi quyết định phải được đưa ra dựa trên các tiêu chí riêng của chúng tôi.</p>
          <p>Xin lưu ý rằng quyết định này không phản ánh sự đánh giá về năng lực hoặc giá trị cá nhân của bạn. Chúng tôi khuyến khích bạn tiếp tục tìm kiếm cơ hội khác và chúc bạn thành công trong sự nghiệp của mình.</p>
          <p>Xin lỗi một lần nữa và cảm ơn bạn đã quan tâm đến công ty chúng tôi.</p>
          <p>Trân trọng,</p>
          <p>IT MANAGEMENT</p>
        </div>
      </body>
      </html>`, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
};
