import express from "express"
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = 3001;
const databaseURL = process.env.DB_URL;
const databaseToken = process.env.DB_TOKEN;

const supabase = createClient(databaseURL, databaseToken)


app.listen(port, () => {
    console.log(`Started listening to ${port} port.`)
})

app.get("/", async (req, res) => {
    const { data, error } = await supabase
        .from('well_day_histories')
        .select()
        .eq('well_id', req.query.well_id)
    res.send(data || error)
})

