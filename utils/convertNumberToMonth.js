export default function convertNumberToMonth(monthInNumber) {
    const monthMapping = {
        1: "january",
        2: "february",
        3: "march",
        4: "april",
        5: "may",
        6: "june",
        7: "july",
        8: "august",
        9: "september",
        10: "october",
        11: "november",
        12: "december"
    };

    if (monthInNumber < 1 || monthInNumber > 12) {
        throw Error(
            "Please ensure that the month number you've entered is a valid integer between 1 and 12, corresponding to January through December."
        );
    }

    return monthMapping[monthInNumber];
}
