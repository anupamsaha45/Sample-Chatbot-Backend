/**
*** @author     : Anupam Saha, Ashish Kumar
*
*** @date       : 19-12-2919
*
*** @description: Creating templates that are common for messenger and website bot. Some are not valid for messenger
                  which is indicated by comments below
*
**/

exports.textMessage = (message) => {
    return {
        "text": message
    }
}

//textMessageWithLink
exports.textMessageWithLink = (message) => {
    return {
        "title": "link",
        "text": message
    }
}

exports.quickReplyMessage = (title, quick_replies) => {
    return {
        "text": title,
        "quick_replies": quick_replies
    }
}

exports.createQuickReply = (title, payload) => {
    return {
        "content_type": "text",
        "title": title,
        "payload": payload
    }
}

exports.buttonMessage = (text, buttons) => {
    return {
        attachment: {
            type: "template",
            payload: {
                template_type: "button",
                text: text,
                buttons: buttons
            }
        }
    }
}

exports.createPostBackButton = (title, payload) => {
    return {
        "type": 'postback',
        "title": title,
        "payload": payload
    }
}

exports.createWebUrlButton = (title, url) => {
    return {
        "type": "web_url",
        "title": title,
        "url": url
    }
}

//Valid only for website chatbot
exports.dropdownMessage = (items) => {
    return {
        plugin: "dropdown",
        config: {
            dropdown: items
        }
    }
}

//Valid only for website chatbot
exports.formMessage = (forms) => {
    return {
        plugin: "form",
        config: {
            forms: forms
        }
    }
}

//Valid only for website chatbot
exports.createForm = (parameter, text) => {
    return {
        text: text,
        parameter: parameter
    }
}

//Valid only for website chatbot
exports.autoFillMessage = (text) => {
    return {
        plugin: "autofill",
        config: {
            placeholder: text
        }
    }
}

//Valid only for website chatbot
exports.createDatepicker = (field, value) => {
    return {
        [field]: value
    }
}

//Valid only for website chatbot
exports.datepicker = (dateFormat) => {
    return {
        plugin: "datepicker",
        config: {
            date_format: dateFormat
        }
    }
}

exports.createWebViewButton = (url, title, ratio) => {
    return {
        "type": "web_url",
        "url": url,
        "title": title,
        "webview_height_ratio": ratio,
        "messenger_extensions": true,
        "fallback_url": url
    }
}


exports.locationMessage = () => {
    return {
        "text": "Please share your location:",
        "quick_replies": [{
            "content_type": "location",
        }]
    }
}

exports.createElement = (title, subtitle, item_url, image_url, buttons) => {
    return {
        title: title,
        subtitle: subtitle,
        item_url: item_url,
        image_url: image_url,
        buttons: buttons
    }
}

exports.genericMessage = (elements) => {
    return {
        attachment: {
            type: "template",
            payload: {
                template_type: "generic",
                elements: elements
            }
        }
    }
}

exports.createShareButton = () => {
    return {
        "type": "element_share"
    }
}

exports.ImageMessage = (url) => {
    return {
        "attachment": {
            "type": "image",
            "payload": {
                "url": url
            }
        }
    }
}

