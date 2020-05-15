import Mongoose from "server/db/Mongoose"
const fs = require('fs')
const file = fs.readFileSync('conference.csv', 'utf8')
const rows = file.split('\n').filter(r=>!!r);
const fields = [
    0,0,'date',0,0,0,'lname','fname','mname','age','gender','country','city','address','organisation','rank','phone','email','participation','title','direction',''
]
const data = [];
const participations = [ { label: 'Заочное участие (только публикация тезисов)', value: 1 },
    { label: 'Очное участие с докладом', value: 2 },
    { label: 'Очное участие со стендовым докладом', value: 3 }
];

main()

async function main() {
    await Mongoose.conference.deleteMany();
    for (const r of rows) {
        const row = r.split('\t')
        const model = {};
        for (let i = 0; i < fields.length; i++) {
            if(!fields[i]) continue;
            model[fields[i]] = row[i].replace('[','').replace(']','')
        }
        if (model.gender.match('Female')) model.genderId = 2; else model.genderId = 1;
        const part = model.participation.split('/')
        const part2 = part[0].trim()
        const option = participations.find(p => p.label === part2);

        //if(!participations.includes(part2) && part2) participations.push(part2)
        const {fname,lname,mname} = model;
        const found = await Mongoose.conference.findOne({fname,lname,mname})
        if (model.fname && !found) {
            model.fname = model.fname.replace(/\/.*/,'').trim();
            model.lname = model.lname.replace(/\/.*/,'').trim();
            model.mname = model.mname.replace(/\/.*/,'').trim();
            if(model.fname.match('Petukhova')) console.log(row, model)
            model.participationId = option.value;
            await Mongoose.conference.create(model)
        }

    }
    Mongoose.close()
}
