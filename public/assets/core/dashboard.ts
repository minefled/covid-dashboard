export let maxIncidence = 400;
export let maxCases7Days = 330000;
export let maxHospitalization = 8;
export let maxPositivityRate = 25;

export function calculateIncidenceColor(incidence) {
    let startH = 115;
    let endH   = 0;

    let maxPercentage = Math.min(Math.max(incidence / maxIncidence, 0), 1);

    let hComponent = ((Math.min(startH, endH) - Math.max(startH, endH)) * maxPercentage) + Math.max(startH, endH);

    return `hsl(${hComponent}, 61%, 55%)`;
}

export function calculateWeekCasesColor(cases7days) {
    let startH = 115;
    let endH   = 0;

    let maxPercentage = Math.min(Math.max(cases7days / maxCases7Days, 0), 1);

    let hComponent = ((Math.min(startH, endH) - Math.max(startH, endH)) * maxPercentage) + Math.max(startH, endH);

    return `hsl(${hComponent}, 61%, 55%)`;
}

export function calculateHospitalizationColor(hospitalizationIncidence) {
    let startH = 115;
    let endH   = 0;

    let maxPercentage = Math.min(Math.max(hospitalizationIncidence / maxHospitalization, 0), 1);

    let hComponent = ((Math.min(startH, endH) - Math.max(startH, endH)) * maxPercentage) + Math.max(startH, endH);

    return `hsl(${hComponent}, 61%, 55%)`;
}

export function calculatePositivityRateColor(positivityRate) {
    let startH = 115;
    let endH   = 0;

    let maxPercentage = Math.min(Math.max(positivityRate / maxPositivityRate, 0), 1);

    let hComponent = ((Math.min(startH, endH) - Math.max(startH, endH)) * maxPercentage) + Math.max(startH, endH);

    return `hsl(${hComponent}, 61%, 55%)`;
}

export const dashboard = {
    calculateHospitalizationColor,
    calculateIncidenceColor,
    calculatePositivityRateColor,
    calculateWeekCasesColor
};