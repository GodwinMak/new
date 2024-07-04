const db = require("../model");

const Hospital = db.hospitals;

exports.create = async (req, res) =>{
    try {
        const { hospital_name, hospital_district, hospital_region } = req.body;

        const hospitalCheck = await Hospital.findOne({
          where: { hospital_name: hospital_name },
        });

        if(hospitalCheck){
            return res.status(409).json({message: "Hospital with given name already exist"})
        }

        const hospital = await Hospital.create({
            hospital_name: hospital_name,
            hospital_district: hospital_district,
            hospital_region: hospital_region,
        });

        res.status(200).json({message: "Hopital created sucessfull", hospital})
    } catch (error) {
        res.status(500).json({message: error})
    }
} 

exports.getAll = async(req, res) =>{
    try {
        const hospitals = await Hospital.findAll();
        res.status(200).json(hospitals)
    } catch (error) {
        res.status(500).json({message: error})
    }
}