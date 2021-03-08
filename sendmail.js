const mailjet = require ('node-mailjet')
.connect('4781f9cf1fbc2dce9547d53fecc91458', '64a84194c51435e802442492949a5ff2')
const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "amakaumeh01@gmail.com",
        "Name": "Chiamaka"
      },
      "To": [
        {
          "Email": "amakaumeh01@gmail.com",
          "Name": "Chiamaka"
        }
      ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": "My first Mailjet email",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })
