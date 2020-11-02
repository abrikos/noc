import Mongoose from "server/db/Mongoose";

const csv = require('csv-parser')
const fs = require('fs')
const file = './data/slovnik.csv';
const results = []

//??,НАЗВАНИЕ СТАТЬИ,ТИП ,РАЗДЕЛ,подраздел,КРИТЕРИИ,ИЛЛ 6,ист 7, объем 8

fs.createReadStream(file)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        main(results);
        // [
        //   { NAME: 'Daffy Duck', AGE: '24' },
        //   { NAME: 'Bugs Bunny', AGE: '22' }
        // ]
    });



async function main(arr) {
    await Mongoose.rubric.deleteMany()
    await Mongoose.article.deleteMany()
    for (const a of arr) {
        if (!a.term) continue;

        //const level = array.length - array.slice(0).reverse().findIndex(function (el) { return el }) - 1;
        let name1 = a.l1.toLowerCase().trim()
        let name2 = a.l2.toLowerCase().trim()

        if (name1 === 'гос и право') name1 = 'государство и право';
        if (name1 === 'ист') name1 = 'история';
        if (name1 === 'культ') name1 = 'культура и искусство';
        if (name1 === 'культура') name1 = 'культура и искусство';
        if (name1 === 'наука и обр') name1 = 'наука и образование';
        if (name1 === 'с/х') name1 = 'сельское хозяйство';
        if (name1 === 'связь и инфо') name1 = 'связь и информация';
        if (name1 === 'связь и инфор') name1 = 'связь и информация';
        if (name1 === 'связь') name1 = 'связь и информация';
        if (name1 === 'сми и ж') name1 = 'сми и журналистика';
        if (name1 === 'сми') name1 = 'сми и журналистика';
        if (name1 === 'фолк') name1 = 'фольклор';
        if (name1 === 'фольк') name1 = 'фольклор';
        if (name1 === 'хим') name1 = 'химия';
        if (name1 === 'языкзн') name1 = 'языкознание';
        if (name1 === 'языкозн') name1 = 'языкознание';
        if (name1 === 'наука и ибразование') name1 = 'наука и образование';
        if (name1 === 'мфт') name1 = 'физмат';
        if (name1 === 'лит') name1 = 'литература';
        if (name1 === 'мед') name1 = 'медицина';
        if(name1==='экон/нархоз'){name1='экономика';name2=''}
        if(name1==='экон/обсл'){name1='экономика';name2='обслуживания'}
        if(name1==='экон/пром'){name1='экономика';name2='промышленность'}
        if(name1==='экон/стр-во'){name1='экономика';name2='строительство'}
        if(name1==='экон/торг+кооп'){name1='экономика';name2='торговля и кооперация'}
        if(name1==='ист до хх в.'){name1='история';name2='до хх в.'}
        if(name1==='ист хх-ххi вв'){name1='история';name2='хх-xxi вв.'}
        if(name1==='ист хх-ххi вв.'){name1='история';name2='хх-xxi вв.'}
        if(name1==='спорт /этнология'){name1='спорт';name2='этнология'}
        if(name1==='спорт и физкультура'){name1='спорт';name2='физкультура'}
        if(name1==='почвы'){name1='сельское хозяйство';name2='почвы'}

        if(name2==='история'){name2=''}
        if(name2==='литература'){name2=''}
        if (name2 === 'вид спорта') name2 = 'виды спорта';
        if (name2 === 'периодические издания') name2 = 'периодическое издание';



        let imageRequired = false;
        let source = a.source;
        let rubric
        if (name1) {
            let l1 = await Mongoose.rubric.findOne({name: name1, parent:null})
            if (!l1) {

                l1 = await Mongoose.rubric.create({name: name1})
            }
            rubric = l1
            let l2;
            if (name2) {
                l2 = await Mongoose.rubric.findOne({name: name2, parent: l1})
                if (!l2) {
                    l2 = await Mongoose.rubric.create({name: name2, parent: l1})
                }
                rubric = l2;
            }
        }




        if (a.ill) {
            if (['И', 'П'].includes(a.ill.trim())) {
                imageRequired = true;
            } else {
                source = a.ill
            }
        }

        //console.log(a.type)

        await Mongoose.article.create({term: a.term.replace('"', ''), source, rubric, criteria: a.criteria, type: a.type})

    }
    console.log('DONE')
    Mongoose.close()
}

