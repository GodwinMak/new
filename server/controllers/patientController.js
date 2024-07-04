const db = require("../model");

const Patient = db.patients;

exports.create = async (req,res) =>{
    try {
        const {first_name, middle_name, last_name, ward,village,  birth_date, gender, hospital_id } =req.body;

        const nameCheck = await Patient.findOne({
          where: {
            first_name: first_name,
            last_name: last_name,
            middle_name: middle_name,
          },
        });
        if(nameCheck){
            return res.status(409).json({message: "This patient is Available in the system"})
        }

        const patient = await Patient.create({
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            ward: ward,
            village: village,
            birth_date: birth_date,
            gender: gender,
            hospital_id: hospital_id
        });
        res.status(200).json({message: "Patient created successfully", patient})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.getAll = async (req, res) =>{
    try {
      const { page = 1 } = req.query;
      const maxPageSize = 10;
      // Fetch the total number of Patient in the database
      const totalCount = await Patient.count();
      // Calculate the dynamic pageSize based on total users
      const pageSize = Math.min(maxPageSize, totalCount);
      // Calculate the offset based on the requested page and dynamic pageSize
      const offset = (page - 1) * pageSize;

      // Fetch the paginated users
      const { count, rows: patients } = await Patient.findAndCountAll({
        limit: pageSize,
        offset,
      });

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
        res.status(500).json({message: error})
    }
}