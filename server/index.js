const express = require("express");
const app = express();
const cors = require("cors");
const pool =require("./db")

//middleware

app.use(cors());
app.use(express.json());

//ROUTES//

//create appointment //

app.post('/appointments', async(req, res) => {
    try {
        console.log(req.body.name);
        const name  = req.body.name;
        const date  = req.body.date;
        const time  = req.body.time;


        const {appointmentInfo } = req.body

        const newAppointment = await pool.query("INSERT INTO appointment (name, date, time) VALUES($1,$2,$3) RETURNING *",
        
        [name, date, time]);

        res.json(newAppointment.rows[0]);

    } catch (error) {
        console.error(error.message);
    }

});

//get all appointments //

app.get("/appointments", async(req,res) => {
   try {
    const allAppointments = await pool.query("SELECT * FROM appointment");
    res.json(allAppointments.rows);
   } catch (error) {
       console.error(error.message)
   }
})

// get an appointment//

app.get("/appointments/:id", async(req,res) => {
    try {
        const {id} = req.params;

     const appointment = await pool.query("SELECT * FROM appointment WHERE appointment_id = $1", [id]);
     res.json(appointment.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
 })

//update appointment //

app.put("/appointments/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const name  = req.body.name;
        const date  = req.body.date;
        const time  = req.body.time;


     const updateAppointment = await pool.query("UPDATE appointment SET name = $1, date = $2, time = $3 WHERE appointment_id = $4", [name, date, time, id] );
     res.json("Todo was updated");
    } catch (error) {
        console.error(error.message)
    }
 })

 //delete appointment

 app.delete("/appointments/:id", async(req,res) => {
    try {
        const {id} = req.params;


     const deleteAppointment = await pool.query("DELETE FROM appointment WHERE appointment_id = $1", [id] );
     res.json("Todo was deleted");
    } catch (error) {
        console.error(error.message)
    }
 })


app.listen(5000, () => {
    console.log("server has started");
});