const express = require("express");

const db = require("../db"); // no need to specify index.js, it will automacilly search for a file named index.js

const router = express.Router();

// GET all the jobs
router.get("/", async (req, res) => {
    try {
        const results = await db.query("select * from jobs;");
        res.json({
            results: results.rows.length,
            data: {
                jobs: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// GET one restaurant
router.get("/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        const jobsResults = await db.query("select * from jobs where id = $1", [req.params.id]); // parameterized query - [req.params.id] will replace $1
        // parameterized query is used to avoid string concatenation which can lead to sql injection vulnerabilities

        const degreesResults = await db.query("select * from degrees where job_id = $1", [req.params.id]);
        console.log(degreesResults.rows);
        // console.log(jobsResults.rows[0]);
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

module.exports = router;
