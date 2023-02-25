const axios = require("axios");
const cheerio = require("cheerio");


const url = "https://www.bigw.com.au/toys/block-brick-sets/lego/c/6822101";


const bigWScraper = async () => {
  let endLoop = false;
  let itemNumber = 1;
  let page = 1;
  let legos = [];

  while (!endLoop) {
    const res = await axios
      .get(url, { params: { page } })
      .then(({ data }) => {
        const $ = cheerio.load(data);
        if ($(".ProductGrid_ProductTileWrapper___Agdi").length === 0) {
          console.log("LOOP STOPPED");
          endLoop = true;
          return;
        }
        $(".ProductGrid_ProductTileWrapper___Agdi").each((i, elem) => {
          const lego = $(elem);
          const name = lego.find(".ProductTile_name__pqMxl").text();
          const price = lego.find(".Price.variant-large-thin").text();
          const link = lego
            .find(".ProductTile_ProductTile__RclGy").children('a').first().attr("href");
            const img = lego.find('ProductImage ProductTile_productImage__18Mnd ProductTile_outOfStock__6iOuF').children('img').attr('src')
          legos.push({
            itemNumber,
            name,
            price,
            link: `www.bigw.com.au${link}`,
            imgUrl : img
          });
          itemNumber += 1;
        });
        page = page + 1;
        //   console.log($(".ProductGrid_ProductTileWrapper___Agdi").length);
      })
      .catch((err) => console.log(err));

    if (endLoop) {
      return legos;
    }
  }
};

module.exports = bigWScraper;
