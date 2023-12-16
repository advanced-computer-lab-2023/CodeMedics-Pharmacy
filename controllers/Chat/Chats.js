const Chat = require('../../models/Chat');
const Message = require('../../models/Message');
const Patient = require('../../models/Patient');
const Doctor = require('../../models/Doctor');

exports.getChats = async (req, res) => {
    try {
        const patients = await Patient.find();
        const chats = [];
        for (const patient of patients) {
            const chat = await Chat.findOne({ users: [patient.Username , 'admin']  });
            if (chat) {
                const latestMessage = await Message.findOne({ _id: chat.latestMessage }).sort({ createdAt: -1 });
                chats.push({chat , patient , latestMessage});
            }
        }
        const doctors = await Doctor.find();
        for(const doctor of doctors){
            const chat = await Chat.findOne({ users: [doctor.Username , 'admin']  });
            if (chat) {
                const latestMessage = await Message.findOne({ _id: chat.latestMessage }).sort({ createdAt: -1 });
                chats.push({chat , doctor , latestMessage});
            }
            else{
                const newChat = new Chat({
                    users: [doctor.Username , 'admin'],
                });
                await newChat.save();
                chats.push({chat: newChat , doctor , latestMessage: null});
            }
        }
        res.status(200).json({ chats });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}; 