import axios from 'axios'
export const getBlob = (url, fileName) => {
    console.log("123")
    axios.get(url, {
        responseType: 'blob',
        method: 'GET',
    }).then((response) => {
        saveAs(response.data ,fileName)
    });
};

/**
 * save file
 */
export const saveAs = (blob, filename) => {
    const link = document.createElement("a");
    const body = document.querySelector("body");

    link.href = window.URL.createObjectURL(blob);

    if (filename) {
        link.download = filename;
    }

    // fix Firefox
    link.style.display = "none";
    body.appendChild(link);

    link.click();
    body.removeChild(link);

    window.URL.revokeObjectURL(link.href);
};