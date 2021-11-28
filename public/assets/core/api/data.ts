/*
 * All Interfaces representing the data, that the api client will return
 * to the rest of the app
*/

export interface GermanyData {
    cases:number;
    deaths:number;
    recovered:number;

    cases7Days:number;
    weekIncidence:number;

    deltaCases:number;
    deltaDeaths:number;
    deltaRecovered:number;

    hospitalizationIncidence:number;
    hospitalizationCases:number;
}

export interface StatesData {
    BB:StateData;               // Brandenburg
    BE:StateData;               // Berlin
    BW:StateData;               // Baden-Württemberg
    BY:StateData;               // Bayern
    HB:StateData;               // Bremen
    HE:StateData;               // Hessen
    HH:StateData;               // Hamburg
    MV:StateData;               // Mecklenburg-Vorpommern
    NI:StateData;               // Niedersachsen
    NW:StateData;               // Nordrhein-Westfalen
    RP:StateData;               // Rheinland-Pfalz
    SH:StateData;               // Schleswig-Holstein
    SL:StateData;               // Saarland
    SN:StateData;               // Sachsen
    ST:StateData;               // Sachsen-Anhalt
    TH:StateData;               // Thüringen
}

export interface StateData {
    name:string;
    abbreviation:string;
    population:number;

    cases:number;
    deaths:number;
    recovered:number;

    deltaCases:number;
    deltaDeaths:number;
    deltaRecovered:number;

    cases7Days:number;
    weekIncidence:number;
    hospitalizationIncidence:number;
    hospitalizationCases:number;
}

export interface VaccinationData {
    stateName?:string;

    vaccinated:number;
    secondVaccinations:number;
    administered:number;
    quote:number;
    secondVaccinationQuote:number;

    boosterVaccinations:number;
    boosterVaccinationQuote:number;

    dosesBiontech:number;
    dosesModerna:number;
    dosesAstraZeneca:number;
    dosesJanssen:number;

    boosterDosesBiontech:number;
    boosterDosesModerna:number;
    boosterDosesAstraZeneca:number;
    boosterDosesJanssen:number;
}

export interface StatesVaccinations {
    BB:VaccinationData;               // Brandenburg
    BE:VaccinationData;               // Berlin
    BW:VaccinationData;               // Baden-Württemberg
    BY:VaccinationData;               // Bayern
    HB:VaccinationData;               // Bremen
    HE:VaccinationData;               // Hessen
    HH:VaccinationData;               // Hamburg
    MV:VaccinationData;               // Mecklenburg-Vorpommern
    NI:VaccinationData;               // Niedersachsen
    NW:VaccinationData;               // Nordrhein-Westfalen
    RP:VaccinationData;               // Rheinland-Pfalz
    SH:VaccinationData;               // Schleswig-Holstein
    SL:VaccinationData;               // Saarland
    SN:VaccinationData;               // Sachsen
    ST:VaccinationData;               // Sachsen-Anhalt
    TH:VaccinationData;               // Thüringen
}

export interface TestsData {
    calendarWeek:string;

    performedTest:number;
    positiveTests:number;
    laboratoryCount:number;
}