import Mongoose from "server/db/Mongoose";

const fs = require('fs')
const dir = './documents/html/'
const litMark = 'Лит.:'
const sochMark = 'Соч.:'
const istMark = 'Ист.:'
const articlePatterns = [
    //'<strong>(.*?)<strong>',
    /<p><strong>(.*?)END-ARTICLE/gsm,
    /<p>([А-Я -]+,.*?)<\/p>/g, //NO BOLD
    // /<p><strong>(.*)<\/p>/g //ONE ARTICLE
]

//mainFile()
main()

async function mainFile() {
    await Mongoose.article.deleteMany()
    let file =   'история дорев.-87'
    //file = 'Геология-э-5.html'
    const content = fs.readFileSync(dir + file+'.html', 'utf8');
    await parseByRegex(adapt(content), file+'.html')
}

async function parseByRegex(content, file) {
    //console.log(content)
    for (const articlePattern of articlePatterns) {
        let foundArticles = content.match(articlePattern)
        if (!foundArticles) {
            continue;
        }
        for (let article of foundArticles) {
            article = article.replace('END-ARTICLE', '')
            let termFound = article.match(/<strong>(.*?)<\/strong>/g);
            if (!termFound) {
                termFound = article.match(new RegExp('<p>([А-Я -]+),', 'g'))
            }
            if (!termFound) {
                console.log(article)
                continue
            }
            const term = adaptTerm(termFound)
            const litFound = article.match(new RegExp(`${litMark}(.*)<\/p>`))
            const istFound = article.match(new RegExp(`${istMark}(.*)<\/p>`))
            const sochFound = article.match(new RegExp(`${sochMark}(.*)<\/p>`))
            const literature = litFound && stripTags(litFound[1])
            const source = istFound && stripTags(istFound[1])
            const compositions = sochFound && stripTags(sochFound[1])
            const definition = stripTags(article.replace(termFound[0], '')
                .split('<p>').join('\n\n<p>')
            )
                .replace(source, '')
                .replace(compositions, '')
                .replace(literature, '')
                .replace(litMark, '')
                .replace('\n','\n\n')
                .trim()
                .replace(/^-/,'')
            //if(!definition) {                console.log(term)                continue;            }
            if (term.match(/Лит/)) console.log(`=      ${file}      ${article} =`)
            if (!definition.trim()) {
                //console.log(article)
            }
            if (!term.trim()) continue
            content = content.replace(article,'')
            const person = persons.includes(term.toLowerCase()) || !!file.match('персон')
            await Mongoose.article.create({source, definition, term, file, literature, compositions, person})
            if (0) {
                //console.log('\n==================\n')
                console.log(articlePattern, termFound, article, 'zzzzzzzzzzzzz', term)
                //console.log(definition)
                //console.log(source)
                //console.log('\n==================\n')
            }

        }
    }
}

const persons = ['алексеев', "алексеева", "алехин", "аманатова", "абрамов", "абрамова"]

function adaptTerm(t) {

    return stripTags(t.join(' '))
        .trim()
        .replace('«', '')
        .replace('END-ARTICLE', '')
        .replace('»', '')
        .replace(/,$/, '')
        .replace(/:$/, '')
        .replace(/\.$/, '')
        .trim()
        .split(',').filter(x=>!!x).join(', ')
}


function adapt(content) {
    return content
        .split('\t').join('')
        .replace(/h2/gi, 'p')
        .replace('[', '(')
        .replace(']', ')')
        .replace(/<p>Лит.:<\/p>/g, litMark)
        .replace(/<strong>Лит\.<\/strong>/g, litMark)
        .replace(/<strong>[ ]*Л и т.:[ ]*<\/strong>/g, litMark)
        .replace(/<strong>[ ]*Л и т[ ]*<\/strong>/g, litMark)
        .replace(/<strong>[ ]*Лит.:[ ]*<\/strong>/g, litMark)
        .replace(/<strong>[ ]*Лит-ра.:[ ]*<\/strong>/g, litMark)
        .replace(/<strong>[ ]*Лит-ра:[ ]*<\/strong>/g, litMark)
        .replace(/<strong>[ ]*Лит.[ ]*<\/strong>:/g, litMark)
        .replace(/<strong>[ ]*Лит[ ]*<\/strong>/g, litMark)
        .replace(/Л и т.:/g, litMark)
        .replace(/Лит:/g, litMark)
        .replace(/Лит.:/g, litMark)
        .replace(/Соч.:/g, 'Соч.:')
        .replace(/Лит-ра:/g, litMark)

        .replace(/<strong>[ ]*Соч.:[ ]*<\/strong>/g, sochMark)
        .replace(/<strong>[ ]*Соч.[ ]*<\/strong>/g, sochMark)
        .replace(/<strong>[ ]*Соч[ ]*<\/strong>/g, sochMark)
        .replace(/<strong>[ ]*С о ч.:[ ]*<\/strong>/g, sochMark)

        .replace(/Ист.:/g, istMark)

        .replace(/>[ ]+</g, '><')
        .replace(/<em>/g, '')
        .replace(/<\/em>/g, '')
        .replace(/<a id=".+"><\/a>/g, '')
        .replace(/<p><strong>/g, 'END-ARTICLE<p><strong>')
        //.split('\n').join('')

}

async function main() {
    await Mongoose.article.deleteMany()
    let filenames = fs.readdirSync(dir);
    for (const file of filenames) {
        const content = fs.readFileSync(dir + file, 'utf8');
        //console.log(file)
        try {
            await parseByRegex(adapt(content), file)
        } catch (e) {
            console.log(file, e)
        }

        //return
    }
    console.log('DONE')
}


function stripTags(str) {
    return str.replace(/(<([^>]+)>)/gi, "")
}


