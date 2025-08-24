(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };

    $(function () {
        var message_side, sendMessage;
        message_side = 'right';

        // Add a default welcome message
        var welcomeMessage = new Message({
            text: "Select your location",
            message_side: 'left'
        });
        welcomeMessage.draw();

        // Add another message with points
    // Assuming your Message class has a method to add buttons, let's call it addButton

// Create a message with two buttons
var additionalPointsMessage = new Message({
    message_side: 'left'
});

// Add the "Vittal" button
additionalPointsMessage.addButton({
    text: "Vittal",
    // Add any other properties or actions for the "Vittal" button
});

// Add the "Puttur" button
additionalPointsMessage.addButton({
    text: "Puttur",
    // Add any other properties or actions for the "Puttur" button
});

        additionalPointsMessage.draw();

        var getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };

        sendMessage = function (text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }

            $('.message_input').val('');
            $messages = $('.messages');
            message_side = message_side === 'left' ? 'right' : 'left';

            var replyText = getReply(text);

            message = new Message({
                text: text,
                message_side: 'left'
            });
            message.draw();

            if (replyText) {
                var replyMessage = new Message({
                    text: replyText,
                    message_side: 'right'
                });
                replyMessage.draw();
            }

            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };

        var getReply = function (userMessage) {
            userMessage = userMessage.toLowerCase(); // Convert the user message to lowercase for case-insensitivity
        
            if (userMessage.includes("vittal")) {
                return "1. Workers available in Vittal\n2. Arecal pluckers\n3. Pesticide sprayers\n4. Grass grazers";
            } else if (userMessage.includes("puttur")) {
                return "1. Workers available in Puttur\n2. areca pluckers 1\n3. pesticide sprayers 2\n4.coconut pluckers 3";
            } else {
                return "I'm sorry, I didn't understand that. Please specify a location like 'Vittal' or 'Puttur' for relevant information.";
            }
        };
        

        $('.send_message').click(function (e) {
            return sendMessage(getMessageText());
        });

        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                return sendMessage(getMessageText());
            }
        });
    });
}.call(this));
