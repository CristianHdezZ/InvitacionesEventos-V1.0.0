class HtmlInclude {

    constructor() {

        this.elements = [
            ...document.querySelectorAll("[data-include]")
        ];

    }

    async load() {

        for (const element of this.elements) {

            const file = element.dataset.include;

            try {

                const response = await fetch(file);

                if (!response.ok) {

                    throw new Error(response.status);

                }

                element.outerHTML = await response.text();

            }

            catch (error) {

                console.error(

                    "No se pudo cargar:",

                    file,

                    error

                );

            }

        }

    }

}

document.addEventListener(

    "DOMContentLoaded",

    async () => {

        const include = new HtmlInclude();

        await include.load();

    }

);