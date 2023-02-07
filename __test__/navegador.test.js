const puppeteer = require ('puppeteer')

describe.skip ('Mi primer test en puppeteer', () => {

    it('Debe abrir y cerrar el navegador', async () =>{
        const browser = await puppeteer.launch ({
            //Para indicar si se abre o no el navegador
            headless:false,
            //Para que los pasos sean mucho más lentos
            slowMo:0,
            //al abrir el navegador, se muestran las opciones de desarrollo o F12 del navegador
            devtools:false,
            //el contenido de la página se ajusta a las dimensones dadas
            //defaultViewport:{
                //width:2100,
                //height:1080
            //}
            //la ventana se ajusta a las dimensiones dadas
            //args:['--window-size=1920,1080']
            //todo el contenido de la página se ajusta a la ventana
            defaultViewport:null
        })

        const page = await browser.newPage()
        await page.goto('https://github.com/')
        //await page.waitForTimeout(9000)
        await page.waitForSelector('img')
        
        //recarga la página
        await page.reload
        await page.waitForSelector('img')

        //navegar a otro sitio
        await page.goto('https://platzi.com/')
        await page.waitForSelector('#Header-v2 > nav > div.Logo > div > a > div > figure:nth-child(1) > img')

        //navegar hacia atras y adelante
        await page.goBack
        await page.goForward
        //await page.waitForSelector('img')

        //abrir otra pestaña
        const page2 = await browser.newPage()
        await page2.goto('https://google.com/')

        await page.bringToFront()
        await page.waitForSelector('#Header-v2 > nav > div.Logo > div > a > div > figure:nth-child(1) > img')

        await page.waitForTimeout(2000)

        await browser.close
    },350000)
})