const puppeteer = require ('puppeteer')

describe ('Extrayendo Información', () => {

    it('Extrayendo el titulo de la página y la url', async () =>{
        const browser = await puppeteer.launch ({

            headless:false,
            defaultViewport:null,
            //slowMo:500
        })

        const page = await browser.newPage()
        await page.goto('https://platzi.com/', {waitUntil : 'networkidle2'})

        const titulo = await page.title()
        const url = await page.url()

        //Se imprime el titulo y la url
        console.log('titulo:', titulo)
        console.log('url:', url)

        await browser.close
    },350000)

        it('Extraer la información de un elemento', async () =>{
            const browser = await puppeteer.launch ({
    
                headless:false,
                defaultViewport:null,
            })
    
            const page = await browser.newPage()
            await page.goto('https://platzi.com/', {waitUntil : 'networkidle2'})

            await page.waitForSelector('#Header-v2 > nav > div.Actionsv2 > a')
            const nombreBoton = await page.$eval('#Header-v2 > nav > div.Actionsv2 > a', (button)=>button.textContent)
            //$eval solo trae un elemento o el primero que encuentre

            //Se imprime el nombre del boton mediante el css selector
            console.log('nombreBoton:', nombreBoton)

            const [button] = await page.$x('//*[@id="Header-v2"]/nav/div[5]/div/a')
            const propiedad =  await button.getProperty('textContent')
            const textoBoton = await propiedad.jsonValue()
    
            //Se imprime el nombre del boton mediante el xpath
            console.log('texto:', textoBoton)

            //Segunda forma
            const textoBoton2 = await page.evaluate((name)=>name.textContent, button)
            
            //Se imprime el nombre del boton mediante el xpath
            console.log('textoBoton2:', textoBoton2)
    
            await browser.close
        },350000)

        it('Contar los elementos de una  página', async () =>{
            const browser = await puppeteer.launch ({
    
                headless:false,
                defaultViewport:null,
            })
    
            const page = await browser.newPage()
            await page.goto('https://platzi.com/', {waitUntil : 'networkidle2'})

            const images = await page.$$eval('img',(imagenes)=>imagenes.length)
            //$$eval trae todos los elementos de ese selector (arreglo)

            //Se imprime la longitud del arreglo
            console.log('#imagenes:',images)
    
            await browser.close
        },350000)
})