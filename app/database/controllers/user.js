
const User = require('../models/user');


function createUserData(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = new User(data);
            let res = await user.save();
            resolve(res)

        } catch (err) {
            reject(err)
        }
    });

}

function getUserData(query = {}) {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await User.find(query).sort({ createdAt: -1 }).lean().exec()
            resolve(users)

        } catch (err) {
            reject(err)
        }

    })
}

function getUserDataById(id, populate = false) {
    return new Promise(async (resolve, reject) => {
        try {
            var result;
            if(populate)
                result = await User.findById(id).populate('give_model_name');
            else
                result = await User.findById(id);

            resolve(result)

        } catch (err) {
            reject(err)
        }

    })
}

function updateUserData(query={}, newData) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await User.update(query, { "$set": newData })
            resolve(result)

        } catch (err) {
            reject(err)
        }

    });
}

function updateUserDataById(id, newData) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await User.findByIdAndUpdate(id, { "$set": newData }, { new: true })
            resolve(result)

        } catch (err) {
            reject(err)
        }

    });
}


function deleteUserDataById(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {         
                email: '', name: ''
            }
            const result = await User.findByIdAndUpdate(userId , { $unset: data }, { multi: false })
            resolve(result)
        
        } catch(err) {
            reject(err)
        }
        
    })
}

function resetUserDataById(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {
                paymentStatus: ''
            }

            const result = await User.findByIdAndUpdate(userId, { $unset: data }, { multi: false })
            resolve(result)
        
        } catch(err) {
            reject(err)
        }
        
    })
}


module.exports = {
    createUserData,
    getUserData,
    getUserDataById,
    updateUserData,
    updateUserDataById,
    deleteUserDataById,
    resetUserDataById
}