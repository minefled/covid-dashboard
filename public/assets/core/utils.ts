export function formatNumber(num:number):string {
    /*
     * By: Bisonratte (https://github.com/CuzImBisonratte)
    */
    let n = (Math.floor(num * 100) / 100);

    var numberNew = n.toString().split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    if (n.toString().split(".")[1] != undefined) {
        numberNew = numberNew + "," + n.toString().split(".")[1];
    }

    return numberNew;
}