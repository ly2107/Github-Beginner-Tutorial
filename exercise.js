/* SMS can only be a maximum of 160 characters.
   If the user wants to send a message bigger than that, we need to break it up.
   We want a multi-part message to have this added to each message:
   " - Part 1 of 2"
*/

//fix it
const sendSmsMessage = function sendSmsMessage (text, to, from) {
  (text.length > 160) ? splitMessage(text) : deliverMessageViaCarrier(text, to, from);
}
//splits text if it is longer than 160 characters 
const splitMessage = function splitMessage(text, to, from){
	//array to store splitted messages
	var messages = [];
	//index of current message which is necessary for appendix; min. 1 since text.length > 160
	var currentMessageIndex = 1; 
	//placeholder because no one knows how many messages there will be after splitting
	var placeholder = "##";
	//appendix to each message; appendix.length: min. 14 characters if messages.length <= 9, min. 16 characters if messages.length <= 99
	var appendix = " - Part "+currentMessageIndex+ " of "+placeholder;
	
	for (var i = 0, charsLength = text.length; i < charsLength; i += (160-appendix.length)) {
		//Set appendix to new value 
		appendix = " - Part "+currentMessageIndex+ " of "+placeholder;  
		//split message, add appendix and store message in array 
		messages.push(text.substring(i, (i + 160 - appendix.length)).concat(appendix));
		currentMessageIndex++;
	}
	 
    for(i=0; i<messages.length; i++){
		//replaces placeholder with max. message count
		messages[i] = messages[i].replace(placeholder, messages.length);
		console.log(messages[i]);
		//calls original method to deliver message
		//deliverMessageViaCarrier(messages[i], to, from);
	}
}

//works
const deliverMessageViaCarrier = function deliverMessageViaCarrier (text, to, from) {
  SmsCarrier.deliverMessage(text, to, from);
}

//calls method sendSmsMessage, example text
var message = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur"
var receiver = "+4915786177835";
var sender = "test_anon";
sendSmsMessage(message, receiver, sender)