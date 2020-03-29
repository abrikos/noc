import * as axios from "axios";
import {parse} from "node-html-parser";
import siteMap from "client/site-map";
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


async function getDom(url) {
    const response = await axios.get(url);
    return parse(response.data);
}

async function getDomFile(path) {
    const data = fs.readFileSync(path, 'utf-8');
    return parse(data);
}

const mainSite = 'https://yakutia.science';

function adaptLink(path) {
    return path.replace(mainSite, '').substr(1).split('/').join('-')
}
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

function fileName(src) {
    const extension = src.split('.').pop();
    return 'uploads/' + md5(src) + '.' + extension;
}

function getImage(image){
    let src = image.attributes['data-src'];
    if (!src) src = image.attributes['uk-img'];
    if (!src) src = image.attributes.src;
    const extension = src.split('.').pop();
    const fileName = fileName(src);
    return `wget -nc -O ${fileName} "${mainSite}${src}"`;
}

async function downloads() {
    const wgets = [];
    for (const map of siteMap) {
        const link = mainSite + '/' + map.pages.join('/');
        const path = './static' + (map.path === '/' ? '/home' : map.path);
        const root = await getDomFile(path);
        const images = root.querySelectorAll('img');
        /*if(fs.existsSync(path)) continue;
        const response = await axios.get(link);
        console.log(map.path)
        const file2 = fs.openSync(path, 'w');
        fs.writeSync(file2, response.data, null, null);
        fs.closeSync(file2);*/
        for (const image of images) {
            wgets.push(getImage(image));
        }
    }
    const file = fs.openSync(`./images.sh`, 'w');
    fs.writeSync(file, wgets.join(';'), null, null);
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

downloads()
//phones()
//pages()
//menu()

