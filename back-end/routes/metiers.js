const express = require("express");

const db = require("../db"); // no need to specify index.js, it will automacilly search for a file named index.js

const router = express.Router();

// GET all the jobs
router.get("/", async (req, res) => {
    try {
        const jobsResults = await db.query("SELECT jobs.*, categories.name AS category_name FROM jobs  JOIN categories ON categories.id = category_id;");
        res.json({
            data: {
                jobs: jobsResults.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// GET one job
router.get("/:id", async (req, res) => {
    try {
        const jobsResults = await db.query("select * from jobs where id = $1", [req.params.id]); // parameterized query - [req.params.id] will replace $1
        // parameterized query is used to avoid string concatenation which can lead to sql injection vulnerabilities

        const degreesResults = await db.query("select * from degrees where job_id = $1", [req.params.id]);
        res.json({
            data: {
                jobs: jobsResults.rows[0],
                degrees: degreesResults.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// Create a job
router.post("/", async (req, res) => {
    try {
        const results = await db.query("INSERT INTO jobs (name, description, video, category_id) values ($1, $2, $3, $4) returning *", [
            req.body.name,
            req.body.description,
            req.body.video,
            req.body.category_id,
        ]);
        res.status(201).json({
            status: "success",
            data: {
                job: results.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// Delete a job
router.delete("/:id", (req, res) => {
    try {
        const results = db.query("DELETE FROM jobs where id = $1", [req.params.id]);
        res.json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
