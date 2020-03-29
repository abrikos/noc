import * as axios from "axios";
import {parse} from "node-html-parser";
import links from "links";
import md5 from "md5";
//import Mongoose from "server/db/Mongoose";
const fs = require('fs');

async function getDom(url) {
    const response = await axios.get(url);
    return parse(response.data);
}

const url = 'https://yakutia.science';

function adaptLink(path) {
    return path.replace(url, '').substr(1).split('/').join('-')
}

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
                const links = address.querySelectorAll('a').map(l=>l.attributes.href);
                bookItem.employers.push({fio, status, links})

            }
            book.push(bookItem)
        }
    }

    const file = fs.openSync('./client/phone-book.json', 'w');
    fs.writeSync(file, JSON.stringify(book), null, null);
    fs.closeSync(file);
}

async function pages() {
    const wgets = [];
    const linksSliced = links.slice(1, 2);
    for (const link of links) {
        const path = adaptLink(link);
        const fileHtml = './client/static/' + path + '.html';
        if (fs.existsSync(fileHtml)) continue;
        console.log(link)
        const root = await getDom(link);
        const containers = root.querySelectorAll('.uk-container');
        //return console.log(containers.length)
        const body = path === 'o-respublike' ? containers[3] : containers[1];
        const images = body.querySelectorAll('img');
        let html = body.innerHTML;
        for (const image of images) {
            let src = image.attributes['data-src'];
            if (!src) src = image.attributes['uk-img'];
            if (!src) src = image.attributes.src;
            const extension = src.split('.').pop();
            const fileName = 'uploads/' + md5(src) + '.' + extension;
            wgets.push(`wget -nc -O ${fileName} "${url}${src}"`);
            html = html.replace(src, '/' + fileName);
        }
        html = html.replace(/data-src=/g, 'src=');
        const file2 = fs.openSync(fileHtml, 'w');
        fs.writeSync(file2, html, null, null);
        fs.closeSync(file2);
    }
    //console.log(wgets.join(';'))
    const file = fs.openSync('./images.sh', 'w');
    fs.writeSync(file, wgets.join(';'), null, null);
    fs.closeSync(file);
}


async function menu() {

    //await Mongoose.Menu.deleteMany().then(console.log)
    const menuItems = [];
    const root = await getDom(url);
    const menuUl = root.querySelector('.uk-navbar-nav');
    const menus = menuUl.childNodes.filter(n => n.nodeType === 1);
    let parent;
    for (const item of menus) {
        const links = item.querySelectorAll('a');
        const m = {label: links[0].rawText};
        const items = [];

        if (links.length !== 1) {
            for (let i = 1; i < links.length; i++) {
                items.push({label: links[i].rawText, path: '/static/' + adaptLink(links[i].attributes.href)})
            }
            m.items = items;
        } else {
            parent = m.path = '/static/' + adaptLink(links[0].attributes.href);
        }
        menuItems.push(m);
        //await Mongoose.Menu.create(m)
    }

    const file = fs.openSync('./client/menu.json', 'w');
    fs.writeSync(file, JSON.stringify(menuItems), null, null);
    fs.closeSync(file);
    //console.log(menuItems[2]);
    //Mongoose.close()
}

phones()
//pages()
//menu()
