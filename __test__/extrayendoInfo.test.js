const puppeteer = require ('puppeteer')

describe ('Extrayendo Información', () => {

    let browser
    let page
    //beforeEach y afterEach se ejecuta prueba por prueba en navegadores diferentes
    //beforeAll y afterAll se ejecutan todas las pruebas en el mismo navegador
    beforeAll(async()=>{
        browser = await puppeteer.launch ({

            headless:false,
            defaultViewport:null,
            //slowMo:500
        })
        page = await browser.newPage()
        //Se coloca acá la ida a la página web, ya que es la misma para los 3 eventos
        await page.goto('https://platzi.com/', {waitUntil : 'networkidle2'})
    },10000)

    afterAll(async()=>{
        await browser.close
    })

    it('Extrayendo el titulo de la página y la url', async () =>{

        const titulo = await page.title()
        const url = await page.url()
        //Se imprime el titulo y la url
        console.log('titulo:', titulo)
        console.log('url:', url)

    })

        it('Extraer la información de un elemento', async () =>{

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

        })

        it('Contar los elementos de una  página', async () =>{

            const images = await page.$$eval('img',(imagenes)=>imagenes.length)
            //$$eval trae todos los elementos de ese selector (arreglo)
            //Se imprime la longitud del arreglo
            console.log('#imagenes:',images)

        })
})