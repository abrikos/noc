import * as axios from "axios";
import {parse} from "node-html-parser";
import siteMap from "client/site-map";
import phoneBook from "client/phone-book";
import md5 from "md5";
import Mongoose from "server/db/Mongoose";

const fs = require('fs');

const orders = [
    {isMenu: 9, label: 'Контакты'},
    {isMenu: 7, label: 'Новости'},
    {isMenu: 6, label: 'О Республике'},
    {isMenu: 1, label: 'Об Академии'},
    {isMenu: 3, label: 'Объединённые учёные советы'},
    {isMenu: 5, label: 'Президиум'},
    {isMenu: 4, label: 'Проекты'},
    {isMenu: 8, label: 'Издания'},
    {isMenu: -1, label: 'Главная'},
    {isMenu: 2, label: 'Структура'}
];



/*

async function phones() {
    const root = await getDom('https://yakutia.science/spravochnik/');
    const ul = root.querySelector('.el-nav');
    const items = ul.querySelectorAll('li');
    const book = [];
    for (const item of items) {
        const tag = item.attributes['uk-filter-control'].match(/\[data\-tag\~=\'(.*)\'\]/)
        if (tag) {
            const addresses = root.querySelectorAll(`[data-tag=${tag[1]}]`)
            const bookItem = {division: item.rawText.trim(), employers: []};
            for (const address of addresses) {
                const fio = address.querySelector('h3').rawText.trim();
                const status = address.querySelector('.el-meta').rawText.trim();
                const links = address.querySelectorAll('a').map(l => l.attributes.href);
                bookItem.employers.push({fio, status, links})

            }
            book.push(bookItem)
        }
    }

    const file = fs.openSync('./client/phone-book.json', 'w');
    fs.writeSync(file, JSON.stringify(book), null, null);
    fs.closeSync(file);
}
*/


function getFileName(src) {
    const extension = src.split('.').pop();
    return {name: md5(src), extension};
}

async function uchsovety() {
    await Mongoose.Meeting.deleteMany().exec()
    for (const map of siteMap.filter(m => m.pages[0] === 'obedinyonnye-uchyonye-sovety' && m.pages.length > 1)) {
        const path = './static' + map.path;
        const root = await getDomFile(path);
        const personsContainer = root.querySelector('.js-filter');
        const persons = personsContainer.childNodes.filter(n => n.nodeType === 1);
        const name = root.querySelector('h1').rawText.trim();
        let meetingFound = await Mongoose.Meeting.findOne({name});
        if (!meetingFound) meetingFound = await Mongoose.Meeting.create({name, path: map.pages[1]});
        meetingFound.persons = [];
        for (const person of persons) {
            const fio = person.querySelector('.el-title').rawText.trim();
            const statusNode = person.querySelector('.el-meta');
            const status = statusNode && statusNode.rawText.trim();
            const rank = person.querySelector('.el-content').rawText.trim();
            let personFound = await Mongoose.Person.findOne({fio});
            if(!personFound) personFound = await Mongoose.Person.create({fio, rank, status});
            const voiceName = person.attributes['data-tag'].replace(/\-/g, ' ');
            const voice = meetingVoices.indexOf(voiceName);
            personFound.voice = voice;
            await personFound.save();
            meetingFound.persons.push(personFound);
            await meetingFound.save()
            console.log(fio, voice, voiceName)
        }
    }
    Mongoose.close()
}

async function divisions() {
    return console.log('EXIT. DIVISION READY')
    await Mongoose.Division.deleteMany().exec();
    await Mongoose.Person.deleteMany().exec();

    for (const map of siteMap.filter(m => m.pages[0] === 'struktura' && m.pages.length > 1)) {
        const path = './static' + map.path;
        const root = await getDomFile(path);
        const name = root.querySelector('h1').rawText.trim();
        const fio = root.querySelector('h3').rawText.trim();

        const status = root.querySelector('.el-meta').rawText.trim();
        const rank = root.querySelector('.el-content').rawText.trim();
        console.log(rank)
        const imageNode = root.querySelector('.el-image');
        const file = getImage(imageNode);
        const description = root.querySelector('.uk-flex-auto.uk-width-2-3@m').rawText.trim().replace(/ +(?= )/g, '')
        const division = await Mongoose.Division.create({name, description, path: map.path});
        const image = await Mongoose.Image.findOne({name: file.name});
        division.chief = await Mongoose.Person.create({fio, rank, status, division, image});
        await division.save();
    }
    //return //Mongoose.Person.find().then(console.log)

    for (const book of phoneBook) {
        let division;
        if (!book.path) {
            division = await Mongoose.Division.create({name: book.division});
        } else {
            division = await Mongoose.Division.findOne({path: book.path});
            //console.log(division)
        }

        for (const e of book.employers) {
            const personExists = await Mongoose.Person.findOne({fio: e.fio});

            let phone = e.links.find(l => l.match('tel:'));
            if (phone) phone = phone.replace('tel:', '');
            let email = e.links.find(l => l.match('mailto:'));
            if (email) email = email.replace('mailto:', '');
            if (personExists) {
                personExists.email = email;
                personExists.phone = phone;
                personExists.division = division;
                await personExists.save()
            } else {
                await Mongoose.Person.create({phone, email, division, ...e})
            }

        }
    }
    for (const book of phoneBook) {
        if (!book.path) {
            const div = await Mongoose.Division.findOne({name: book.division.trim()});
            const chief = await Mongoose.Person.findOne({fio: book.employers[0].fio.trim()});
            div.chief = chief;
            await div.save()
        }
    }
    Mongoose.close()
}


async function downloadsImages() {
    await Mongoose.Image.deleteMany().exec();
    const wgets = [];
    for (const map of siteMap) {
        const link = mainSite + '/' + map.pages.join('/');
        const path = './static' + (map.path === '/' ? '/home' : map.path);
        const root = await getDomFile(path);
        const images = root.querySelectorAll('img');
        for (const image of images) {
            const file = getImage(image);
            file.path = map.path;
            const imageModel = await Mongoose.Image.create(file);
            wgets.push(`wget -nc -O ${imageModel.path.slice(1)} "${file.src}"`);
        }
    }
    const file = fs.openSync(`./images.sh`, 'w');
    fs.writeSync(file, wgets.join('\n'), null, null);
    fs.closeSync(file);
    Mongoose.close()
}


/*

function menuItem(link) {
    const pages = link.attributes.href.split('/').slice(3);
    pages.pop()
    const so = orders.find(o => o.label === link.rawText.trim())
    return {label: link.rawText.trim(), pages, isMenu: so && so.isMenu, path: '/' + pages.join('-')}
}

async function menu() {
    //await Mongoose.Menu.deleteMany().then(console.log)
    const menuItems = [];
    const root = await getDom(mainSite + '/karta-sajta/');
    const menuUl = root.querySelector('.simple-sitemap-page');
    const menus = menuUl.childNodes.filter(n => n.nodeType === 1);
    for (const link of menuUl.querySelectorAll('a')) {
        const menu = menuItem(link);
        menuItems.push(menu);
        //await Mongoose.Menu.create(m)
    }

    const file = fs.openSync('./client/site-map.json', 'w');
    fs.writeSync(file, JSON.stringify(menuItems), null, null);
    fs.closeSync(file);
    console.log(menuItems);
    //Mongoose.close()
}

async function menuDb() {
    for (const menu of siteMap.filter(m => m.isMenu)) {

    }
    Mongoose.close()
}
*/

uchsovety()
//divisions()
//downloadsImages()
//phones()
//pages()
//menu()

