import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
// import CSS from 'connect-session-sequelize';
import sequelize from "./database/mysql.mjs";
import User from "./models/user.mjs";
import Jogo from "./models/jogo.mjs";

const app = express ()

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000'
    ],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded());

app.post("/newJogos", async(req, res) => {
    const hash = bcrypt.hashSync(req.body.senha, saltRounds);
    const created = await User.create({
        email: req.body.email,
        senha: hash
    });
    res.json({ "email": created.email });
})

app.get("/listJogos", async (req, res) => {
    res.json(await Jogo.findAll());
})

app.get("/listUser", async (req, res) => {
    res.json(await User.findAll());
})

app.use(express.static("view"));


app.listen(3000, "127.0.0.1", () => {
    console.log('rodou');
})