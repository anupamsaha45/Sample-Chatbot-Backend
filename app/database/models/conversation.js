'use strict';

var Mongoose = require('mongoose'); 
var Schema = Mongoose.Schema;

var conversationSchema = new Schema({
    user_id: { type: String },
    from: { type: String },
    message: {    

        text: { type: String },  //for text and quick_Reply both
        title: { type: String},

        quick_replies: [{
            content_type: { type: String },
            title: {type: String },
            payload: {type: String }
        }],

        attachment: {
              type: {type : String},
              payload: {
                template_type: { type: String },
                text: {type: String },
                buttons: [{                  //For Postback , WebView , Account Linking and WebUrl 
                    type: { type: String },
                    url: { type:String } ,
                    title: { type:String },
                    payload: { type: String },
                    webview_height_ratio: { type:String },
                    messenger_extensions: { type:String },  
                    fallback_url: { type:String } 
                }],
                elements: [{                 //For Generic Message and create Element
                    title: { type: String },
                    subtitle: { type: String },
                    item_url: { type: String },
                    image_url: { type: String },
                    buttons: { type: String }
                }],
                url: {type: String}
            }
        },

        plugin: {type: String},
        config: {
            placeholder: {type: String},
            forms: [{
                text: { type: String },
                parameter: { type: String }
            }],
            date_format: [{
                disableUntil: { type: Boolean},
                disableSince: { type: Boolean}
            }]
        },
       
        type: { type:String }

    
    },
    //is_valid: { type: Boolean, default: false },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = Mongoose.model('Conversation', conversationSchema);