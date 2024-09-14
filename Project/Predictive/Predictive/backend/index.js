import express from 'express';
const app=express()
import mongoose from 'mongoose';
import cors from 'cors';

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true });

//const userSchema = new mongoose.Schema({
