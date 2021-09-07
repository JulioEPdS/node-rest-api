import Event from '../models/event'

//Handles get method for all events ordered by ###############################################################
export const getEvents = async (req,res) => {
    const result = await Event.findAll({
        where: { status: 1 },
        order: [
            ['start_date', 'ASC'] //Defines order to get earlier events
        ]
    })
    res.json(result)
    //console.log(result)
}

/*
//Handles the get method for a defined event #################################################################
export const getDefinedEvent = async (req,res) => {
    const id = req.params.eventId //extracts id from request
    res.status(200).json({
        message: 'GET con id definido',
        id: id
    })
}

export const postEvents = async (req,res) => {
    
}

export const deleteEvents = async (req,res) => {
    
}

export const putEvents = async (req,res) => {
    
}*/