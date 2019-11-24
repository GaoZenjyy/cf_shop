$('.goods-list').each((item, elent) => {
    let element = $(elent);
    console.log(element)
})



$('.goods-list').each((item, elent) => {
    let element = $(elent);
    let img = element.find("img").attr("src")
    console.log(img)
});


// let aa = document.querySelector(".swiper-wrapper")
let aa = document.querySelectorAll('.swiper-slide');
// console.log(aa.length);
for (let i = 0; i < aa.length; i++) {
    // console.log(aa[i]);
    let image = aa[i].querySelector("img").src
    // console.log(image);
    let sql = `INSERT INTO cf_image_lunbo VALUES (null,null,'${image}',4);\n`
    console.log(sql);
}
// for (let i = 0; i < aa.length; i++) {
//     let img = aa[i].querySelector('img').src;
//     let title = aa[i].querySelector('h5').innerText;
//     let pricetitle = aa[i].querySelector('.new-pri').innerText;
//     // let pricetitle = aa[i].querySelector('.new-pri').innerHTML;
//     let price = pricetitle.substr(1);
//     // console.log(price)
//     let sql = `INSERT INTO cf_goods_shops VALUES (null,'${title}','${img}',${price},5);\n`;
//     console.log(sql);
// }
// let aa = document.querySelectorAll('.goods-list li');
// for (let i = 0; i < aa.length; i++) {

//     console.log(aa[i]);
// }



// let aa = document.querySelectorAll('.index-tab ul li');
// // console.log(aa);
// for (let i = 0; i < aa.length; i++) {
//     let img = aa[i].querySelector('img').src;
//     let span = aa[i].querySelector("h5").innerText
//     // console.log(span);
//     // console.log(price)
//     let sql = `INSERT INTO cf_title VALUES ('null','${img}','${span}');\n`;
//     console.log(sql);
// }

// $('.third-cate .cate-second').each((item, elent) => {
//     let element = $(elent);
//     let span = element.find('span').html();
//     let img = 'http:' + element.find('img').attr('src');
//     let sql = `INSERT INTO juanpi_class_middle VALUES (null,'${span}','${img}',10);\n`;
//     console.log(sql);
// });


