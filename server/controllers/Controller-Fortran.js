const logger = require("logat")
const fs = require('fs');
const spawn = require("spawno")
const child_process = require("child_process");

module.exports.controller = function (app) {


    app.post('/api/fortran', async (req, res) => {
        if (!req.body.code) return res.send({err: 'Empty code'})
        const file = `/tmp/${new Date().valueOf()}.f90`;
        const prog = `/tmp/${new Date().valueOf()}`;
        await fs.writeFileSync(file, req.body.code)
        try {
            spawn('gfortran', [file, '-o', prog], {cwd: __dirname}, (err, stdout, stderr) => {
                if (err) return res.send({err: err.message})
                if (stderr) return res.send({err: stderr})
                child_process.exec(prog, {timeout: 5000}, (err, stdout, stderr) => {
                    let message;
                    if (err && err.killed) {
                        message = 'Process killed by timeout';
                    }
                    const error = {err: `${err && err.message}\n${message}\nLast output: "${stdout.trim()}"\n${stderr}`}
                    if (err) return res.send(error)
                    if (stderr) return res.send(error)
                    res.send({err, data: stdout})
                    fs.unlink(file, () => {
                    });
                    fs.unlink(prog, () => {
                    });
                })
            })
        } catch (e) {
            console.log(e)
            res.send({err: e.message})
        }
        /*fortran(req.body.code,(err,data)=>{
            console.log(err,data)
            res.send({err,data})
        })*/
    })
}
