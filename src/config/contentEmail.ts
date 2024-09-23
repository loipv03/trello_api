const contentEmail = (activationUrl: string): string => {
    return `
        <html lang="en">
            <head>
                <style>
                    h1 {
                        font-size: 28px;
                        font-family: 'Roboto';
                    }

                    button {
                        width: max-content;
                        height: max-content;
                        background-color: #0052cc; 
                        border: none; 
                        border-radius: 5px;
                        cursor: pointer;
                    }

                    a {
                        display:block;
                        color: white !important;
                        text-decoration: none;
                        padding: 10px;
                        text-align: center;
                        text-transform: capitalize;
                        font-weight: 700;
                    }
                </style>
            </head>

            <body>
                <div>
                    <h1>Please activate your account</h1>
                    <button><a href="${activationUrl}">activate account</a></button>
                </div>
            </body>
        </html>`
}

export default contentEmail