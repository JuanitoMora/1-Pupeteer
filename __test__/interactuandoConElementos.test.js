const puppeteer = require ('puppeteer')

describe.skip ('Interactuando con Elementos', () => {

    it ('Debe abrir y cerrar el navegador', async () => {
        const browser = await puppeteer.launch ({
            //Para indicar si se abre o no el navegador
            headless:false,
            defaultViewport:null
        })

        const page = await browser.newPage()
        await page.goto ('http://demo.guru99.com/test/simple_context_menu.html')

         //Aceptar por si salen alertas
         page.on ('dialog', async (dialog) => {
            await dialog.accept()
        })

        /*
        //Clic derecho
        await page.click('#authentication > span',{button:'right', delay:500})
        await page.waitForTimeout(3000)
        await page.click('#authentication > span',{button:'left', delay:500})

        //Doble click
        await page.click('#authentication > button',{clickCount:2, delay:500})
        await page.waitForTimeout(3000)

        */
        await page.goto ('https://devexpress.github.io/testcafe/example/')
        await page.type ('#developer-name', 'Juanito', {delay:200})
        await page.click('#windows')
        await page.select('#preferred-interface','option:nth-child(3)')
        //await page.click('#preferred-interface > option:nth-child(3)')
        await page.click ('#remote-testing')
        await page.click ('#tried-test-cafe')
        await page.type ('#comments', 'área para escribir una nota', {delay:100})
        await page.waitForTimeout(3000)
        await page.click('#submit-button')
        await page.waitForTimeout(3000)

        await browser.close

    },350000)
})