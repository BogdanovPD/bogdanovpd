import { writable } from "svelte/store";

let counter = 1;
export const results = writable([{ num: 1, date: new Date(), category: 'test', value: 10, color: 'purple' }]);

export const add = async (category, value) => {
    results.update(res => {
        let el = res.find(i => i.category === category)
        if (el) {
            el.date = new Date();
            el.value+=value;
        } else {
            el = {num: ++counter, date: new Date(), category: category.toLowerCase(), value: value, color: getRandomColor()};
            res.push(el);
        }
        return res;
    });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}