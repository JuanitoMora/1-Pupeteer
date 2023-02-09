const puppeteer = require ('puppeteer')

describe.skip ('Tipos de Espera', () => {

    //Tiempo de espera de Jest de todo el set
    jest.setTimeout(10000)

    it('Mostrar todos los diferentes tipos de espera', async () =>{
        const browser = await puppeteer.launch ({

            headless:false,
            defaultViewport:null,
            //slowMo:500
        })

        const page = await browser.newPage()

        //Tiempo de espera de todos los elementos a intervenir
        page.setDefaultTimeout(10000)
        //Tiempo de espera en la navegación entre páginas
        page.setDefaultNavigationTimeout(10000)


        await page.goto('https://platzi.com/', {waitUntil : 'networkidle2'})

        //Espera implicita
        //await page.waitForTimeout(2000)

        //Espera por un css selector
        //await page.waitForSelector('#Header-v2 > nav > div.Logo > div > a > div > figure:nth-child(1) > img')

        //Espera por un xpath
        //await  page.waitForXPath('//*[@id="Header-v2"]/nav/div[1]/div/a/div/figure[1]/img')

        await page.goto('https://demoqa.com/modal-dialogs', {waitUntil : 'networkidle2'})

        //Espera por un ID
        //await page.waitForSelector('#showSmallModal',{visible:true})

        //Espera por Xpath y le  da click
        const button = await page.waitForXPath('//*[@id="showSmallModal"]',{visible:true})
        await button.click()

        //Espera por una función
        await page.waitForFunction(()=> document.querySelector('#example-modal-sizes-title-sm').innerText === 'Small Modal')

        //Ejemplo para observar el viewport, se conjuga con el slowMo de arriba

        //const observaResize = page.waitForFunction('window.innerWidth < 100')

        //await page.setViewport({width: 50,height: 50})
        //await observaResize

        await page.click('#closeSmallModal')
        await page.waitForFunction(()=> !document.querySelector('#example-modal-sizes-title-sm'),
        //Tiempo de espera en la función especifica
        {timeout:30000})
        
        await browser.close
    },350000)
})