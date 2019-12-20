const Context = require('./context');

/**
*
*** @author     : Anupam Saha, Ashish Kumar
*
*** @date       : 19-12-2019
*
*** @description: Handles the dropdown response selected by the user.
*
**/

exports.handleDropdown = async (dropdown, updatedUser, _context, userId) => {
	var messages = []
    messages = await Context.handle(_context, userId, dropdown) //passes user text in case of no error
    return messages
}