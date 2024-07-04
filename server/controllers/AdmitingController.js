const db = require("../model");


const AddmitedPatient = db.patient_datas;
const Patient = db.patients

exports.checkPatient = async (req, res) =>{
  try {
    const id = req.params.id;
    const patient = await AddmitedPatient.findOne({where: {patient_id : id, status: null}})
    if(!patient){
      return res.json({status: true})
    }else{
      return res.json({status: false})
    }
  } catch (error) {
    res.status(500).json({message: error})
  }
}

exports.create = async(req, res)=>{
    try {
      const { date, type_of_patient, height, weight, patient_id } = req.body;
        const addmitedPatient = await AddmitedPatient.create({
          date: date,
          type_of_patient: type_of_patient,
          height: parseInt(height),
          weight: parseInt(weight),
          patient_id: patient_id,
        })
        res.status(200).json({ message: "Patient Adminted", addmitedPatient });
    } catch (error) {
        res.status(500).json({message: error})
    }
}


exports.getAll = async (req, res) =>{
    try {
        const { page = 1 } = req.query;
        const maxPageSize = 10;
        // Fetch the total number of Patient in the database
        const totalCount = await AddmitedPatient.count();
        // Calculate the dynamic pageSize based on total users
        const pageSize = Math.min(maxPageSize, totalCount);
        // Calculate the offset based on the requested page and dynamic pageSize
        const offset = (page - 1) * pageSize;

        // Fetch the paginated users
        const { count, rows: patients } = await AddmitedPatient.findAndCountAll(
          {
            // where:{status: null},
            limit: pageSize,
            offset,
            include: [
              {
                model: Patient,
                attributes: ["first_name", "middle_name", "last_name","patient_id", "birth_date", "ward","village", "gender"], // Include only the 'area_name' attribute of the Area model
                required: true, // Use left join to include users without an associated area
              },
            ],
          }
        );

        const totalPages = Math.ceil(count / pageSize);

        res.status(200).json({
          patients,
          meta: {
            totalUsers: count,
            totalPages,
            currentPage: parseInt(page),
            pageSize: parseInt(pageSize),
          },
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
}

exports.update = async(req, res) =>{
    try {
        const id = req.params.id;
        console.log(req.body)
        const user = await AddmitedPatient.update(req.body, {
          where: { patient_data_id: id },
        });
        res.status(200).send({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({message: error})
    }
}